import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import { Enemy } from '../types';

export function EnemyAvatar({ enemy }: { enemy: Enemy }) {
  if (enemy.id === 'goblin') {
    return (
      <div className="relative w-32 h-48 mx-auto overflow-visible">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full blur-md"
        />
        <motion.div
          initial={{ y: 80, scale: 0.3, opacity: 0, rotate: -15 }}
          animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 15, delay: 0.1 }}
          className="w-full h-full relative z-10"
        >
          <svg viewBox="0 0 120 180" className="w-full h-full filter drop-shadow-[0_10px_15px_rgba(34,197,94,0.2)]">
            <defs>
              <linearGradient id="goblinSkin" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
              <linearGradient id="goblinEar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
              <linearGradient id="bandana" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
            </defs>
            <g transform="translate(10, 10)">
              {/* Back Arms / Body */}
              <path d="M 35 90 L 15 120 L 25 125 L 40 100 Z" fill="url(#goblinSkin)" /> {/* Arm */}
              <path d="M 65 90 L 85 120 L 75 125 L 60 100 Z" fill="url(#goblinSkin)" /> {/* Arm */}
              <path d="M 35 90 L 30 140 L 45 140 L 50 110 L 55 140 L 70 140 L 65 90 Z" fill="url(#goblinSkin)" />
              <path d="M 30 140 L 45 140 L 45 150 L 30 150 Z" fill="#450a0a" /> {/* Feet */}
              <path d="M 55 140 L 70 140 L 70 150 L 55 150 Z" fill="#450a0a" /> {/* Feet */}
              {/* Loincloth */}
              <path d="M 30 95 L 70 95 L 60 125 L 40 125 Z" fill="url(#bandana)" stroke="#450a0a" strokeWidth="2" />
              
              {/* Head */}
              <motion.path initial={{ rotate: 20, transformOrigin: "80px 50px" }} animate={{ rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.3 }} d="M 30 50 L -5 30 L 25 70 Z" fill="url(#goblinEar)" stroke="#14532d" strokeWidth="2.5" strokeLinejoin="round" />
              <motion.path initial={{ rotate: -20, transformOrigin: "20px 50px" }} animate={{ rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.3 }} d="M 70 50 L 105 30 L 75 70 Z" fill="url(#goblinEar)" stroke="#14532d" strokeWidth="2.5" strokeLinejoin="round" />
              <rect x="20" y="25" width="60" height="70" rx="30" fill="url(#goblinSkin)" stroke="#14532d" strokeWidth="3" />
              <path d="M 17 45 Q 50 55 83 45 L 75 25 Q 50 15 25 25 Z" fill="url(#bandana)" stroke="#450a0a" strokeWidth="2" />
              <path d="M 25 48 L 20 65 L 30 52 Z" fill="url(#bandana)" stroke="#450a0a" strokeWidth="1.5" />
              <circle cx="35" cy="35" r="3" fill="#fca5a5" opacity="0.8" />
              <circle cx="50" cy="32" r="3.5" fill="#fca5a5" opacity="0.8" />
              <circle cx="65" cy="35" r="3" fill="#fca5a5" opacity="0.8" />
              <ellipse cx="35" cy="60" rx="9" ry="12" fill="#fef08a" stroke="#854d0e" strokeWidth="1.5" />
              <ellipse cx="65" cy="60" rx="9" ry="12" fill="#fef08a" stroke="#854d0e" strokeWidth="1.5" />
              <motion.g animate={{ x: [0, 2, -2, 0], y: [0, -1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                <circle cx="35" cy="60" r="4" fill="#991b1b" />
                <circle cx="65" cy="60" r="4" fill="#991b1b" />
                <circle cx="33" cy="58" r="1.5" fill="#fef3c7" />
                <circle cx="63" cy="58" r="1.5" fill="#fef3c7" />
              </motion.g>
              <path d="M 22 53 L 43 62" stroke="#064e3b" strokeWidth="5" strokeLinecap="round" />
              <path d="M 78 53 L 57 62" stroke="#064e3b" strokeWidth="5" strokeLinecap="round" />
              <path d="M 45 72 Q 50 80 55 72 Z" fill="#14532d" />
              <path d="M 47 73 Q 50 78 53 73 Z" fill="#22c55e" />
              <path d="M 33 83 Q 50 95 67 83" fill="none" stroke="#064e3b" strokeWidth="3" strokeLinecap="round" />
              <path d="M 40 86 L 43 94 L 46 88" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" strokeLinejoin="round" />
              <path d="M 60 86 L 57 94 L 54 88" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'slime') {
    return (
      <div className="relative w-32 h-48 mx-auto">
        <motion.div 
          animate={{ scaleX: [1, 1.1, 0.9, 1], scaleY: [1, 0.9, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-full h-full relative z-10"
        >
          <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_8px_10px_rgba(6,182,212,0.4)]">
             <defs>
               <radialGradient id="slimeBody" cx="30%" cy="30%" r="70%">
                 <stop offset="0%" stopColor="#67e8f9" />
                 <stop offset="70%" stopColor="#06b6d4" />
                 <stop offset="100%" stopColor="#164e63" />
               </radialGradient>
             </defs>
             {/* Main Blob */}
             <path d="M 50 60 C 90 60 100 110 95 140 C 90 150 10 150 5 140 C 0 110 10 60 50 60 Z" fill="url(#slimeBody)" stroke="#0891b2" strokeWidth="2" />
             {/* Face */}
             <ellipse cx="40" cy="100" rx="5" ry="8" fill="#164e63" />
             <ellipse cx="60" cy="100" rx="5" ry="8" fill="#164e63" />
             <circle cx="38" cy="98" r="2" fill="#cffafe" />
             <circle cx="58" cy="98" r="2" fill="#cffafe" />
             <path d="M 45 115 Q 50 125 55 115" fill="none" stroke="#164e63" strokeWidth="3" strokeLinecap="round" />
             {/* Highlights */}
             <path d="M 25 80 Q 40 90 50 85" fill="none" stroke="#cffafe" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'skeleton') {
    return (
      <div className="relative w-28 h-48 mx-auto">
        <motion.div
           animate={{ y: [-2, 2, -2] }}
           transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
           className="w-full h-full relative z-10"
        >
          <svg viewBox="0 0 100 180" className="w-full h-full drop-shadow-[0_8px_10px_rgba(255,255,255,0.1)]">
             <defs>
               <linearGradient id="bone" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#f1f5f9" />
                 <stop offset="100%" stopColor="#94a3b8" />
               </linearGradient>
             </defs>
             
             {/* Arms */}
             <line x1="25" y1="70" x2="15" y2="100" stroke="url(#bone)" strokeWidth="6" strokeLinecap="round" />
             <line x1="15" y1="100" x2="20" y2="130" stroke="url(#bone)" strokeWidth="5" strokeLinecap="round" />
             <line x1="75" y1="70" x2="85" y2="100" stroke="url(#bone)" strokeWidth="6" strokeLinecap="round" />
             <line x1="85" y1="100" x2="80" y2="130" stroke="url(#bone)" strokeWidth="5" strokeLinecap="round" />
             
             {/* Legs */}
             <line x1="40" y1="110" x2="35" y2="140" stroke="url(#bone)" strokeWidth="7" strokeLinecap="round" />
             <line x1="35" y1="140" x2="35" y2="170" stroke="url(#bone)" strokeWidth="6" strokeLinecap="round" />
             <line x1="60" y1="110" x2="65" y2="140" stroke="url(#bone)" strokeWidth="7" strokeLinecap="round" />
             <line x1="65" y1="140" x2="65" y2="170" stroke="url(#bone)" strokeWidth="6" strokeLinecap="round" />
             
             {/* Pelvis & Spine */}
             <path d="M 35 100 L 65 100 L 55 115 L 45 115 Z" fill="url(#bone)" stroke="#334155" strokeWidth="2" />
             <line x1="50" y1="90" x2="50" y2="105" stroke="#334155" strokeWidth="4" />

             {/* Ribcage */}
             <rect x="35" y="70" width="30" height="20" rx="5" fill="url(#bone)" stroke="#334155" strokeWidth="2" />
             <line x1="40" y1="75" x2="40" y2="85" stroke="#0f172a" strokeWidth="2" />
             <line x1="50" y1="75" x2="50" y2="85" stroke="#0f172a" strokeWidth="2" />
             <line x1="60" y1="75" x2="60" y2="85" stroke="#0f172a" strokeWidth="2" />
             
             {/* Skull */}
             <rect x="25" y="20" width="50" height="50" rx="20" fill="url(#bone)" stroke="#334155" strokeWidth="2" />
             <circle cx="38" cy="45" r="8" fill="#0f172a" />
             <circle cx="62" cy="45" r="8" fill="#0f172a" />
             <circle cx="38" cy="45" r="2" fill="#ef4444" className="animate-pulse" />
             <circle cx="62" cy="45" r="2" fill="#ef4444" className="animate-pulse" />
             <path d="M 50 55 L 45 65 L 55 65 Z" fill="#0f172a" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'wolf') {
    return (
      <div className="relative w-40 h-48 mx-auto">
        <motion.div animate={{ y: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-[0_8px_10px_rgba(100,116,139,0.4)]">
            {/* Body */}
            <path d="M 40 80 Q 50 120 35 140 L 45 140 Q 55 120 50 80 Z" fill="#334155" />
            <path d="M 80 80 Q 70 120 85 140 L 75 140 Q 65 120 70 80 Z" fill="#334155" />
            <path d="M 30 80 C 30 130 90 130 90 80 C 90 60 30 60 30 80 Z" fill="#475569" stroke="#1e293b" strokeWidth="2" />
            <path d="M 45 90 C 45 110 75 110 75 90 Z" fill="#94a3b8" />
            
            {/* Tail */}
            <path d="M 85 100 Q 110 110 115 80 Q 95 90 85 100 Z" fill="#475569" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />

            {/* Head */}
            <g transform="translate(10, 10)">
              <path d="M 30 40 L 50 45 L 60 30 L 70 45 L 90 40 L 75 60 L 80 80 L 60 70 L 40 80 L 45 60 Z" fill="#475569" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
              <path d="M 45 45 L 55 50 L 60 40 L 65 50 L 75 45 L 65 60 L 60 55 L 55 60 Z" fill="#94a3b8" />
              <circle cx="52" cy="55" r="3" fill="#ef4444" />
              <circle cx="68" cy="55" r="3" fill="#ef4444" />
              <path d="M 58 65 L 62 65 L 60 70 Z" fill="#0f172a" />
              <path d="M 45 35 L 30 20 L 50 45 Z" fill="#475569" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
              <path d="M 75 35 L 90 20 L 70 45 Z" fill="#475569" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'orc') {
    return (
      <div className="relative w-36 h-48 mx-auto">
        <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_10px_15px_rgba(20,83,45,0.4)]">
            {/* Body */}
            <path d="M 25 75 L 20 120 L 40 120 L 50 90 L 60 120 L 80 120 L 75 75 Z" fill="#15803d" stroke="#064e3b" strokeWidth="3" />
            {/* Legs */}
            <path d="M 20 120 L 25 145 L 45 145 L 40 120 Z" fill="#166534" />
            <path d="M 80 120 L 75 145 L 55 145 L 60 120 Z" fill="#166534" />
            {/* Feet */}
            <path d="M 25 145 L 15 145 L 15 150 L 30 150 Z" fill="#450a0a" />
            <path d="M 75 145 L 85 145 L 85 150 L 70 150 Z" fill="#450a0a" />
            {/* Loincloth */}
            <path d="M 25 75 L 75 75 L 60 110 L 40 110 Z" fill="#450a0a" />
            {/* Arms */}
            <path d="M 15 70 L 5 110 L 15 115 L 25 80 Z" fill="#15803d" stroke="#064e3b" strokeWidth="2" />
            <path d="M 85 70 L 95 110 L 85 115 L 75 80 Z" fill="#15803d" stroke="#064e3b" strokeWidth="2" />
            
            {/* Head / Chest */}
            <path d="M 25 35 Q 50 10 75 35 L 85 75 Q 50 95 15 75 Z" fill="#15803d" stroke="#064e3b" strokeWidth="3" />
            <path d="M 20 50 Q 50 60 80 50 L 70 75 Q 50 85 30 75 Z" fill="#166534" />
            
            {/* Face */}
            <circle cx="35" cy="45" r="4" fill="#facc15" />
            <circle cx="65" cy="45" r="4" fill="#facc15" />
            <path d="M 25 35 L 45 40" stroke="#064e3b" strokeWidth="4" strokeLinecap="round" />
            <path d="M 75 35 L 55 40" stroke="#064e3b" strokeWidth="4" strokeLinecap="round" />
            <path d="M 40 65 Q 50 70 60 65" fill="none" stroke="#064e3b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 35 75 L 40 65 L 45 75 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <path d="M 65 75 L 60 65 L 55 75 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            {/* Ears */}
            <path d="M 15 45 L 5 35 L 25 40 Z" fill="#15803d" stroke="#064e3b" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 85 45 L 95 35 L 75 40 Z" fill="#15803d" stroke="#064e3b" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'dragon') {
    return (
      <div className="relative w-48 h-48 mx-auto -mt-6">
        <motion.div animate={{ y: [-4, 4, -4], rotate: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 150 180" className="w-full h-full drop-shadow-[0_15px_25px_rgba(153,27,27,0.5)]">
            {/* Wings */}
            <path d="M 50 60 Q 10 20 5 60 Q 30 70 45 80 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
            <path d="M 100 60 Q 140 20 145 60 Q 120 70 105 80 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
            
            {/* Body */}
            <path d="M 50 80 Q 75 140 60 160 L 90 160 Q 75 140 100 80 Z" fill="#991b1b" stroke="#450a0a" strokeWidth="3" strokeLinejoin="round" />
            {/* Belly */}
            <path d="M 60 85 Q 75 130 68 155 L 82 155 Q 75 130 90 85 Z" fill="#f87171" />
            
            {/* Legs & Claws */}
            <path d="M 55 150 L 45 165 L 65 165 Z" fill="#7f1d1d" />
            <path d="M 95 150 L 85 165 L 105 165 Z" fill="#7f1d1d" />
            
            {/* Tail */}
            <path d="M 85 140 Q 130 150 140 120 Q 120 130 90 130 Z" fill="#991b1b" stroke="#450a0a" strokeWidth="2" />

            {/* Head */}
            <g transform="translate(15, 10)">
              <path d="M 60 10 L 80 40 L 110 30 L 90 60 L 115 80 L 85 90 L 60 115 L 35 90 L 5 80 L 30 60 L 10 30 L 40 40 Z" fill="#991b1b" stroke="#450a0a" strokeWidth="3" strokeLinejoin="round" />
              <path d="M 60 20 L 75 45 L 95 40 L 80 65 L 100 80 L 75 85 L 60 105 L 45 85 L 20 80 L 40 65 L 25 40 L 45 45 Z" fill="#dc2626" />
              <path d="M 60 35 L 70 50 L 85 50 L 75 65 L 85 75 L 65 75 L 60 90 L 55 75 L 35 75 L 45 65 L 35 50 L 50 50 Z" fill="#f87171" />
              <circle cx="45" cy="55" r="4" fill="#fef08a" />
              <circle cx="75" cy="55" r="4" fill="#fef08a" />
              <circle cx="45" cy="55" r="1.5" fill="#000" />
              <circle cx="75" cy="55" r="1.5" fill="#000" />
              <path d="M 35 45 Q 45 50 55 45" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
              <path d="M 85 45 Q 75 50 65 45" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
              <path d="M 50 75 Q 60 85 70 75" fill="none" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
              <path d="M 55 80 L 60 75 L 65 80" fill="none" stroke="#fef08a" strokeWidth="2" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'spider') {
    return (
      <div className="relative w-32 h-40 mx-auto">
        <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_8px_10px_rgba(220,38,38,0.4)]">
             <path d="M 50 40 C 70 40 80 60 80 80 C 80 100 60 110 50 110 C 40 110 20 100 20 80 C 20 60 30 40 50 40 Z" fill="#1e293b" />
             <path d="M 30 50 Q 10 30 5 50" fill="none" stroke="#1e293b" strokeWidth="4" />
             <path d="M 30 60 Q 5 50 5 70" fill="none" stroke="#1e293b" strokeWidth="4" />
             <path d="M 30 70 Q 5 70 5 90" fill="none" stroke="#1e293b" strokeWidth="4" />
             <path d="M 35 80 Q 10 90 15 110" fill="none" stroke="#1e293b" strokeWidth="4" />
             
             <path d="M 70 50 Q 90 30 95 50" fill="none" stroke="#1e293b" strokeWidth="4" />
             <path d="M 70 60 Q 95 50 95 70" fill="none" stroke="#1e293b" strokeWidth="4" />
             <path d="M 70 70 Q 95 70 95 90" fill="none" stroke="#1e293b" strokeWidth="4" />
             <path d="M 65 80 Q 90 90 85 110" fill="none" stroke="#1e293b" strokeWidth="4" />
             
             <circle cx="40" cy="70" r="4" fill="#ef4444" />
             <circle cx="60" cy="70" r="4" fill="#ef4444" />
             <circle cx="30" cy="65" r="2" fill="#ef4444" />
             <circle cx="70" cy="65" r="2" fill="#ef4444" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'bandit') {
    return (
      <div className="relative w-32 h-48 mx-auto">
        <motion.div animate={{ y: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)]">
            <path d="M 30 80 L 25 140 L 45 140 L 50 100 L 55 140 L 75 140 L 70 80 Z" fill="#334155" />
            <path d="M 25 80 L 75 80 L 65 110 L 35 110 Z" fill="#475569" />
            <circle cx="50" cy="50" r="25" fill="#fcd34d" />
            <path d="M 25 45 Q 50 65 75 45 L 75 75 Q 50 85 25 75 Z" fill="#1e293b" />
            <circle cx="40" cy="45" r="3" fill="#1e293b" />
            <circle cx="60" cy="45" r="3" fill="#1e293b" />
            <path d="M 35 40 Q 45 45 55 40" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'ghost') {
    return (
      <div className="relative w-32 h-48 mx-auto">
        <motion.div animate={{ y: [-5, 5, -5], opacity: [0.7, 0.9, 0.7] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_8px_15px_rgba(255,255,255,0.4)]">
            <path d="M 20 70 C 20 20 80 20 80 70 C 80 120 90 140 70 130 C 60 125 55 140 50 130 C 45 140 40 125 30 130 C 10 140 20 120 20 70 Z" fill="#f1f5f9" opacity="0.8" />
            <ellipse cx="35" cy="60" rx="5" ry="8" fill="#1e293b" />
            <ellipse cx="65" cy="60" rx="5" ry="8" fill="#1e293b" />
            <ellipse cx="50" cy="80" rx="8" ry="12" fill="#1e293b" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'golem') {
    return (
      <div className="relative w-40 h-48 mx-auto">
        <motion.div animate={{ y: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-[0_8px_10px_rgba(100,116,139,0.5)]">
            <rect x="30" y="60" width="60" height="70" rx="5" fill="#64748b" stroke="#475569" strokeWidth="4" />
            <rect x="20" y="50" width="80" height="30" rx="5" fill="#475569" />
            <rect x="40" y="20" width="40" height="35" rx="5" fill="#64748b" stroke="#475569" strokeWidth="3" />
            <circle cx="50" cy="35" r="4" fill="#3b82f6" className="animate-pulse" />
            <circle cx="70" cy="35" r="4" fill="#3b82f6" className="animate-pulse" />
            <path d="M 45 45 L 75 45" stroke="#1e293b" strokeWidth="3" />
            <rect x="10" y="60" width="20" height="60" rx="5" fill="#64748b" />
            <rect x="90" y="60" width="20" height="60" rx="5" fill="#64748b" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'vampire') {
    return (
      <div className="relative w-32 h-48 mx-auto">
        <motion.div animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_8px_10px_rgba(153,27,27,0.5)]">
            <path d="M 20 60 Q 50 100 80 60 L 90 140 L 10 140 Z" fill="#1e293b" />
            <path d="M 40 60 L 60 60 L 50 120 Z" fill="#991b1b" />
            <path d="M 20 60 Q 50 20 80 60 Q 50 90 20 60 Z" fill="#991b1b" />
            <circle cx="50" cy="40" r="20" fill="#f1f5f9" />
            <circle cx="42" cy="35" r="3" fill="#991b1b" />
            <circle cx="58" cy="35" r="3" fill="#991b1b" />
            <path d="M 45 45 Q 50 50 55 45" fill="none" stroke="#1e293b" strokeWidth="2" />
            <path d="M 48 48 L 48 53 L 50 48 Z" fill="#f1f5f9" stroke="#1e293b" strokeWidth="0.5" />
            <path d="M 52 48 L 52 53 L 50 48 Z" fill="#f1f5f9" stroke="#1e293b" strokeWidth="0.5" />
            <path d="M 35 25 Q 50 15 65 25 Q 50 0 35 25 Z" fill="#1e293b" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'troll') {
    return (
      <div className="relative w-40 h-48 mx-auto">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-[0_8px_10px_rgba(20,83,45,0.4)]">
             <path d="M 30 70 C 30 20 90 20 90 70 C 90 130 80 140 60 140 C 40 140 30 130 30 70 Z" fill="#14532d" />
             <ellipse cx="45" cy="50" rx="5" ry="5" fill="#facc15" />
             <ellipse cx="75" cy="50" rx="5" ry="5" fill="#facc15" />
             <path d="M 40 40 Q 60 45 80 40" stroke="#064e3b" strokeWidth="4" fill="none" />
             <path d="M 50 70 Q 60 80 70 70" stroke="#064e3b" strokeWidth="4" fill="none" />
             <path d="M 25 60 Q 10 50 5 70 Q 10 80 25 70 Z" fill="#166534" />
             <path d="M 95 60 Q 110 50 115 70 Q 110 80 95 70 Z" fill="#166534" />
             <path d="M 55 60 L 65 60 L 60 75 Z" fill="#064e3b" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'wyvern') {
    return (
      <div className="relative w-48 h-48 mx-auto -mt-4">
        <motion.div animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-[0_10px_15px_rgba(16,185,129,0.4)]">
            <path d="M 30 50 Q 10 20 5 60 Q 40 70 50 80 Z" fill="#047857" />
            <path d="M 120 50 Q 140 20 145 60 Q 110 70 100 80 Z" fill="#047857" />
            <path d="M 60 130 Q 75 80 90 130 Q 75 160 60 130 Z" fill="#065f46" />
            <path d="M 65 40 L 75 70 L 85 40 Q 75 10 65 40 Z" fill="#047857" />
            <circle cx="70" cy="50" r="3" fill="#fcd34d" />
            <circle cx="80" cy="50" r="3" fill="#fcd34d" />
            <path d="M 60 30 Q 75 0 90 30 Z" fill="#10b981" />
            <path d="M 70 120 Q 90 150 110 110" fill="none" stroke="#047857" strokeWidth="4" />
            <path d="M 105 105 L 115 110 L 105 115 Z" fill="#047857" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'lich') {
    return (
      <div className="relative w-32 h-48 mx-auto">
        <motion.div animate={{ y: [-2, 2, -2], filter: ["hue-rotate(0deg)", "hue-rotate(30deg)", "hue-rotate(0deg)"] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_8px_15px_rgba(147,51,234,0.5)]">
            <path d="M 20 50 Q 50 10 80 50 L 90 140 L 10 140 Z" fill="#1e1b4b" />
            <path d="M 30 50 Q 50 30 70 50 L 75 130 L 25 130 Z" fill="#312e81" />
            <rect x="35" y="30" width="30" height="40" rx="15" fill="#f1f5f9" />
            <circle cx="42" cy="45" r="4" fill="#a855f7" className="animate-pulse" />
            <circle cx="58" cy="45" r="4" fill="#a855f7" className="animate-pulse" />
            <path d="M 45 55 L 55 55" stroke="#1e293b" strokeWidth="2" />
            <path d="M 30 20 Q 50 -10 70 20 L 75 50 Q 50 30 25 50 Z" fill="#1e1b4b" />
            <circle cx="50" cy="15" r="5" fill="#facc15" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'demon') {
    return (
      <div className="relative w-48 h-48 mx-auto -mt-6">
        <motion.div animate={{ scale: [1, 1.05, 1], y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-[0_15px_25px_rgba(153,27,27,0.6)]">
            <path d="M 50 50 L 20 20 L 40 70 Z" fill="#7f1d1d" />
            <path d="M 100 50 L 130 20 L 110 70 Z" fill="#7f1d1d" />
            <path d="M 40 50 C 40 10 110 10 110 50 C 110 130 80 140 75 140 C 70 140 40 130 40 50 Z" fill="#991b1b" />
            <path d="M 60 50 Q 75 70 90 50" fill="none" stroke="#fca5a5" strokeWidth="3" />
            <path d="M 50 40 L 65 45 L 60 30 Z" fill="#1e293b" />
            <path d="M 100 40 L 85 45 L 90 30 Z" fill="#1e293b" />
            <circle cx="60" cy="65" r="4" fill="#facc15" />
            <circle cx="90" cy="65" r="4" fill="#facc15" />
            <path d="M 65 90 Q 75 100 85 90" fill="none" stroke="#450a0a" strokeWidth="4" />
            <path d="M 50 90 L 55 110 L 65 95 Z" fill="#f1f5f9" />
            <path d="M 100 90 L 95 110 L 85 95 Z" fill="#f1f5f9" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'mimic') {
    return (
      <div className="relative w-32 h-40 mx-auto">
        <motion.div animate={{ rotate: [-2, 2, -2], y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_8px_15px_rgba(180,83,9,0.5)]">
            <path d="M 20 60 L 100 60 L 100 100 L 20 100 Z" fill="#78350f" stroke="#451a03" strokeWidth="4" />
            <path d="M 20 60 L 100 60 L 100 70 L 20 70 Z" fill="#b45309" />
            <path d="M 20 90 L 100 90 L 100 100 L 20 100 Z" fill="#b45309" />
            <path d="M 25 60 L 30 75 L 35 60 L 40 75 L 45 60 L 50 75 L 55 60 L 60 75 L 65 60 L 70 75 L 75 60 L 80 75 L 85 60 L 90 75 L 95 60 Z" fill="#f1f5f9" />
            <path d="M 10 50 Q 60 10 110 50 L 100 60 L 20 60 Z" fill="#78350f" stroke="#451a03" strokeWidth="4" />
            <path d="M 25 60 L 30 45 L 35 60 L 40 45 L 45 60 L 50 45 L 55 60 L 60 45 L 65 60 L 70 45 L 75 60 L 80 45 L 85 60 L 90 45 L 95 60 Z" fill="#f1f5f9" />
            <circle cx="45" cy="45" r="4" fill="#ef4444" className="animate-pulse" />
            <circle cx="75" cy="45" r="4" fill="#ef4444" className="animate-pulse" />
            <path d="M 50 60 Q 60 90 70 60" fill="#991b1b" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'cerberus') {
    return (
      <div className="relative w-48 h-48 mx-auto -mt-6">
        <motion.div animate={{ scale: [1, 1.05, 1], y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-[0_15px_25px_rgba(220,38,38,0.6)]">
            <path d="M 30 70 Q 75 140 120 70 Z" fill="#450a0a" />
            {/* Left Head */}
            <g transform="translate(-15, -10) rotate(-15 50 50)">
               <circle cx="50" cy="50" r="18" fill="#7f1d1d" />
               <circle cx="43" cy="45" r="3" fill="#ef4444" />
               <circle cx="57" cy="45" r="3" fill="#ef4444" />
               <path d="M 45 55 Q 50 65 55 55" fill="#facc15" stroke="#450a0a" />
               <path d="M 40 30 L 45 40 L 50 30 Z" fill="#1e293b" />
               <path d="M 50 30 L 55 40 L 60 30 Z" fill="#1e293b" />
            </g>
            {/* Center Head */}
            <g transform="translate(0, -20)">
               <circle cx="75" cy="50" r="22" fill="#7f1d1d" />
               <circle cx="65" cy="45" r="4" fill="#ef4444" />
               <circle cx="85" cy="45" r="4" fill="#ef4444" />
               <path d="M 65 60 Q 75 75 85 60" fill="#facc15" stroke="#450a0a" />
               <path d="M 60 25 L 67 35 L 75 25 Z" fill="#1e293b" />
               <path d="M 75 25 L 83 35 L 90 25 Z" fill="#1e293b" />
            </g>
            {/* Right Head */}
            <g transform="translate(15, -10) rotate(15 100 50)">
               <circle cx="100" cy="50" r="18" fill="#7f1d1d" />
               <circle cx="93" cy="45" r="3" fill="#ef4444" />
               <circle cx="107" cy="45" r="3" fill="#ef4444" />
               <path d="M 95 55 Q 100 65 105 55" fill="#facc15" stroke="#450a0a" />
               <path d="M 90 30 L 95 40 L 100 30 Z" fill="#1e293b" />
               <path d="M 100 30 L 105 40 L 110 30 Z" fill="#1e293b" />
            </g>
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'kraken') {
    return (
      <div className="relative w-48 h-48 mx-auto -mt-6">
        <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-[0_15px_25px_rgba(14,165,233,0.5)]">
            <path d="M 50 80 C 20 50 130 50 100 80 Z" fill="#0284c7" />
            <circle cx="75" cy="70" r="25" fill="#0369a1" />
            <circle cx="65" cy="65" r="6" fill="#fde047" />
            <circle cx="85" cy="65" r="6" fill="#fde047" />
            <circle cx="65" cy="65" r="2" fill="#000" />
            <circle cx="85" cy="65" r="2" fill="#000" />
            <path d="M 40 80 Q 20 120 10 140 Q 30 130 50 90 Z" fill="#0284c7" />
            <path d="M 60 85 Q 50 140 40 150 Q 60 140 70 95 Z" fill="#0284c7" />
            <path d="M 80 95 Q 90 140 110 150 Q 100 140 90 85 Z" fill="#0284c7" />
            <path d="M 100 90 Q 120 130 140 140 Q 130 120 110 80 Z" fill="#0284c7" />
            {/* Suction cups */}
            <circle cx="35" cy="110" r="3" fill="#38bdf8" />
            <circle cx="25" cy="125" r="3" fill="#38bdf8" />
            <circle cx="55" cy="120" r="3" fill="#38bdf8" />
            <circle cx="95" cy="120" r="3" fill="#38bdf8" />
            <circle cx="115" cy="110" r="3" fill="#38bdf8" />
            <circle cx="125" cy="125" r="3" fill="#38bdf8" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'siren') {
    return (
      <div className="relative w-32 h-40 mx-auto">
        <motion.div animate={{ y: [-3, 3, -3], filter: ["hue-rotate(0deg)", "hue-rotate(30deg)", "hue-rotate(0deg)"] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_10px_20px_rgba(45,212,191,0.5)]">
            <path d="M 30 50 Q 50 100 70 50 L 80 140 L 20 140 Z" fill="#0f766e" />
            <path d="M 20 120 Q 50 160 80 120 Z" fill="#14b8a6" />
            <circle cx="50" cy="40" r="18" fill="#ccfbf1" />
            <path d="M 35 25 Q 50 10 65 25 Q 75 50 85 80 Q 50 60 15 80 Q 25 50 35 25 Z" fill="#042f2e" opacity="0.8" />
            <circle cx="43" cy="38" r="3" fill="#14b8a6" className="animate-pulse" />
            <circle cx="57" cy="38" r="3" fill="#14b8a6" className="animate-pulse" />
            <path d="M 45 48 Q 50 52 55 48" fill="none" stroke="#115e59" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'cyclops') {
    return (
      <div className="relative w-40 h-48 mx-auto">
        <motion.div animate={{ y: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-[0_10px_20px_rgba(180,83,9,0.5)]">
            <path d="M 25 60 C 25 20 95 20 95 60 C 95 130 85 140 60 140 C 35 140 25 130 25 60 Z" fill="#d97706" />
            <rect x="40" y="80" width="40" height="60" rx="5" fill="#78350f" />
            <circle cx="60" cy="45" r="12" fill="#fef3c7" />
            <circle cx="60" cy="45" r="4" fill="#000" />
            <path d="M 45 30 Q 60 20 75 30" stroke="#78350f" strokeWidth="4" fill="none" />
            <path d="M 45 65 Q 60 75 75 65" stroke="#78350f" strokeWidth="3" fill="none" />
            <path d="M 15 50 Q 5 70 10 90 L 30 75 Z" fill="#b45309" />
            <path d="M 105 50 Q 115 70 110 90 L 90 75 Z" fill="#b45309" />
            {/* Club */}
            <path d="M 95 90 L 115 40 L 125 45 L 105 95 Z" fill="#78350f" />
            <circle cx="120" cy="42" r="8" fill="#451a03" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'minotaur') {
    return (
      <div className="relative w-40 h-48 mx-auto">
        <motion.div animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-[0_10px_20px_rgba(87,83,78,0.5)]">
             <path d="M 30 70 Q 60 150 90 70 Z" fill="#57534e" />
             <rect x="40" y="100" width="40" height="50" rx="5" fill="#292524" />
             <path d="M 20 60 Q 60 10 100 60 L 90 90 L 30 90 Z" fill="#78716c" />
             <circle cx="45" cy="55" r="4" fill="#ef4444" />
             <circle cx="75" cy="55" r="4" fill="#ef4444" />
             <path d="M 50 75 Q 60 90 70 75" fill="none" stroke="#292524" strokeWidth="4" />
             <path d="M 35 30 Q 10 0 5 35 Q 20 40 30 35 Z" fill="#d6d3d1" />
             <path d="M 85 30 Q 110 0 115 35 Q 100 40 90 35 Z" fill="#d6d3d1" />
             {/* Axe */}
             <path d="M 100 120 L 120 20 L 125 22 L 105 122 Z" fill="#78350f" />
             <path d="M 115 40 C 130 20 145 20 145 60 C 120 70 110 50 115 40 Z" fill="#94a3b8" />
             <path d="M 125 40 C 110 20 95 20 95 60 C 120 70 130 50 125 40 Z" fill="#94a3b8" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (enemy.id === 'yay') {
    return (
      <div className="relative w-56 h-56 mx-auto -mt-8">
        <motion.div animate={{ y: [-5, 5, -5], filter: ["hue-rotate(0deg)", "hue-rotate(60deg)", "hue-rotate(0deg)"] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="w-full h-full relative z-10">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(147,51,234,0.8)]">
            <defs>
               <radialGradient id="yayAura" cx="50%" cy="50%" r="50%">
                 <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                 <stop offset="50%" stopColor="#7e22ce" stopOpacity="0.5" />
                 <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
               </radialGradient>
               <linearGradient id="yayBody" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#1e1b4b" />
                 <stop offset="100%" stopColor="#000000" />
               </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="90" fill="url(#yayAura)" className="animate-pulse" />
            <path d="M 100 20 C 150 40 180 100 150 160 C 130 190 70 190 50 160 C 20 100 50 40 100 20 Z" fill="url(#yayBody)" />
            {/* Multiple Eyes */}
            <circle cx="100" cy="70" r="15" fill="#000" />
            <circle cx="100" cy="70" r="6" fill="#ef4444" className="animate-ping" />
            <circle cx="100" cy="70" r="4" fill="#fca5a5" />

            <circle cx="65" cy="90" r="8" fill="#000" />
            <circle cx="65" cy="90" r="3" fill="#ef4444" />
            
            <circle cx="135" cy="90" r="8" fill="#000" />
            <circle cx="135" cy="90" r="3" fill="#ef4444" />

            <circle cx="80" cy="50" r="6" fill="#000" />
            <circle cx="80" cy="50" r="2" fill="#ef4444" />

            <circle cx="120" cy="50" r="6" fill="#000" />
            <circle cx="120" cy="50" r="2" fill="#ef4444" />
            
            {/* Spikes/Horns */}
            <path d="M 60 40 L 40 10 L 70 30 Z" fill="#312e81" />
            <path d="M 140 40 L 160 10 L 130 30 Z" fill="#312e81" />
            <path d="M 40 80 L 10 70 L 30 100 Z" fill="#312e81" />
            <path d="M 160 80 L 190 70 L 170 100 Z" fill="#312e81" />
            
            {/* Maw */}
            <path d="M 70 130 Q 100 160 130 130 Q 100 140 70 130 Z" fill="#000" />
            <path d="M 80 133 L 85 140 L 90 135 L 95 145 L 100 137 L 105 145 L 110 135 L 115 140 L 120 133" fill="none" stroke="#f1f5f9" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // Default Fallback
  if (enemy.avatarUrl) {
    return (
      <div className="relative w-32 h-32 mx-auto">
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-full h-full relative z-10 rounded-full border-4 border-rose-500 overflow-hidden shadow-[0_0_20px_rgba(244,63,94,0.3)] bg-slate-900"
        >
          <img src={enemy.avatarUrl} alt={enemy.name} className="w-full h-full object-cover p-2" referrerPolicy="no-referrer" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-24 h-24 mx-auto bg-black/20 rounded-full border-4 border-rose-500 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.3)]">
      <ShieldAlert size={40} className="text-rose-400" />
    </div>
  );
}
