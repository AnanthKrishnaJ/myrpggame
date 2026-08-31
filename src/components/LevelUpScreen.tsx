import React from 'react';
import { motion } from 'motion/react';
import { Player, Skill } from '../types';
import { Sparkles, Zap, Flame, Shield, Heart } from 'lucide-react';

interface LevelUpScreenProps {
  player: Player;
  skillChoices: Skill[];
  onSelectSkill: (skill: Skill) => void;
}

const getSkillIcon = (id: string) => {
  switch (id) {
    case 'fireball': return <Flame size={24} className="text-orange-400" />;
    case 'shield_bash': return <Shield size={24} className="text-slate-400" />;
    case 'heal_light': return <Heart size={24} className="text-pink-400" />;
    case 'thunder_strike': return <Zap size={24} className="text-yellow-400" />;
    case 'vampiric_drain': return <Heart size={24} className="text-red-600" />;
    default: return <Sparkles size={24} className="text-indigo-400" />;
  }
};

export function LevelUpScreen({ player, skillChoices, onSelectSkill }: LevelUpScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 mb-2 uppercase tracking-widest">
          Level Up!
        </h2>
        <p className="text-white/80 font-medium">
          You are now Level <span className="text-yellow-400 font-bold text-xl">{player.level}</span>
        </p>
      </motion.div>

      {skillChoices.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-center text-white/50 uppercase tracking-widest text-sm font-bold mb-6 flex items-center justify-center gap-2">
            <Sparkles size={16} /> Choose a new skill <Sparkles size={16} />
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skillChoices.map((skill, idx) => (
              <motion.button
                key={skill.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectSkill(skill)}
                className="flex flex-col items-center p-4 bg-black/40 border border-indigo-500/30 rounded-xl hover:border-indigo-400 hover:bg-indigo-900/40 transition-colors text-center group relative overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 border border-white/20 group-hover:border-indigo-400 transition-colors shadow-lg shadow-black/50">
                  {getSkillIcon(skill.id)}
                </div>
                
                <h4 className="font-bold text-white mb-1 group-hover:text-indigo-200 transition-colors">{skill.name}</h4>
                <p className="text-xs text-white/60 mb-3 flex-grow">{skill.description}</p>
                
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 bg-blue-900/30 px-2 py-1 rounded">
                  <Zap size={12} /> {skill.manaCost} MP
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-white/60 mb-6">Your power grows, but there are no new skills to learn right now.</p>
          <button
            onClick={() => onSelectSkill({} as Skill)} // This is a bit of a hack if choices are 0.
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-widest transition-colors shadow-xl shadow-indigo-600/20"
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  );
}
