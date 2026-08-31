import React from 'react';
import { motion } from 'motion/react';
import { Shield, Wand2, Sword } from 'lucide-react';
import { ROLES } from '../data';
import { audio } from '../audio';

interface RoleSelectionScreenProps {
  onSelectRole: (roleId: string) => void;
}

const getRoleIcon = (roleId: string) => {
  switch (roleId) {
    case 'warrior': return <Shield size={48} className="text-emerald-400 mb-4" />;
    case 'mage': return <Wand2 size={48} className="text-indigo-400 mb-4" />;
    case 'rogue': return <Sword size={48} className="text-rose-400 mb-4" />;
    default: return <Shield size={48} className="text-white mb-4" />;
  }
};

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto text-center"
    >
      <h2 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 mb-12 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">
        Choose Your Path
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
        {Object.values(ROLES).map((role, idx) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring" }}
            onClick={() => {
              audio.playSelect();
              onSelectRole(role.id);
            }}
            className="group relative flex flex-col items-center p-8 bg-black/40 border border-white/10 rounded-2xl hover:border-indigo-400/50 hover:bg-indigo-900/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)] overflow-hidden text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col items-center text-center">
              {getRoleIcon(role.id)}
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wider uppercase">{role.name}</h3>
              <p className="text-indigo-200/70 mb-6 h-12 text-sm">{role.description}</p>
            </div>

            <div className="w-full space-y-3 border-t border-white/10 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Health</span>
                <span className="text-rose-400 font-bold">{role.maxHp}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Mana</span>
                <span className="text-blue-400 font-bold">{role.maxMana}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Attack</span>
                <span className="text-amber-400 font-bold">{role.baseAttack}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Defense</span>
                <span className="text-emerald-400 font-bold">{role.baseDefense}</span>
              </div>
            </div>
            
            <div className="mt-8 w-full py-3 bg-white/5 group-hover:bg-indigo-500/20 rounded-xl text-center text-sm font-bold uppercase tracking-widest transition-colors">
              Select
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
