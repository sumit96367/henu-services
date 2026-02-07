import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CircularWaveShaderProps {
    className?: string;
}

const CircularWaveShader: React.FC<CircularWaveShaderProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Renderer + Scene + Camera + Clock
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);
        } catch (err) {
            console.error('WebGL not supported', err);
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const clock = new THREE.Clock();

        // Shaders
        const vertexShader = `
      varying vec2 vTextureCoord;
      void main() {
        vTextureCoord = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

        const fragmentShader = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      varying vec2 vTextureCoord;

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

        // Calculate distance from center for circular mask
        float dist = length(uv);
        
        // Circular mask - only render inside circle
        if (dist > 1.0) {
          discard;
        }

        for(float i = 1.0; i < 10.0; i++){
          uv.x += 0.6 / i * cos(i * 2.5 * uv.y + iTime);
          uv.y += 0.6 / i * cos(i * 1.5 * uv.x + iTime);
        }
        
        // Cyan-purple gradient colors for Profile Identity theme
        vec3 colorCyan = vec3(0.1, 0.6, 0.8);
        vec3 colorPurple = vec3(0.5, 0.2, 0.7);
        vec3 baseColor = mix(colorCyan, colorPurple, sin(iTime * 0.5) * 0.5 + 0.5);
        
        fragColor = vec4(baseColor / abs(sin(iTime - uv.y - uv.x)), 1.0);
        
        // Soften edges
        float edgeFade = smoothstep(1.0, 0.95, dist);
        fragColor.a *= edgeFade;
      }

      void main() {
        vec4 color;
        mainImage(color, vTextureCoord * iResolution);
        gl_FragColor = color;
      }
    `;

        // Material, Geometry, Mesh
        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2() }
        };
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            transparent: true
        });
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Resize Handler
        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            uniforms.iResolution.value.set(w, h);
        };

        window.addEventListener('resize', onResize);
        onResize();

        // Animation Loop
        renderer.setAnimationLoop(() => {
            uniforms.iTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
        });

        // Cleanup
        return () => {
            window.removeEventListener('resize', onResize);
            renderer.setAnimationLoop(null);
            const canvas = renderer.domElement;
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            material.dispose();
            geometry.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0
            }}
            aria-label="Animated wave shader"
        />
    );
};

export default CircularWaveShader;
