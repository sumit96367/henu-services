'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Megaphone,
  Bot,
  Scale,
  FileText,
  BadgeCheck,
  Coins,
  ChevronDown,
  ArrowRight,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { cn } from "@/lib/utils";

// ============================================
// HERO SECTION WITH 3D SPLINE
// ============================================
const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="horizon-grid" />
        <div className="grid-background" />

        {/* Ambient Glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 149, 0, 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main Content - Split Layout */}
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-100px)] gap-8 lg:gap-0">
          {/* Left Content */}
          <motion.div
            style={{ y, opacity }}
            className="flex-1 text-center lg:text-left pt-24 lg:pt-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-300">Available for New Projects</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-2 leading-[1.1] tracking-tighter text-center">
              <PremiumTextReveal text="Architecting Your" delay={0.3} className="block md:inline" />
              <br className="hidden md:block" />
              <PremiumTextReveal text="Digital Future." className="gradient-text block md:inline" delay={0.8} />
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-400 max-w-xl mb-8"
            >
              From AI-driven development to government grants and legal compliance.
              We <span className="gradient-text font-semibold">Build, Secure, and Fund</span> your vision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Link href="/contact" className="btn-primary">
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <button className="btn-secondary">
                View Services
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Spline Robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex-1 relative h-[400px] sm:h-[500px] lg:h-[600px] w-full"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// STATS SECTION
// ============================================
const stats = [
  { label: 'Funding Secured', value: '$50M+', desc: 'Government grants & equity.' },
  { label: 'Digital Products', value: '200+', desc: 'Web, Mobile & AI Agents.' },
  { label: 'Success Rate', value: '98%', desc: 'Legal registration & compliance.' },
  { label: 'Client Satisfaction', value: '5.0', desc: 'Across all service sectors.' },
];

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  return (
    <section
      ref={ref}
      className="section relative bg-transparent"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <PremiumTextReveal text="Impact by the" /> <span className="gradient-text"><PremiumTextReveal text="Numbers" delay={0.3} /></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}

              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <GlowingCard innerClassName="text-center p-16 md:p-24 h-full flex flex-col items-center justify-center">
                <div className="stat-value gradient-text mb-4 text-5xl md:text-6xl font-extrabold">{stat.value}</div>
                <div className="text-white font-bold text-lg uppercase tracking-widest mb-3">{stat.label}</div>
                <div className="text-gray-500 text-base max-w-[200px] mx-auto leading-relaxed">{stat.desc}</div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SERVICE MATRIX SECTION
// ============================================
const services = [
  {
    id: 'web-mobile',
    title: 'Web & Mobile Engineering',
    icon: Smartphone,
    color: 'cyan',
    visual: 'devices'
  },
  {
    id: 'ai-agent',
    title: 'AI Agent Development',
    icon: Bot,
    color: 'cyan',
    visual: 'ai'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Ads',
    icon: Megaphone,
    color: 'cyan',
    visual: 'marketing'
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    icon: Scale,
    color: 'amber',
    visual: 'legal'
  },
  {
    id: 'grants',
    title: 'Govt. Grants & Funding',
    icon: Coins,
    color: 'amber',
    visual: 'grants'
  },
];

