"use client";

import React, { useEffect, useRef } from 'react';

// Starfield Canvas Component
const StarfieldCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        const numStars = 800;
        let speed = 2;

        const resizeCanvas = () => {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        };

        class Star {
            x: number;
            y: number;
            z: number;
            pz: number;

            constructor() {
                this.x = Math.random() * canvas!.width - canvas!.width / 2;
                this.y = Math.random() * canvas!.height - canvas!.height / 2;
                this.z = Math.random() * canvas!.width;
                this.pz = this.z;
            }

            update() {
                this.z = this.z - speed;
                if (this.z < 1) {
                    this.z = canvas!.width;
                    this.x = Math.random() * canvas!.width - canvas!.width / 2;
                    this.y = Math.random() * canvas!.height - canvas!.height / 2;
                    this.pz = this.z;
                }
            }

            draw() {
                const sx = (this.x / this.z) * canvas!.width / 2 + canvas!.width / 2;
                const sy = (this.y / this.z) * canvas!.height / 2 + canvas!.height / 2;

                const r = Math.max(0.1, (1 - this.z / canvas!.width) * 2.5);

                const px = (this.x / this.pz) * canvas!.width / 2 + canvas!.width / 2;
                const py = (this.y / this.pz) * canvas!.height / 2 + canvas!.height / 2;

                this.pz = this.z;

                ctx!.beginPath();
                ctx!.moveTo(px, py);
                ctx!.lineTo(sx, sy);
                ctx!.lineWidth = r * 2;
                ctx!.strokeStyle = `rgba(255, 255, 255, ${1 - this.z / canvas!.width})`;
                ctx!.stroke();
            }
        }

        const init = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push(new Star());
            }
        };

        const animate = () => {
            ctx!.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

            stars.forEach(star => {
                star.update();
                star.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const dist = Math.abs(event.clientX - centerX);
            const maxDist = window.innerWidth / 2;
            // The closer to the center, the faster the speed
            speed = 2 + (1 - dist / maxDist) * 20;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />;
};

export default StarfieldCanvas;
