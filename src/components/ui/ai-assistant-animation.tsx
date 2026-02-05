'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AIAssistantAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];
        const connections: Connection[] = [];

        const resize = () => {
            const container = canvas.parentElement;
            if (!container) return;

            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                if (!canvas) return;

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#06b6d4';
                ctx.fill();
            }
        }

        class Connection {
            p1: Particle;
            p2: Particle;

            constructor(p1: Particle, p2: Particle) {
                this.p1 = p1;
                this.p2 = p2;
            }

            draw() {
                if (!ctx) return;

                const dx = this.p1.x - this.p2.x;
                const dy = this.p1.y - this.p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(this.p1.x, this.p1.y);
                    ctx.lineTo(this.p2.x, this.p2.y);
                    const opacity = 1 - distance / 120;
                    ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.3})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Initialize particles
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            connections.length = 0;

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    connections.push(new Connection(particles[i], particles[j]));
                }
            }

            connections.forEach(conn => conn.draw());

            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 to-black">
            <canvas ref={canvasRef} className="w-full h-full" />
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <div className="w-20 h-20 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-400/20" />
                </div>
            </motion.div>
        </div>
    );
}
