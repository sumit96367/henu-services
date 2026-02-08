"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// --- Three.js Canvas Component for Modal Background ---
export const GravitationalMeshBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef(new THREE.Vector2(0, 0));

    useEffect(() => {
        if (!mountRef.current) return;

        const container = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const clock = new THREE.Clock();

        // --- Gravitational Mesh ---
        const geometry = new THREE.PlaneGeometry(40, 40, 50, 50);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uColor: { value: new THREE.Color(0xa855f7) } // Purple for Royal Lavender theme
            },
            vertexShader: `
            uniform float uTime;
            uniform vec2 uMouse;
            varying float vIntensity;

            void main() {
                vec3 pos = position;
                float mouseDist = distance(pos.xy, uMouse * 20.0);
                
                float warp = 1.0 - smoothstep(0.0, 8.0, mouseDist);
                pos.z += warp * 4.0;
                vIntensity = warp;

                pos.z += sin(pos.x * 0.5 + uTime * 0.5) * 0.15;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
            fragmentShader: `
            uniform vec3 uColor;
            varying float vIntensity;
            void main() {
                gl_FragColor = vec4(uColor * (0.3 + vIntensity * 0.7), vIntensity * 0.4);
            }
        `,
            wireframe: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Mouse tracking - capture relative to window for better tracking
        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        // Attach to window for global tracking
        window.addEventListener('mousemove', handleMouseMove);

        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            material.uniforms.uTime.value = elapsedTime;
            material.uniforms.uMouse.value.lerp(mouseRef.current, 0.1);

            mesh.rotation.x = -0.2;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);

            if (container && renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }

            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0 opacity-30" />;
};
