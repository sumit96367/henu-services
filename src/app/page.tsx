'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Server,
  Palette,
  Smartphone,
  Megaphone,
  Bot,
  Scale,
  Coins,
  ChevronDown,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Zap,
  ShieldCheck,
  Cpu,
  Check,
} from 'lucide-react';

import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { GlowingCard } from '@/components/ui/glowing-card';
import { PremiumTextReveal } from '@/components/ui/premium-text-reveal';
import { ReviewSection, Review } from '@/components/review-section';
import { TestimonialsColumn, Testimonial } from '@/components/ui/testimonials-columns';


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
      <div className="container relative z-10 mx-auto px-6">
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-2 leading-[1.1] tracking-tighter text-center lg:text-left flex flex-col items-center lg:items-start">
              <PremiumTextReveal text="Architecting Your" delay={0.3} />
              <PremiumTextReveal text="Digital Future." className="gradient-text" delay={0.8} />
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
              <Link href="/services" className="btn-primary">
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn-secondary">
                View Services
              </Link>
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
              <GlowingCard innerClassName="text-center p-14 md:p-20 h-full flex flex-col items-center justify-center">
                <div className="stat-value gradient-text mb-4 text-4xl md:text-5xl font-extrabold">{stat.value}</div>
                <div className="text-white font-bold text-lg uppercase tracking-widest mb-3">{stat.label}</div>
                <div className="text-gray-500 text-base leading-relaxed">{stat.desc}</div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// HENU OS INTRODUCTION SECTION
// ============================================
const HenuOSIntroductionSection = () => {
  return (
    <section className="section bg-transparent relative overflow-hidden">
      {/* Background Light Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 font-mono text-cyan-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              SYSTEM OVERVIEW
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Powering the <br />
              <span className="gradient-text">New Millennium.</span>
            </h2>

            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
              HENU OS is a revolutionary computing ecosystem designed for the next generation of business.
              Integrated with autonomous AI agents, unbreakable security protocols, and
              modular architecture, it serves as the ultimate foundation for digital excellence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                  <Cpu className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="pt-1">
                  <h4 className="text-lg font-bold text-white mb-1">AI-Native</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Built-in neural networks for autonomous operations.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-[0_0_20px_rgba(255,149,0,0.1)]">
                  <ShieldCheck className="w-7 h-7 text-amber-400" />
                </div>
                <div className="pt-1">
                  <h4 className="text-lg font-bold text-white mb-1">Quantum-Ready</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Future-proof encryption and security layers.</p>
                </div>
              </div>
            </div>

            <Link
              href="https://henuos.netlify.app/"
              target="_blank"
              className="btn-primary group"
            >
              Explore HENU OS Ecosystem
              <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
            <GlowingCard className="relative z-10" innerClassName="p-0 overflow-hidden border-white/10 bg-black/40 backdrop-blur-xl">
              <div className="aspect-video relative group">
                <iframe
                  src="https://www.youtube.com/embed/CTGvHiQyfwg?start=18&autoplay=0&mute=0&rel=0"
                  title="HENU OS Introduction"
                  className="w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* Overlay shadow for depth */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                {/* Floating UI Elements Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.5)]">
                      <Zap size={20} className="text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">SYSTEM ACTIVE</div>
                      <div className="text-cyan-400 text-xs font-mono">LIVE FEED: ENCRYPTED</div>
                    </div>
                  </div>
                </div>
              </div>
            </GlowingCard>

            {/* Ambient secondary glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 blur-[60px] rounded-full" />
          </motion.div>
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
    id: 'web-dev',
    title: 'Website Development',
    icon: Globe,
    color: 'cyan',
    visual: 'devices'
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    color: 'cyan',
    visual: 'devices'
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    icon: Smartphone,
    color: 'cyan',
    visual: 'devices'
  },
  {
    id: 'ai-automation',
    title: 'AI Automations',
    icon: Bot,
    color: 'cyan',
    visual: 'ai'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    icon: Palette,
    color: 'cyan',
    visual: 'marketing'
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
    title: 'Legal Services',
    icon: Scale,
    color: 'amber',
    visual: 'legal'
  },
  {
    id: 'funding',
    title: 'Funding Solutions',
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
// WHY CHOOSE US SECTION
// ============================================
const WhyChooseUsSection = () => {
  const whyChooseUs = [
    "10+ years of industry experience",
    "100% transparency in development process",
    "Dedicated project manager for each project",
    "24/7 support and maintenance",
    "Agile development methodology",
    "Competitive pricing"
  ];

  return (
    <section className="section bg-transparent">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-green-400">Henu</span>{" "}
              <span className="text-amber-400">OS</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              We combine technical excellence with business acumen to deliver solutions that drive real results.
            </p>
            <ul className="space-y-4">
              {whyChooseUs.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative space-y-6"
          >
            <GlowingCard innerClassName="p-12 md:p-16 flex flex-col items-center text-center h-full">
              <div className="text-4xl font-bold mb-4">
                <span className="text-green-400">200</span>
                <span className="text-amber-400">+</span>
              </div>
              <div className="text-xl text-white font-bold mb-3 tracking-tight">Projects Delivered</div>
              <div className="text-gray-400 text-base leading-relaxed font-medium">Across web, mobile, AI, and enterprise solutions</div>
            </GlowingCard>
            <div className="ml-8 md:ml-12">
              <GlowingCard innerClassName="p-12 md:p-16 flex flex-col items-center text-center h-full">
                <div className="text-4xl font-bold mb-4">
                  <span className="text-green-400">98</span>
                  <span className="text-amber-400">%</span>
                </div>
                <div className="text-xl text-white font-bold mb-3 tracking-tight">Client Satisfaction</div>
                <div className="text-gray-400 text-base leading-relaxed font-medium">Based on post-project surveys</div>
              </GlowingCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



// ============================================
// TESTIMONIALS SECTION
// ============================================

const initialTestimonials = [
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

const TestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 3));
  const secondColumn = testimonials.slice(Math.ceil(testimonials.length / 3), Math.ceil(testimonials.length * 2 / 3));
  const thirdColumn = testimonials.slice(Math.ceil(testimonials.length * 2 / 3));

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



export default function HomePage() {
  const [allTestimonials, setAllTestimonials] = useState(initialTestimonials);

  const handleReviewSubmitted = (review: Review) => {
    setAllTestimonials((prev) => [
      {
        text: review.text,
        image: review.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random&color=fff`,
        name: review.name,
        role: review.role,
      },
      ...prev,
    ]);
  };

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <HenuOSIntroductionSection />
      <ServiceMatrixSection />
      <WhyChooseUsSection />
      <TestimonialsSection testimonials={allTestimonials} />
      <ReviewSection onReviewSubmitted={handleReviewSubmitted} />
    </main>
  );
}
