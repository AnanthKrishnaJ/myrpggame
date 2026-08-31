import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Player } from '../types';

type IdleState = 'breathing' | 'looking' | 'ready';

export function HeroAvatar({ player, faceOnly = false, className }: { player: Player; faceOnly?: boolean; className?: string }) {
  const [idleState, setIdleState] = useState<IdleState>('breathing');

  useEffect(() => {
    if (faceOnly) return;
    const interval = setInterval(() => {
      const states: IdleState[] = ['breathing', 'looking', 'ready'];
      const nextState = states[Math.floor(Math.random() * states.length)];
      setIdleState(nextState);
    }, 5000); // Change idle state every 5 seconds
    return () => clearInterval(interval);
  }, [faceOnly]);

  if (faceOnly) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className || ''}`}>
        <svg viewBox="20 0 80 80" className="w-full h-full filter drop-shadow-[0_4px_6px_rgba(250,204,21,0.3)]">
          <defs>
            <linearGradient id="blondeHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fee2e2" />
              <stop offset="100%" stopColor="#fecaca" />
            </linearGradient>
            <linearGradient id="eyeColor" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <g transform="translate(10, 5)">
            {/* Back Hair */}
            <path d="M 30 15 Q 20 50 25 80 Q 50 85 75 80 Q 80 50 70 15 Z" fill="url(#blondeHair)" />
            
            {/* Neck */}
            <path d="M 45 45 L 45 65 L 55 65 L 55 45 Z" fill="url(#skinTone)" />
            
            {/* Face Shape */}
            <ellipse cx="50" cy="35" rx="20" ry="22" fill="url(#skinTone)" />

            {/* Eyes */}
            <g>
              <ellipse cx="42" cy="35" rx="4" ry="6" fill="#fff" />
              <ellipse cx="42" cy="35" rx="2.5" ry="4" fill="url(#eyeColor)" />
              <circle cx="41" cy="33" r="1" fill="#fff" />
              <path d="M 37 30 Q 42 27 47 30" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
              
              <ellipse cx="58" cy="35" rx="4" ry="6" fill="#fff" />
              <ellipse cx="58" cy="35" rx="2.5" ry="4" fill="url(#eyeColor)" />
              <circle cx="57" cy="33" r="1" fill="#fff" />
              <path d="M 53 30 Q 58 27 63 30" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Blush */}
            <ellipse cx="38" cy="42" rx="3" ry="1.5" fill="#f87171" opacity="0.4" />
            <ellipse cx="62" cy="42" rx="3" ry="1.5" fill="#f87171" opacity="0.4" />

            {/* Mouth */}
            <path d="M 48 48 Q 50 51 52 48" fill="none" stroke="#991b1b" strokeWidth="1.5" strokeLinecap="round" />

            {/* Front Hair Bangs */}
            <path d="M 35 15 Q 40 25 38 32 Q 42 20 50 15 Q 58 20 62 32 Q 60 25 65 15 Q 50 5 35 15 Z" fill="url(#blondeHair)" />
            <path d="M 30 20 Q 25 35 25 45 Q 32 30 35 25 Z" fill="url(#blondeHair)" />
            <path d="M 70 20 Q 75 35 75 45 Q 68 30 65 25 Z" fill="url(#blondeHair)" />
            <path d="M 45 12 Q 50 25 53 30 Q 55 25 55 12 Z" fill="url(#blondeHair)" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative mx-auto overflow-visible ${className || 'w-32 h-48'}`}>
      {/* Ground Shadow */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 0.9, 1], opacity: [0.4, 0.3, 0.4] }}
        transition={{ delay: 0.1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-[100%] blur-md"
      />
      
      {/* Hero Body */}
      <motion.div
        initial={{ y: 50, scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="w-full h-full relative z-10"
      >
        <motion.div 
          animate={
            idleState === 'ready' ? { y: [-5, 5, -5] } : 
            idleState === 'looking' ? { y: [-1, 1, -1] } : 
            { y: [-3, 3, -3] }
          } 
          transition={{ 
            repeat: Infinity, 
            duration: idleState === 'ready' ? 2 : idleState === 'looking' ? 6 : 4, 
            ease: "easeInOut" 
          }} 
          className="w-full h-full"
        >
          <svg viewBox="-20 0 160 180" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
            <defs>
              <linearGradient id="blondeHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fee2e2" />
                <stop offset="100%" stopColor="#fecaca" />
              </linearGradient>
              <linearGradient id="eyeColor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="capeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4338ca" />
                <stop offset="100%" stopColor="#312e81" />
              </linearGradient>
              <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>

            <g transform="translate(10, 0)">
              {/* Animated Cape */}
              <motion.path 
                animate={{ d: [
                  "M 30 65 Q -10 120 10 170 Q 30 165 40 100 Z M 70 65 Q 110 120 90 170 Q 70 165 60 100 Z",
                  idleState === 'ready' 
                    ? "M 30 65 Q -15 130 5 180 Q 25 170 40 100 Z M 70 65 Q 115 130 95 180 Q 75 170 60 100 Z"
                    : "M 30 65 Q -5 125 15 175 Q 35 165 40 100 Z M 70 65 Q 105 125 85 175 Q 65 165 60 100 Z"
                ]}}
                transition={{ repeat: Infinity, duration: idleState === 'ready' ? 1.5 : 3, ease: "easeInOut" }}
                fill="url(#capeGrad)"
                opacity="0.9"
              />

              {/* Back Hair (Animated) */}
              <motion.path 
                animate={{ d: [
                  "M 30 15 Q 20 50 25 80 Q 50 85 75 80 Q 80 50 70 15 Z",
                  "M 30 15 Q 18 52 23 82 Q 50 87 77 82 Q 82 52 70 15 Z"
                ]}}
                transition={{ repeat: Infinity, duration: idleState === 'ready' ? 2 : 4, ease: "easeInOut" }}
                fill="url(#blondeHair)" 
              />
              
              {/* Legs */}
              <path d="M 40 100 L 40 140 L 46 140 L 48 100 Z" fill="url(#skinTone)" />
              <path d="M 52 100 L 54 140 L 60 140 L 60 100 Z" fill="url(#skinTone)" />
              
              {/* Boots */}
              <path d="M 38 130 L 47 130 L 48 145 L 36 145 Z" fill="#334155" />
              <path d="M 53 130 L 62 130 L 64 145 L 52 145 Z" fill="#334155" />
              
              {/* Boots Gold Accents */}
              <path d="M 38 130 L 47 130 L 47 133 L 38 133 Z" fill="#fbbf24" />
              <path d="M 53 130 L 62 130 L 62 133 L 53 133 Z" fill="#fbbf24" />

              {/* Arms */}
              <motion.g 
                animate={idleState === 'ready' ? { rotate: [-10, 10, -10], transformOrigin: "35px 65px" } : { rotate: [-2, 2, -2], transformOrigin: "35px 65px" }} 
                transition={{ repeat: Infinity, duration: idleState === 'ready' ? 2 : 4, ease: "easeInOut" }}
              >
                 <path d="M 30 65 Q 20 85 25 100 Q 30 105 32 100 L 38 65 Z" fill="url(#skinTone)" />
                 <path d="M 28 62 L 40 62 L 38 75 L 26 75 Z" fill="url(#armorGrad)" />
              </motion.g>
              <motion.g 
                animate={idleState === 'ready' ? { rotate: [10, -10, 10], transformOrigin: "65px 65px" } : { rotate: [2, -2, 2], transformOrigin: "65px 65px" }} 
                transition={{ repeat: Infinity, duration: idleState === 'ready' ? 2 : 4, ease: "easeInOut", delay: 0.5 }}
              >
                 <path d="M 70 65 Q 80 85 75 100 Q 70 105 68 100 L 62 65 Z" fill="url(#skinTone)" />
                 <path d="M 60 62 L 72 62 L 74 75 L 62 75 Z" fill="url(#armorGrad)" />
              </motion.g>

              {/* Clothes / Torso - Breathing animation */}
              <motion.g 
                animate={{ scaleY: [1, idleState === 'ready' ? 1.05 : 1.03, 1], transformOrigin: "50px 100px" }} 
                transition={{ repeat: Infinity, duration: idleState === 'ready' ? 1 : 2, ease: "easeInOut" }}
              >
                 {/* Skirt */}
                 <path d="M 35 90 Q 50 110 65 90 Z" fill="#818cf8" />
                 {/* Armor Plate */}
                 <path d="M 35 65 Q 50 72 65 65 L 60 95 L 40 95 Z" fill="url(#armorGrad)" />
                 {/* Gold Accent */}
                 <path d="M 40 65 L 50 85 L 60 65 Z" fill="#fbbf24" opacity="0.9" />
              </motion.g>

              {/* Neck */}
              <path d="M 45 45 L 45 65 L 55 65 L 55 45 Z" fill="url(#skinTone)" />
              
              {/* Head */}
              <motion.g 
                animate={
                  idleState === 'looking' 
                    ? { rotate: [-10, 15, -5, 10, -10], x: [-2, 3, -1, 2, -2], transformOrigin: "50px 45px" }
                    : { rotate: [-1, 1, -1], transformOrigin: "50px 45px" }
                } 
                transition={{ repeat: Infinity, duration: idleState === 'looking' ? 8 : 6, ease: "easeInOut" }}
              >
                {/* Face Shape */}
                <ellipse cx="50" cy="35" rx="20" ry="22" fill="url(#skinTone)" />

                {/* Eyes (Blinking) */}
                <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1], opacity: [1, 1, 0, 1, 1] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.95, 0.97, 0.99, 1] }} style={{ transformOrigin: "50% 35px" }}>
                  <ellipse cx="42" cy="35" rx="4" ry="6" fill="#fff" />
                  <ellipse cx="42" cy="35" rx="2.5" ry="4" fill="url(#eyeColor)" />
                  <circle cx="41" cy="33" r="1" fill="#fff" />
                  <path d="M 37 30 Q 42 27 47 30" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
                  
                  <ellipse cx="58" cy="35" rx="4" ry="6" fill="#fff" />
                  <ellipse cx="58" cy="35" rx="2.5" ry="4" fill="url(#eyeColor)" />
                  <circle cx="57" cy="33" r="1" fill="#fff" />
                  <path d="M 53 30 Q 58 27 63 30" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
                </motion.g>

                {/* Blush */}
                <ellipse cx="38" cy="42" rx="3" ry="1.5" fill="#f87171" opacity="0.4" />
                <ellipse cx="62" cy="42" rx="3" ry="1.5" fill="#f87171" opacity="0.4" />

                {/* Mouth */}
                <path d="M 48 48 Q 50 51 52 48" fill="none" stroke="#991b1b" strokeWidth="1.5" strokeLinecap="round" />

                {/* Front Hair Bangs */}
                <path d="M 35 15 Q 40 25 38 32 Q 42 20 50 15 Q 58 20 62 32 Q 60 25 65 15 Q 50 5 35 15 Z" fill="url(#blondeHair)" />
                <path d="M 30 20 Q 25 35 25 45 Q 32 30 35 25 Z" fill="url(#blondeHair)" />
                <path d="M 70 20 Q 75 35 75 45 Q 68 30 65 25 Z" fill="url(#blondeHair)" />
                <path d="M 45 12 Q 50 25 53 30 Q 55 25 55 12 Z" fill="url(#blondeHair)" />
              </motion.g>
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

