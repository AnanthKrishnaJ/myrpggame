import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StatusEffect } from '../types';
import * as LucideIcons from 'lucide-react';

interface StatusEffectsDisplayProps {
  effects: StatusEffect[];
}

export function StatusEffectsDisplay({ effects }: StatusEffectsDisplayProps) {
  if (!effects || effects.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap items-center mt-2 absolute top-0 right-0 -translate-y-full pb-2">
      <AnimatePresence>
        {effects.map((effect) => {
          // Dynamically grab the Lucide icon by name or fallback to Sparkles/Skull
          const IconComponent = (LucideIcons as any)[effect.icon] || (effect.type === 'buff' ? LucideIcons.Sparkles : LucideIcons.Skull);

          return (
            <motion.div
              key={effect.id}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              className="relative group"
            >
              {/* Icon Container */}
              <div 
                className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center relative overflow-hidden backdrop-blur-sm ${
                  effect.type === 'buff' 
                    ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                    : 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                }`}
              >
                {/* Subtle pulse animation for buffs/debuffs */}
                <div className={`absolute inset-0 opacity-30 animate-pulse ${effect.type === 'buff' ? 'bg-indigo-400' : 'bg-rose-400'}`} />
                <IconComponent size={16} className="relative z-10" />
                
                {/* Duration Badge */}
                <span 
                  className={`absolute -bottom-1 -right-1 text-[9px] font-black px-1 rounded shadow-sm border z-20 ${
                    effect.type === 'buff'
                      ? 'bg-indigo-900 border-indigo-400 text-indigo-100'
                      : 'bg-rose-900 border-rose-400 text-rose-100'
                  }`}
                >
                  {effect.duration}
                </span>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                <div className="bg-black/90 backdrop-blur-md border border-white/20 p-2 rounded-lg text-center shadow-xl relative">
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${effect.type === 'buff' ? 'text-indigo-400' : 'text-rose-400'}`}>
                    {effect.name}
                  </h4>
                  <p className="text-[10px] text-white/80 leading-snug">
                    {effect.description}
                  </p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-white/20" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
