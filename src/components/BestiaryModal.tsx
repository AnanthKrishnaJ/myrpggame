import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, ShieldAlert, Heart, Sword, Skull } from 'lucide-react';
import { ENEMIES } from '../data';
import { EnemyAvatar } from './EnemyAvatar';

interface BestiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BestiaryModal({ isOpen, onClose }: BestiaryModalProps) {
  const enemies = Object.values(ENEMIES);
  const [selectedEnemy, setSelectedEnemy] = useState(enemies[0]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-serif">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden bg-[#0A0D14] border border-slate-700/50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-red-950/40 to-transparent">
              <h3 className="flex items-center text-xl font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">
                <BookOpen size={24} className="mr-3 text-red-400" />
                Bestiary
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 transition-colors hover:text-white rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left Sidebar (Enemies List) */}
              <div className="w-64 border-r border-white/5 p-4 flex flex-col gap-2 shrink-0 bg-black/20 overflow-y-auto custom-scrollbar">
                {enemies.map((enemy) => {
                  const isSelected = selectedEnemy.id === enemy.id;
                  return (
                    <button
                      key={enemy.id}
                      onClick={() => setSelectedEnemy(enemy)}
                      className={`flex flex-col text-left px-4 py-3 rounded-xl transition-all ${
                        isSelected
                          ? 'bg-red-900/40 border border-red-500/50 text-white'
                          : 'bg-black/40 border border-white/5 text-slate-400 hover:text-slate-200 hover:border-red-500/30 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-sm font-bold uppercase tracking-widest">{enemy.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Area */}
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] bg-repeat flex flex-col md:flex-row gap-8 items-center justify-center">
                
                <div className="flex-1 w-full flex flex-col items-center justify-center relative">
                  {/* Decorative Background for Avatar */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/10 to-transparent blur-3xl rounded-full" />
                  <div className="relative z-10 transform scale-150 mb-10 mt-10">
                    <EnemyAvatar enemy={selectedEnemy} />
                  </div>
                </div>

                <div className="flex-1 w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                  <h2 className="text-3xl font-bold text-white mb-6 font-serif border-b border-white/10 pb-4">{selectedEnemy.name}</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                        <Heart size={12} /> Max HP
                      </span>
                      <span className="text-2xl text-emerald-400 font-bold">{selectedEnemy.maxHp}</span>
                    </div>
                    
                    <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                        <Sword size={12} /> Attack
                      </span>
                      <span className="text-2xl text-rose-400 font-bold">{selectedEnemy.attack}</span>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                        <ShieldAlert size={12} /> Defense
                      </span>
                      <span className="text-2xl text-blue-400 font-bold">{selectedEnemy.defense}</span>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                        <Skull size={12} /> Base XP
                      </span>
                      <span className="text-2xl text-amber-400 font-bold">{selectedEnemy.xpReward}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">Possible Drops</h4>
                    {selectedEnemy.drops.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedEnemy.drops.map((drop, i) => (
                          <div key={i} className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-slate-400">
                            {drop.itemId.replace('_', ' ')} ({(drop.chance * 100).toFixed(0)}%)
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm italic">No notable drops.</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
