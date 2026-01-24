"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
    Float,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    PerspectiveCamera,
    Environment,
    ContactShadows,
    MeshTransmissionMaterial,
} from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

function MainShape() {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.1
        mesh.current.rotation.y += delta * 0.15

        // Mouse interaction
        const targetX = (state.mouse.x * state.viewport.width) / 2
        const targetY = (state.mouse.y * state.viewport.height) / 2
        mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX * 0.05, 0.1)
        mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY * 0.05, 0.1)
    })

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={mesh}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={2}
            >
                <torusKnotGeometry args={[1, 0.35, 128, 32]} />
                <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={2.5}
                    chromaticAberration={0.03}
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                    iridescence={1}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    color={hovered ? "#a855f7" : "#4f46e5"}
                    roughness={0.1}
                />
            </mesh>
        </Float>
    )
}

function FloatingArtifacts() {
    const count = 25
    const shapes = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
            ] as [number, number, number],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
            scale: Math.random() * 0.2 + 0.05,
            color: ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899"][Math.floor(Math.random() * 4)],
            speed: Math.random() * 0.5 + 0.5,
            type: Math.floor(Math.random() * 3)
        }))
    }, [])

    return (
        <>
            {shapes.map((shape, i) => (
                <Shape key={i} {...shape} />
            ))}
        </>
    )
}

function Shape({ position, rotation, scale, color, speed, type }: any) {
    const mesh = useRef<THREE.Mesh>(null!)

    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.1 * speed
        mesh.current.rotation.y += delta * 0.1 * speed
    })

    return (
        <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
                {type === 0 && <boxGeometry />}
                {type === 1 && <sphereGeometry args={[1, 32, 32]} />}
                {type === 2 && <octahedronGeometry />}
                <MeshWobbleMaterial color={color} factor={0.6} speed={2} opacity={0.6} transparent />
            </mesh>
        </Float>
    )
}

function Scene() {
    const { camera, scene } = useThree()

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "main",
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
            }
        })

        tl.to(camera.position, {
            z: 15,
            ease: "none"
        })

        tl.to(scene.rotation, {
            y: Math.PI / 6,
            ease: "none"
        }, 0)

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [camera, scene])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
            <ambientLight intensity={0.6} />
            <pointLight position={[-10, 10, 10]} intensity={0.4} />
            <pointLight position={[10, -10, -5]} intensity={0.3} color="#8b5cf6" />

            <MainShape />
            <FloatingArtifacts />

            <ContactShadows
                position={[0, -5, 0]}
                opacity={0.2}
                scale={40}
                blur={3}
                far={10}
            />

            <Environment preset="night" />
        </>
    )
}

export function ThreeDHero() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#020202] pointer-events-none">
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false
                }}
            >
                <Scene />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
        </div>
    )
}
