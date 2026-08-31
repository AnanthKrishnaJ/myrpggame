import React from 'react';
import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base Dark Fantasy Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#1A1025] to-[#0A1A1E]" />

      {/* Moving Moonlight/Fog Highlights */}
      <motion.div 
        animate={{ 
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(50,50,120,0.15)_0%,transparent_50%)] blur-[100px]"
      />

      <motion.div 
        animate={{ 
          x: ['10%', '-10%', '10%'],
          y: ['10%', '-10%', '10%'],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-0 w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(30,100,100,0.1)_0%,transparent_50%)] blur-[120px]"
      />

      {/* Subtle Particles / Fireflies */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10
          }}
          className="absolute w-1 h-1 bg-teal-400 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.8)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}
