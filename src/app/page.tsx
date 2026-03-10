'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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
import { TiltCard } from '@/components/ui/tilt-card';
import { useInView } from 'framer-motion';
import { ReviewSection, Review } from '@/components/review-section';
import { TestimonialsColumn, Testimonial, TestimonialCard } from '@/components/ui/testimonials-columns';
import { CharacterV1 } from '@/components/ui/text-scroll-animation';
import { useMediaQuery } from '@/hooks/use-media-query';


// ============================================
// HERO SECTION WITH 3D SPLINE
// ============================================
const HeroSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
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
            background: 'radial-gradient(circle, rgba(109, 40, 217, 0.15) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)',
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
        {/* PHYSICAL SPACER FOR MOBILE - BRUTE FORCE */}
        <div className="h-[120px] md:hidden w-full" />

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 pt-0 lg:pt-0 min-h-[calc(100vh-280px)]">
          {/* Left Content */}
          <motion.div
            style={{ y, opacity }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.2] tracking-tighter text-center lg:text-left flex flex-col items-center lg:items-start px-2">
              <span className="block mb-2 text-white">
                <PremiumTextReveal text="Architecting Your" delay={0.3} />
              </span>
              <span className="block">
                <PremiumTextReveal text="Digital Future." className="gradient-text" delay={0.8} />
              </span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mb-12 px-4 lg:px-0 mx-auto lg:mx-0"
            >
              From AI-driven development to government grants and legal compliance.
              We <span className="gradient-text font-semibold">Build, Secure, and Fund</span> your vision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 px-4 lg:px-0"
            >
              <Link href="/services" className="btn-primary w-full sm:w-auto">
                Start Your Project
                <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn-secondary w-full sm:w-auto">
                View Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Spline Robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex-1 relative h-[350px] sm:h-[450px] lg:h-[600px] w-full hidden md:block"
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
  { label: 'Projects Completed', value: '200+', desc: 'Across Web, Mobile & AI.' },
  { label: 'Happy Clients', value: '150+', desc: 'Global business partners.' },
  { label: 'Success Rate', value: '98%', desc: 'Legal & technical excellence.' },
  { label: 'Client Rating', value: '5.0', desc: 'Post-project satisfaction.' },
];


