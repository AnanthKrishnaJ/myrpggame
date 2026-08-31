import React from 'react';
import { Player } from '../types';
import { SKILLS } from '../data';
import { X, Zap, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player;
}

export function SkillsModal({ isOpen, onClose, player }: SkillsModalProps) {
  const allSkills = Object.values(SKILLS);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-serif">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden bg-[#0A0D14] border border-slate-700/50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-blue-950/40 to-transparent">
              <h3 className="flex items-center text-xl font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">
                <Zap size={24} className="mr-3 text-blue-400" />
                Spellbook & Skills
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 transition-colors hover:text-white rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Area */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-repeat">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {allSkills.map(skill => {
                   const isUnlocked = player.skills.some(s => s.id === skill.id);
                   // Mock unlock condition: Level based. Just for visual flair here.
                   const unlockLevel = skill.manaCost > 20 ? 10 : skill.manaCost > 10 ? 5 : 2;
                   const canUnlock = player.level >= unlockLevel && !isUnlocked;

                   return (
                     <div key={skill.id} className={`relative p-5 rounded-xl border transition-all ${isUnlocked ? 'bg-blue-900/20 border-blue-500/30' : 'bg-black/40 border-white/5'}`}>
                       {/* Icon / Status */}
                       <div className="flex items-start justify-between mb-4">
                         <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl border ${isUnlocked ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-black/50 border-white/10 text-slate-500'}`}>
                           {skill.type === 'heal' ? '✨' : skill.type === 'damage' ? '🔥' : '🦇'}
                         </div>
                         <div className="text-right">
                           {isUnlocked ? (
                             <span className="flex items-center text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                               <Unlock size={12} className="mr-1" /> Unlocked
                             </span>
                           ) : (
                             <span className="flex items-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                               <Lock size={12} className="mr-1" /> Lv {unlockLevel} Req
                             </span>
                           )}
                         </div>
                       </div>

                       <h4 className={`text-lg font-bold mb-2 font-serif ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>{skill.name}</h4>
                       <p className="text-xs text-slate-400 mb-4 h-12">{skill.description}</p>
                       
                       <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                         <div className="flex flex-col">
                           <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">Cost</span>
                           <span className="text-xs text-blue-400 font-bold">{skill.manaCost} MP</span>
                         </div>
                         <div className="flex flex-col text-right">
                           <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">Power</span>
                           <span className="text-xs text-rose-400 font-bold">{skill.power}</span>
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