const ServiceVisual = ({ service }: { service: typeof services[0] }) => {
  const renderVisual = () => {
    switch (service.visual) {
      case 'devices':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Laptop Frame */}
            <div className="relative">
              <div className="w-64 h-40 border-2 border-cyan-500/30 rounded-lg bg-gradient-to-br from-cyan-500/5 to-transparent">
                <div className="absolute inset-2 border border-cyan-500/20 rounded">
                  <div className="h-3 border-b border-cyan-500/20 flex items-center px-2 gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="h-1 w-3/4 bg-cyan-500/30 rounded" />
                    <div className="h-1 w-1/2 bg-cyan-500/20 rounded" />
                    <div className="h-1 w-2/3 bg-cyan-500/20 rounded" />
                  </div>
                </div>
              </div>
              <div className="h-3 w-32 mx-auto bg-gradient-to-b from-gray-700/50 to-gray-800/50 rounded-b-lg" />
            </div>

            {/* Mobile Frame */}
            <motion.div
              className="absolute -right-8 top-8 w-20 h-36 border-2 border-cyan-500/30 rounded-xl bg-gradient-to-br from-cyan-500/5 to-transparent"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="h-full p-1">
                <div className="h-full border border-cyan-500/20 rounded-lg p-1">
                  <div className="w-6 h-1 bg-cyan-500/30 rounded mx-auto mb-1" />
                  <div className="space-y-1">
                    <div className="h-1 w-3/4 bg-cyan-500/20 rounded" />
                    <div className="h-1 w-1/2 bg-cyan-500/20 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'ai':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Chat Interface */}
            <div className="w-72 h-56 glass rounded-xl overflow-hidden">
              <div className="h-8 border-b border-white/10 flex items-center px-4 gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-gray-400">AI Assistant</span>
              </div>
              <div className="p-4 space-y-3">
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2 text-xs text-gray-300 max-w-[180px]">
                    How can I help you today?
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-2 justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="bg-cyan-500/20 rounded-lg px-3 py-2 text-xs text-cyan-200 max-w-[180px]">
                    Build an AI agent
                  </div>
                </motion.div>

                {/* Typing indicator */}
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2 flex gap-1">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Code streaming background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-[8px] font-mono text-cyan-400 whitespace-nowrap"
                    style={{ top: `${20 + i * 20}%`, left: '-100%' }}
                    animate={{ x: ['0%', '300%'] }}
                    transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {`const agent = new AI(); agent.process(input); return response;`}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'grants':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Document morphing to chart */}
            <div className="relative">
              {/* Document */}
              <motion.div
                className="w-48 h-64 border border-amber-500/30 rounded-lg bg-gradient-to-br from-amber-500/5 to-transparent p-4"
                animate={{ rotateY: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="space-y-2 mb-4">
                  <div className="h-1.5 w-3/4 bg-amber-500/30 rounded" />
                  <div className="h-1.5 w-1/2 bg-amber-500/20 rounded" />
                  <div className="h-1.5 w-2/3 bg-amber-500/20 rounded" />
                </div>
                <div className="flex items-end justify-between h-24 gap-2">
                  <motion.div
                    className="w-6 bg-gradient-to-t from-amber-500/40 to-amber-500/20 rounded-t"
                    animate={{ height: ['30%', '60%', '30%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-6 bg-gradient-to-t from-amber-500/50 to-amber-500/30 rounded-t"
                    animate={{ height: ['50%', '80%', '50%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div
                    className="w-6 bg-gradient-to-t from-amber-500/60 to-amber-500/40 rounded-t"
                    animate={{ height: ['40%', '100%', '40%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.div
                    className="w-6 bg-gradient-to-t from-amber-500/70 to-amber-500/50 rounded-t"
                    animate={{ height: ['60%', '90%', '60%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                  />
                </div>
              </motion.div>

              {/* Floating coins */}
              <motion.div
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-white shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ boxShadow: '0 0 20px rgba(255, 149, 0, 0.4)' }}
              >
                ₹
              </motion.div>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <Scale className="w-32 h-32 text-amber-500/50" />
              <motion.div
                className="absolute inset-0 border-2 border-amber-500/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
        );

      case 'marketing':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <Megaphone className="w-32 h-32 text-cyan-500/50" />
              <motion.div
                className="absolute -right-8 top-0"
                animate={{ x: [0, 20, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded" />
              </motion.div>
              <motion.div
                className="absolute -right-4 top-8"
                animate={{ x: [0, 30, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded" />
              </motion.div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        {renderVisual()}
      </motion.div>
    </AnimatePresence>
  );
};

const ServiceMatrixSection = () => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section className="section relative bg-transparent">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}

          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <PremiumTextReveal text="360°" /> <span className="gradient-text"><PremiumTextReveal text="Business Solutions" delay={0.2} /></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-center">
            Comprehensive services spanning technology, legal, and finance sectors
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}

            className="space-y-2"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-item ${activeService.id === service.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveService(service)}
              >
                <div className="flex items-center gap-4">
                  <service.icon className={`w-6 h-6 ${activeService.id === service.id ? (service.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400') : 'text-gray-500'}`} />
                  <span>{service.title}</span>
                  <ChevronRight className={`w-5 h-5 ml-auto transition-all ${activeService.id === service.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right - Visual Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}

            className="h-80 lg:h-96"
          >
            <GlowingCard className="h-full" innerClassName="h-full flex items-center justify-center overflow-hidden p-12 md:p-20">
              <ServiceVisual service={activeService} />
            </GlowingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// INNOVATION SECTION (AI & DEV FOCUS)
// ============================================
const InnovationSection = () => {
  return (
    <section className="section relative overflow-hidden bg-transparent">
      {/* Background effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}

            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <PremiumTextReveal text="Next-Gen" /> <span className="gradient-text-tech"><PremiumTextReveal text="Intelligence." delay={0.2} /></span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              We don&apos;t just write code; we deploy intelligent agents. From LLM integration
              to custom backend architectures, we prepare your business for the autonomous future.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-medium">Powered by Henu OS Engineering</span>
            </div>
          </motion.div>

          {/* Neural Network Constellation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}

            className="relative h-80 lg:h-[400px]"
          >
            <svg className="w-full h-full" viewBox="0 0 400 400">
              {/* Neural connections */}
              {/* Layer 1 to Layer 2 */}
              {[0, 1, 2, 3].map((i) => (
                [0, 1, 2, 3, 4].map((j) => (
                  <motion.line
                    key={`l1-${i}-${j}`}
                    x1={80} y1={80 + i * 80}
                    x2={200} y2={50 + j * 75}
                    className="neural-connection"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ delay: (i + j) * 0.05, duration: 0.5 }}
                  />
                ))
              ))}
              {/* Layer 2 to Layer 3 */}
              {[0, 1, 2, 3, 4].map((i) => (
                [0, 1, 2, 3].map((j) => (
                  <motion.line
                    key={`l2-${i}-${j}`}
                    x1={200} y1={50 + i * 75}
                    x2={320} y2={80 + j * 80}
                    className="neural-connection"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ delay: (i + j) * 0.05 + 0.3, duration: 0.5 }}
                  />
                ))
              ))}

              {/* Layer 1 nodes */}
              {[0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={`n1-${i}`}
                  cx={80} cy={80 + i * 80}
                  r={6}
                  fill="#00D4FF"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))' }}
                />
              ))}

              {/* Layer 2 nodes */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={`n2-${i}`}
                  cx={200} cy={50 + i * 75}
                  r={8}
                  fill="#00D4FF"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                  style={{ filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.8))' }}
                />
              ))}

              {/* Layer 3 nodes */}
              {[0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={`n3-${i}`}
                  cx={320} cy={80 + i * 80}
                  r={6}
                  fill="#00D4FF"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.4, duration: 0.3 }}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))' }}
                />
              ))}

              {/* Pulsing effect on central nodes */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={`pulse-${i}`}
                  cx={200} cy={50 + i * 75}
                  r={15}
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth={1}
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// COMPLIANCE & FUNDING SECTION
// ============================================
const complianceCards = [
  {
    icon: FileText,
    title: 'Legal Documentation',
    desc: 'Contracts, NDAs, and incorporation.'
  },
  {
    icon: Coins,
    title: 'Govt. Grants',
    desc: 'Identify and secure non-dilutive funding.'
  },
  {
    icon: BadgeCheck,
    title: 'Compliance',
    desc: 'Taxation, audit, and regulatory adherence.'
  }
];

const ComplianceSection = () => {
  return (
    <section className="section relative overflow-hidden bg-transparent">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        {/* Main Heading - Centered as per screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}

          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            <PremiumTextReveal text="Navigating the" /> <span className="text-amber-500"><PremiumTextReveal text="Red Tape." delay={0.4} /></span>
          </h2>
        </motion.div>

        {/* Split Content: Graphic Left, Text Right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
          {/* Rotating Circular Graphic (Shifted left in screenshot) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}

            className="relative w-72 h-72 lg:w-96 lg:h-96 flex-shrink-0"
          >
            {/* Center Icon Box */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(255, 149, 0, 0.08)',
                  border: '1px solid rgba(255, 149, 0, 0.2)',
                  boxShadow: '0 0 50px rgba(255, 149, 0, 0.1)'
                }}
              >
                <Scale className="w-8 h-8 lg:w-10 lg:h-10 text-amber-500" />
              </div>
            </div>

            {/* Rotating Text Ring */}
            <svg className="w-full h-full animate-rotate-text z-10" viewBox="0 0 256 256">
              <defs>
                <path
                  id="compliancePath"
                  d="M 128,128 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
                />
              </defs>
              <text className="fill-amber-500/40 text-[12px] font-medium tracking-[0.25em] uppercase">
                <textPath href="#compliancePath">
                  Registration • Compliance • Grants • IP Protection •
                </textPath>
              </text>
            </svg>

            {/* Decorative concentric circles */}
            <div className="absolute inset-4 border border-amber-500/10 rounded-full z-0" />
            <div className="absolute inset-12 border border-amber-500/5 rounded-full z-0" />
          </motion.div>

          {/* Expert Guidance Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}

            className="flex-1"
          >
            <h3 className="text-3xl md:text-4xl font-semibold text-white mb-8 leading-tight">
              Expert guidance through complex regulatory landscapes.
            </h3>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
              We specialize in helping businesses secure government funding, maintain legal compliance, and protect their intellectual property. Our team of experts takes the complexity out of bureaucratic processes so you can focus on building your business.
            </p>
          </motion.div>
        </div>

        {/* Cards Row - Exactly as screenshot */}
        <div className="grid md:grid-cols-3 gap-8">
          {complianceCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}

              transition={{ delay: index * 0.1 }}
              className="h-full group"
            >
              <GlowingCard className="h-full" innerClassName="p-14 md:p-22 h-full flex flex-col items-start bg-transparent">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/15 group-hover:scale-110 transition-all duration-500 border border-amber-500/20 shadow-xl shrink-0">
                    <card.icon className="w-7 h-7 text-amber-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors leading-tight">{card.title}</h4>
                </div>
                <p className="text-gray-400 text-xl leading-relaxed flex-1 font-medium">{card.desc}</p>

                {/* Subtle hover accent */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TESTIMONIALS SECTION
// ============================================
import { TestimonialsColumn } from '@/components/ui/testimonials-columns';

const testimonials = [
  {
    text: "Henu OS didn't just build our app; they helped us secure a ₹50L government grant to fund it. A complete partner.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Rahul Sharma",
    role: "Founder, TechStart India"
  },
  {
    text: "Their AI agents transformed our customer support. Response time dropped by 80% while satisfaction soared.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Patel",
    role: "CTO, FinServe Pro"
  },
  {
    text: "From company registration to compliance, Henu OS handled everything. We could focus entirely on our product.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Amit Kumar",
    role: "Co-founder, GreenTech Solutions"
  },
  {
    text: "The web platform they built for us increased our conversions by 300%. Their attention to detail is remarkable.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    name: "Sneha Gupta",
    role: "CEO, EduLearn Platform"
  },
  {
    text: "Working with Henu OS was seamless. They delivered our mobile app ahead of schedule with exceptional quality.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Vikram Singh",
    role: "Product Manager, HealthMate"
  },
  {
    text: "Their legal documentation service saved us months of work. Everything was professionally prepared.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Anita Reddy",
    role: "Director, MedTech India"
  },
  {
    text: "The digital marketing campaign exceeded all expectations. Our brand visibility increased tenfold.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Hassan Ali",
    role: "Marketing Head, D2C Brand"
  },
  {
    text: "Henu OS helped us navigate complex compliance requirements. Their expertise is unmatched.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Kavita Sharma",
    role: "Compliance Officer, FinCorp"
  },
  {
    text: "The AI agent they developed automated 70% of our repetitive tasks. Game-changing efficiency.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Rajesh Kumar",
    role: "Operations Head, LogiTech"
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsSection = () => {
  return (
    <section className="section relative bg-transparent">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}

          className="flex flex-col items-center text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="text-sm text-gray-300">Client Success Stories</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <PremiumTextReveal text="Partners in" /> <span className="gradient-text"><PremiumTextReveal text="Growth." delay={0.3} /></span>
          </h2>
          <p className="text-gray-400 max-w-[540px] mx-auto text-center">
            See what our clients have to say about working with us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

// ============================================
// FAQ SECTION
// ============================================
const faqs = [
  {
    question: "How do you assist with Government Grants?",
    answer: "We provide end-to-end support including grant identification, application preparation, documentation, and follow-up with government agencies. Our team has successfully secured over $50M in funding for our clients."
  },
  {
    question: "Do you build AI Agents for non-tech businesses?",
    answer: "Absolutely! We specialize in making AI accessible. Whether you're in retail, healthcare, or manufacturing, we design custom AI agents that integrate seamlessly with your existing workflows."
  },
  {
    question: "What is the timeline for a full-stack mobile app?",
    answer: "Typically, a full-featured mobile app takes 3-6 months from concept to launch. This includes design, development, testing, and deployment. We follow an agile methodology with bi-weekly deliverables."
  },
  {
    question: "Can you handle company registration and trademarking?",
    answer: "Yes, we offer comprehensive legal services including company registration, trademark filing, IP protection, and ongoing compliance management. Our legal team ensures all formalities are handled efficiently."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section bg-transparent">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}

          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <PremiumTextReveal text="Got" /> <span className="gradient-text"><PremiumTextReveal text="Questions?" delay={0.1} /></span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}

              transition={{ delay: index * 0.1 }}
              className="accordion-item"
            >
              <button
                className="accordion-trigger"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="accordion-content">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServiceMatrixSection />
      <InnovationSection />
      <ComplianceSection />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
