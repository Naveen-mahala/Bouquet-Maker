'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Flower } from 'lucide-react';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 70, damping: 15 },
    },
  };

  const flowerBloomVariants = {
    hidden: { scale: 0, rotate: -45, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 0.85,
      transition: { type: 'spring' as const, stiffness: 50, damping: 12, delay: 0.3 },
    },
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden bg-gradient-to-tr from-[#fbf8f3] via-[#f7f2ea] to-[#fceef2]">
      
      {/* Decorative Botanical Ambient Shapes */}
      <motion.div 
        variants={flowerBloomVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] opacity-10 pointer-events-none select-none text-rose-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      </motion.div>
      <motion.div 
        variants={flowerBloomVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-[-15%] left-[-15%] w-[500px] h-[500px] opacity-10 pointer-events-none select-none text-emerald-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
        </svg>
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(179,130,84,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-80" />

      {/* Landing Content Wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-4xl text-center"
      >
        {/* Little Floral Spark Indicator */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-rose-200/50 bg-rose-50/50 backdrop-blur-md text-rose-700 text-xs font-semibold mb-6 shadow-sm"
        >
          <Flower className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Designed with Love & Stems</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          variants={itemVariants}
          className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-stone-900 leading-[1.1] mb-6"
        >
          Build a Bouquet <br />
          for <span className="relative text-amber-800 italic font-medium">Someone Special <Heart className="inline w-10 h-10 md:w-12 md:h-12 text-rose-600 fill-rose-500 animate-pulse ml-1" /></span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-stone-600 text-base md:text-xl max-w-2xl leading-relaxed mb-10 font-medium"
        >
          Step into a digital florist workspace. Arrange roses, tulips, lilies, and lush foliage on our canvas. Wrap your design, tie it with ribbon, attach a personal calligraphy card, and download your gift.
        </motion.p>

        {/* Interactive CTA button */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/builder"
            className="group inline-flex items-center gap-2.5 px-8 py-4.5 rounded-2xl text-base font-semibold text-white bg-amber-800 hover:bg-amber-900 transition-all duration-300 shadow-lg shadow-amber-900/10 hover:shadow-xl hover:shadow-amber-900/25"
          >
            Start Designing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Feature Pills */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mt-24 z-10"
      >
        {[
          { title: "20+ Flower Varieties", desc: "Roses, Tulips, Peonies, Orchids..." },
          { title: "Realistic Shadows", desc: "Natural floral layering engine" },
          { title: "Elegant Wrapping", desc: "Kraft papers, silk ribbon bows" },
          { title: "PNG & PDF Card Export", desc: "Ready to print or share instantly" }
        ].map((feat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-4 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md shadow-sm text-center flex flex-col justify-center items-center hover:bg-white/70 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mb-2.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
            <h4 className="font-serif text-sm font-bold text-stone-800">{feat.title}</h4>
            <p className="text-[11px] text-stone-500 mt-1">{feat.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Info */}
      <div className="absolute bottom-6 text-center text-xs text-stone-400 font-medium">
        Made with love • Pure client-side florist engine 🌸
      </div>
    </main>
  );
}