const CountUp = ({ end, decimals = 0, suffix = "" }: { end: number; decimals?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime = 0;
      const duration = 2000; // 2 seconds

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(easeOutQuart * end);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

// Scroll animated heading component
const ScrollAnimatedHeading = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref} className={cn("flex flex-wrap justify-center text-center", className)}>
      <span className="inline-block">
        {text}
      </span>
    </div>
  );
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className="section relative bg-transparent overflow-hidden"
      style={{ paddingTop: '150px', paddingBottom: '150px' }}
    >
      {/* Background Elements from Portfolio */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="horizon-grid opacity-30" />
        <div className="grid-background opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <ScrollAnimatedHeading
              text="Impact by the Numbers"
              className="inline-block text-4xl md:text-5xl font-bold"
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const numValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
            const suffix = stat.value.replace(/[0-9.]/g, '');

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="stat-value font-black mb-2 text-4xl md:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
                    <CountUp end={numValue} suffix={suffix} decimals={stat.value.includes('.') ? 1 : 0} />
                  </span>
                </div>
                <div className="text-white/80 font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-2">{stat.label}</div>
                <div className="text-gray-500 text-[10px] md:text-xs leading-relaxed max-w-[150px]">{stat.desc}</div>
              </motion.div>
            );
          })}
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
    <section className="section bg-transparent relative overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      {/* Background Light Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >


            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 md:mb-8 leading-tight">
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
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20 shadow-[0_0_20px_rgba(109,40,217,0.1)]">
                  <Cpu className="w-7 h-7 text-purple-400" />
                </div>
                <div className="pt-1">
                  <h4 className="text-lg font-bold text-white mb-1">AI-Native</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Built-in neural networks for autonomous operations.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-[0_0_20px_rgba(79,70,229,0.1)]">
                  <ShieldCheck className="w-7 h-7 text-indigo-400" />
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
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
            <GlowingCard className="relative z-10" innerClassName="p-0 overflow-hidden border-white/10 bg-[#0A0A0A] backdrop-blur-xl">
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
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                      <Zap size={20} className="text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">SYSTEM ACTIVE</div>
                      <div className="text-indigo-400 text-xs font-mono">LIVE FEED: ENCRYPTED</div>
                    </div>
                  </div>
                </div>
              </div>
            </GlowingCard>

            {/* Ambient secondary glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full" />
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
    color: 'purple',
    visual: 'website'
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    color: 'purple',
    visual: 'backend'
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    icon: Smartphone,
    color: 'purple',
    visual: 'mobile-app'
  },
  {
    id: 'ai-automation',
    title: 'AI Automations',
    icon: Bot,
    color: 'purple',
    visual: 'ai'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    icon: Palette,
    color: 'purple',
    visual: 'graphic-design'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Ads',
    icon: Megaphone,
    color: 'purple',
    visual: 'digital-marketing'
  },
  {
    id: 'legal',
    title: 'Legal Services',
    icon: Scale,
    color: 'indigo',
    visual: 'legal'
  },
  {
    id: 'funding',
    title: 'Funding Solutions',
    icon: Coins,
    color: 'indigo',
    visual: 'grants'
  },
];



const ServiceVisual = ({ service }: { service: typeof services[0] }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const renderVisual = () => {
    switch (service.visual) {
      case 'website':
        // Website Development: Browser window with animated page loading
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="w-72 h-48 border-2 border-purple-500/30 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent overflow-hidden"
              initial={isMobile ? {} : { scale: 0.8, opacity: 0 }}
              animate={isMobile ? {} : { scale: 1, opacity: 1 }}
              transition={isMobile ? {} : { duration: 0.6, type: "spring" }}
            >
              {/* Browser Chrome */}
              <div className="h-8 border-b border-purple-500/20 flex items-center px-3 gap-2 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 h-5 bg-white/5 rounded flex items-center px-2">
                  <Globe className="w-3 h-3 text-purple-400/50" />
                </div>
              </div>

              {/* Page Content with Animations */}
              <div className="p-4 space-y-3">
                <motion.div
                  className="h-6 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded"
                  animate={isMobile ? {} : { width: ["60%", "80%", "60%"] }}
                  transition={isMobile ? {} : { duration: 3, repeat: Infinity }}
                />
                <div className="space-y-2">
                  <motion.div
                    className="h-2 bg-purple-500/20 rounded"
                    animate={isMobile ? {} : { width: ["70%", "90%", "70%"] }}
                    transition={isMobile ? {} : { duration: 2.5, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="h-2 bg-purple-500/15 rounded"
                    animate={isMobile ? {} : { width: ["50%", "70%", "50%"] }}
                    transition={isMobile ? {} : { duration: 2.8, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'backend':
        // Backend Development: Server with data flow animation
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Server Icon */}
              <motion.div
                className="w-24 h-32 border-2 border-purple-500/30 rounded-lg bg-gradient-to-b from-purple-500/10 to-purple-500/5 relative"
                animate={isMobile ? {} : { scale: [1, 1.05, 1] }}
                transition={isMobile ? {} : { duration: 2, repeat: Infinity }}
              >
                {/* Server Lights */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={isMobile ? {} : { opacity: [1, 0.3, 1] }}
                    transition={isMobile ? {} : { duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={isMobile ? {} : { opacity: [0.3, 1, 0.3] }}
                    transition={isMobile ? {} : { duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                </div>

                {/* Server Lines */}
                <div className="absolute inset-0 flex flex-col justify-center px-3 gap-1">
                  <div className="h-0.5 w-full bg-purple-500/20 rounded" />
                  <div className="h-0.5 w-full bg-purple-500/20 rounded" />
                  <div className="h-0.5 w-full bg-purple-500/20 rounded" />
                </div>
              </motion.div>

              {/* Data Packets Floating */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500/40 rounded-sm"
                animate={isMobile ? {} : {
                  y: [0, -20, 0],
                  opacity: [0, 1, 0]
                }}
                transition={isMobile ? {} : { duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-500/40 rounded-sm"
                animate={isMobile ? {} : {
                  y: [0, 20, 0],
                  opacity: [0, 1, 0]
                }}
                transition={isMobile ? {} : { duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </div>
        );

      case 'mobile-app':
        // Mobile App: Phone with swipe animation
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="w-32 h-64 border-4 border-purple-500/30 rounded-[2rem] bg-gradient-to-br from-purple-500/10 to-pink-500/5 relative overflow-hidden"
              initial={isMobile ? {} : { rotateY: -30, opacity: 0 }}
              animate={isMobile ? {} : { rotateY: 0, opacity: 1 }}
              transition={isMobile ? {} : { duration: 0.8 }}
              style={{ perspective: 1000 }}
            >
              {/* Phone Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/50 rounded-full" />

              {/* Screen Content */}
              <div className="mt-8 p-3 space-y-3">
                {/* App Cards Sliding */}
                <motion.div
                  className="h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center"
                  animate={isMobile ? {} : {
                    x: [-100, 0, 0, -100],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={isMobile ? {} : {
                    duration: 4,
                    repeat: Infinity,
                    times: [0, 0.2, 0.8, 1]
                  }}
                >
                  <Smartphone className="w-6 h-6 text-white/60" />
                </motion.div>

                <motion.div
                  className="h-16 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl flex items-center justify-center"
                  animate={isMobile ? {} : {
                    x: [100, 0, 0, 100],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={isMobile ? {} : {
                    duration: 4,
                    repeat: Infinity,
                    times: [0, 0.2, 0.8, 1],
                    delay: 2
                  }}
                >
                  <Smartphone className="w-6 h-6 text-white/60" />
                </motion.div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/20 rounded-full" />
            </motion.div>
          </div>
        );

      case 'ai':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Chat Interface */}
            <div className="w-full max-w-[280px] sm:max-w-xs md:w-72 h-48 sm:h-52 md:h-56 glass rounded-xl overflow-hidden">
              <div className="h-8 border-b border-white/10 flex items-center px-4 gap-2">
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">AI Assistant</span>
              </div>
              <div className="p-4 space-y-3">
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-purple-400" />
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
                  <div className="bg-purple-500/20 rounded-lg px-3 py-2 text-xs text-purple-200 max-w-[180px]">
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
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-purple-400" />
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2 flex gap-1">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-purple-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-purple-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-purple-400"
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
                    className="absolute text-[8px] font-mono text-purple-400 whitespace-nowrap"
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
            <div className="relative scale-75 sm:scale-90 md:scale-100">
              {/* Document */}
              <motion.div
                className="w-48 h-64 border border-indigo-500/30 rounded-lg bg-gradient-to-br from-indigo-500/5 to-transparent p-4"
                animate={{ rotateY: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="space-y-2 mb-4">
                  <div className="h-1.5 w-3/4 bg-indigo-500/30 rounded" />
                  <div className="h-1.5 w-1/2 bg-indigo-500/20 rounded" />
                  <div className="h-1.5 w-2/3 bg-indigo-500/20 rounded" />
                </div>
                <div className="flex items-end justify-between h-24 gap-2">
                  <motion.div
                    className="w-6 bg-gradient-to-t from-indigo-500/40 to-indigo-500/20 rounded-t"
                    animate={{ height: ['30%', '60%', '30%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-6 bg-gradient-to-t from-indigo-500/50 to-indigo-500/30 rounded-t"
                    animate={{ height: ['50%', '80%', '50%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div
                    className="w-6 bg-gradient-to-t from-indigo-500/60 to-indigo-500/40 rounded-t"
                    animate={{ height: ['40%', '100%', '40%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.div
                    className="w-6 bg-gradient-to-t from-indigo-500/70 to-indigo-500/50 rounded-t"
                    animate={{ height: ['60%', '90%', '60%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                  />
                </div>
              </motion.div>

              {/* Floating coins */}
              <motion.div
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)' }}
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
              <Scale className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-indigo-500/50" />
              <motion.div
                className="absolute inset-0 border-2 border-indigo-500/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
        );

      case 'graphic-design':
        // Graphic Design: Color palette with swatches
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Palette Board */}
              <motion.div
                className="w-48 h-56 border-2 border-purple-500/30 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-4 relative"
                initial={isMobile ? {} : { scale: 0.9, rotate: -10, opacity: 0 }}
                animate={isMobile ? {} : { scale: 1, rotate: 0, opacity: 1 }}
                transition={isMobile ? {} : { duration: 0.7, type: "spring" }}
              >
                {/* Color Swatches */}
                <div className="grid grid-cols-3 gap-3">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-500"
                    animate={isMobile ? {} : { rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
                    transition={isMobile ? {} : { duration: 2, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500"
                    animate={isMobile ? {} : { rotate: [0, -5, 0], scale: [1, 1.1, 1] }}
                    transition={isMobile ? {} : { duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500"
                    animate={isMobile ? {} : { rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
                    transition={isMobile ? {} : { duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500"
                    animate={isMobile ? {} : { rotate: [0, -5, 0], scale: [1, 1.1, 1] }}
                    transition={isMobile ? {} : { duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500"
                    animate={isMobile ? {} : { rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
                    transition={isMobile ? {} : { duration: 2, repeat: Infinity, delay: 0.8 }}
                  />
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500"
                    animate={isMobile ? {} : { rotate: [0, -5, 0], scale: [1, 1.1, 1] }}
                    transition={isMobile ? {} : { duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>

                {/* Brush Icon */}
                <motion.div
                  className="absolute -top-6 -right-6 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/30"
                  animate={isMobile ? {} : { rotate: [0, 15, 0] }}
                  transition={isMobile ? {} : { duration: 3, repeat: Infinity }}
                >
                  <Palette className="w-8 h-8 text-purple-400" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        );

      case 'digital-marketing':
        // Digital Marketing: Ad campaign with metrics
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Ad Billboard */}
              <motion.div
                className="w-64 h-40 border-2 border-purple-500/30 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-4 overflow-hidden"
                initial={isMobile ? {} : { opacity: 0, y: 20 }}
                animate={isMobile ? {} : { opacity: 1, y: 0 }}
                transition={isMobile ? {} : { duration: 0.6 }}
              >
                {/* Megaphone */}
                <div className="absolute top-4 left-4">
                  <Megaphone className="w-10 h-10 text-purple-400/70" />
                </div>

                {/* Animated Metrics */}
                <div className="absolute bottom-4 right-4 space-y-2">
                  <motion.div
                    className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full"
                    animate={isMobile ? {} : { scale: [1, 1.1, 1] }}
                    transition={isMobile ? {} : { duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-green-400 font-bold">+45% CTR</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full"
                    animate={isMobile ? {} : { scale: [1, 1.1, 1] }}
                    transition={isMobile ? {} : { duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-xs text-blue-400 font-bold">2.5K Reach</span>
                  </motion.div>
                </div>

                {/* Sound Waves */}
                <motion.div
                  className="absolute -right-8 top-8"
                  animate={isMobile ? {} : { x: [0, 20, 0], opacity: [0, 1, 0] }}
                  transition={isMobile ? {} : { duration: 2, repeat: Infinity }}
                >
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded" />
                </motion.div>
                <motion.div
                  className="absolute -right-4 top-12"
                  animate={isMobile ? {} : { x: [0, 30, 0], opacity: [0, 1, 0] }}
                  transition={isMobile ? {} : { duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        );

      case 'marketing':
        // Fallback marketing animation (if still needed)
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <Megaphone className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-indigo-500/50" />
              <motion.div
                className="absolute -right-8 top-0"
                animate={{ x: [0, 20, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded" />
              </motion.div>
              <motion.div
                className="absolute -right-4 top-8"
                animate={{ x: [0, 30, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded" />
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
    <section className="section relative bg-transparent" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <ScrollAnimatedHeading
              text="360° Business Solutions"
              className="inline-block text-4xl md:text-5xl font-bold"
            />
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-center">
            Comprehensive services spanning technology, legal, and finance sectors
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Right - Visual Preview - HIDDEN on mobile, visible desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="h-64 sm:h-80 lg:h-96 order-1 lg:order-2 hidden md:block"
          >
            <GlowingCard className="h-full" innerClassName="h-full flex items-center justify-center overflow-hidden p-8 md:p-16 bg-[#0A0A0A] border border-white/5">
              <ServiceVisual service={activeService} />
            </GlowingCard>
          </motion.div>

          {/* Left - Navigation - Shows SECOND on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-2 order-2 lg:order-1"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-item cursor-pointer ${activeService.id === service.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveService(service)}
                onClick={() => setActiveService(service)}
              >
                <div className="flex items-center gap-4">
                  <service.icon className={`w-6 h-6 ${activeService.id === service.id ? (service.color === 'purple' ? 'text-purple-400' : 'text-indigo-400') : 'text-gray-500'}`} />
                  <span>{service.title}</span>
                  <ChevronRight className={`w-5 h-5 ml-auto transition-all ${activeService.id === service.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                </div>
              </div>
            ))}
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
    "100% transparency in development process",
    "Dedicated project manager for each project",
    "24/7 support and maintenance",
    "Agile development methodology",
    "Competitive pricing"
  ];

  return (
    <section className="section bg-transparent" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-purple-400">Henu</span>{" "}
              <span className="text-indigo-400">OS</span>&quest;
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
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-purple-400" />
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
          >
            <GlowingCard className="h-full" innerClassName="flex flex-col items-center text-center group bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden relative" style={{ padding: '80px 40px' }}>
              {/* Background Decorative Element */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/5">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>

              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                <span className="text-purple-400">200</span>
                <span className="text-indigo-400">+</span>
              </div>

              <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">Projects Delivered</h3>

              <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[180px]">
                Web, Mobile, AI & Enterprise Solutions
              </p>


              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </GlowingCard>

            <GlowingCard className="h-full" innerClassName="flex flex-col items-center text-center group bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden relative" style={{ padding: '80px 40px' }}>
              {/* Background Decorative Element */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-500/5">
                <ShieldCheck className="w-8 h-8 text-indigo-400" />
              </div>

              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                <span className="text-purple-400">98</span>
                <span className="text-indigo-400">%</span>
              </div>

              <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-4">Client Satisfaction</h3>

              <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[180px]">
                500+ Post-Project Performance Reviews
              </p>


              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </GlowingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



// ============================================
// TESTIMONIALS SECTION
// ============================================

const initialTestimonials: any[] = [];




const TestimonialsSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 3));
  const secondColumn = testimonials.slice(Math.ceil(testimonials.length / 3), Math.ceil(testimonials.length * 2 / 3));
  const thirdColumn = testimonials.slice(Math.ceil(testimonials.length * 2 / 3));

  return (
    <section className="section relative bg-transparent" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-12"
        >


          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <ScrollAnimatedHeading
              text="Partners in Growth."
              className="inline-block text-4xl md:text-5xl font-bold"
            />
          </h2>
          <p className="text-gray-400 max-w-[540px] mx-auto text-center">
            See what our clients have to say about working with us.
          </p>
        </motion.div>

        {testimonials.length > 3 ? (
          <div className={cn(
            "flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden transition-all duration-700",
            testimonials.length === 0 && "opacity-0 h-0"
          )}>
            {firstColumn.length > 0 && <TestimonialsColumn testimonials={firstColumn} duration={20} />}
            {secondColumn.length > 0 && <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={25} />}
            {thirdColumn.length > 0 && <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={22} />}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 mt-12 pb-10">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="w-full max-w-[400px]">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};



export default function HomePage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
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
    <main className="overflow-hidden">
      <HeroSection />
      <StatsSection />
      <HenuOSIntroductionSection />
      <ServiceMatrixSection />
      <WhyChooseUsSection />
      {allTestimonials.length > 0 && <TestimonialsSection testimonials={allTestimonials} />}
      <ReviewSection onReviewSubmitted={handleReviewSubmitted} />
    </main>
  );
}
