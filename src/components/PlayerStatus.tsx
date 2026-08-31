import React from 'react';
import { Player } from '../types';
import { Shield, Sword, Heart, Coins, FlaskConical, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroAvatar } from './HeroAvatar';

interface PlayerStatusProps {
  player: Player;
}

export function PlayerStatus({ player }: PlayerStatusProps) {
  const xpPercentage = (player.xp / (player.level * 100)) * 100;
  const hpPercentage = Math.max(0, (player.hp / player.maxHp) * 100);
  const mpPercentage = Math.max(0, (player.mana / player.maxMana) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 md:p-6 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-black/20 border-2 border-indigo-400/50 flex items-center justify-center overflow-hidden">
             <div className="scale-125 translate-y-1">
               <HeroAvatar player={player} faceOnly={true} />
             </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-300">{player.name}</div>
            <div className="text-sm font-semibold flex items-center gap-1">
              <TrendingUp size={14} /> Lv. {player.level}
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
            <Coins size={18} className="text-yellow-400 mr-2" />
            <span className="font-semibold text-yellow-400">{player.gold}</span>
          </div>
          <div className="flex items-center bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
            <FlaskConical size={18} className="text-emerald-400 mr-2" />
            <span className="font-semibold text-emerald-400">{player.potions}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* HP Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1.5 text-white/70">
            <span className="flex items-center text-emerald-400">
              <Heart size={14} className="mr-1.5" /> HP
            </span>
            <span className="text-emerald-200">{Math.ceil(player.hp)} / {player.maxHp}</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-400"
              initial={{ width: `${hpPercentage}%` }}
              animate={{ width: `${hpPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* MP Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1.5 text-white/70">
            <span className="flex items-center text-blue-400">
              <Zap size={14} className="mr-1.5" /> MP
            </span>
            <span className="text-blue-200">{Math.ceil(player.mana)} / {player.maxMana}</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-400"
              initial={{ width: `${mpPercentage}%` }}
              animate={{ width: `${mpPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* XP Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1.5 text-white/70">
            <span className="text-sky-400">XP</span>
            <span className="text-sky-200">{player.xp} / {player.level * 100}</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-sky-400"
              initial={{ width: `${xpPercentage}%` }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col text-indigo-200 bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="flex items-center mb-1">
              <Sword size={18} className="text-indigo-400 mr-2" />
              <span className="text-sm font-medium">Attack: {player.baseAttack + (player.equippedWeapon?.attackBonus || 0)}</span>
            </div>
            {player.equippedWeapon && (
              <div className="text-xs text-white/50">{player.equippedWeapon.name} (+{player.equippedWeapon.attackBonus})</div>
            )}
            {!player.equippedWeapon && <div className="text-xs text-white/30">No Weapon Equipped</div>}
          </div>
          <div className="flex flex-col text-indigo-200 bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="flex items-center mb-1">
              <Shield size={18} className="text-indigo-400 mr-2" />
              <span className="text-sm font-medium">Defense: {player.baseDefense + (player.equippedArmor?.defenseBonus || 0)}</span>
            </div>
            {player.equippedArmor && (
              <div className="text-xs text-white/50">{player.equippedArmor.name} (+{player.equippedArmor.defenseBonus})</div>
            )}
            {!player.equippedArmor && <div className="text-xs text-white/30">No Armor Equipped</div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
