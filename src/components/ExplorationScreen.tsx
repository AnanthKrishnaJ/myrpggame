import React, { useState, useEffect } from 'react';
import { Player, Location, Item } from '../types';
import { LOCATIONS } from '../data';
import { Tent, Swords, Lock, Shield, Sword, Heart, Coins, FlaskConical, Map as MapIcon, Compass, Book, User, Backpack, Zap, Trophy, Settings, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { InventoryModal } from './InventoryModal';
import { HeroAvatar } from './HeroAvatar';
import { QuestsModal } from './QuestsModal';
import { SkillsModal } from './SkillsModal';
import { MapModal } from './MapModal';
import { BestiaryModal } from './BestiaryModal';
import { ShopModal } from './ShopModal';

interface ExplorationScreenProps {
  player: Player;
  currentLocation: Location;
  combatLog: string[];
  stepsInLocation?: number;
  actions: {
    travel: (id: string) => void;
    explore: () => void;
    rest: () => void;
    buyPotion: () => void;
    buyItem: (item: Item) => void;
    sellItem: (item: Item) => void;
    equipItem: (item: Item, index: number) => void;
    talk: (npcId: string) => void;
    claimQuestReward: (questId: string) => void;
  };
}

const EquipSlot = ({ item, type, locked = false }: { item: Item | null, type: string, locked?: boolean }) => {
  return (
    <div className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center overflow-hidden transition-all ${
      locked ? 'bg-black/40 border-white/5 opacity-50' :
      item ? 'bg-indigo-900/20 border-indigo-500/30 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)] hover:border-indigo-400/60' : 'bg-black/20 border-white/10 hover:bg-white/10 cursor-pointer'
    } group`}>
      {locked ? (
         <>
           <Lock size={16} className="text-white/20 mb-1" />
           <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Locked</span>
         </>
      ) : item ? (
         <>
           <div className="text-xl mb-1 group-hover:scale-110 transition-transform">
             {item.name.includes('Sword') || item.name.includes('Dagger') ? '🗡️' : 
              item.name.includes('Armor') || item.name.includes('Robes') ? '🛡️' : '✨'}
           </div>
           <span className="text-[9px] text-indigo-200 text-center px-1 truncate w-full">{item.name}</span>
         </>
      ) : (
         <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold mt-1">{type}</span>
      )}
    </div>
  );
};

const NavButton = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${active ? 'text-indigo-300' : 'text-slate-400 hover:text-white hover:bg-white/5'} group`}>
    <div className={`p-2 rounded-lg transition-all ${active ? 'bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-transparent group-hover:bg-white/10'}`}>
      {icon}
    </div>
    <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
  </button>
);

export function ExplorationScreen({ player, currentLocation, combatLog, stepsInLocation = 0, actions }: ExplorationScreenProps) {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isBestiaryOpen, setIsBestiaryOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('character');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'i':
          setIsInventoryOpen(prev => !prev);
          break;
        case 'q':
          setIsQuestsOpen(prev => !prev);
          break;
        case 'm':
          setIsMapOpen(prev => !prev);
          break;
        case 'b':
          setIsBestiaryOpen(prev => !prev);
          break;
        case 's':
          setIsSkillsOpen(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] lg:h-full flex flex-col p-4 md:p-8 overflow-y-auto lg:overflow-hidden font-serif">
      <InventoryModal 
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        player={player}
        equipItem={actions.equipItem}
      />
      
      {/* Top Bar - Header & Nav */}
      <div className="flex justify-between items-start mb-6 z-20 shrink-0">
        <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full pr-8 pl-1 py-1 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-indigo-400 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(129,140,248,0.4)]">
             <div className="scale-[1.8] translate-y-3">
               <HeroAvatar player={player} faceOnly />
             </div>
          </div>
          <div className="flex flex-col justify-center gap-1.5 w-40 mt-1">
            <div className="flex justify-between items-end leading-none">
              <h1 className="text-lg font-bold text-white tracking-widest drop-shadow-md leading-none">ELYSIA</h1>
              <span className="text-[10px] text-indigo-300 font-bold mb-0.5">Lv. {player.level} Warrior</span>
            </div>
            {/* HP Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative" title={`HP: ${Math.ceil(player.hp)}/${player.maxHp}`}>
              <div className="absolute inset-y-0 left-0 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" style={{ width: `${(player.hp / player.maxHp) * 100}%` }}></div>
            </div>
            {/* XP Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative" title={`XP: ${player.xp}/${player.level * 100}`}>
              <div className="absolute inset-y-0 left-0 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" style={{ width: `${(player.xp / (player.level * 100)) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Center Nav */}
        <div className="hidden lg:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-lg">
          <NavButton icon={<User size={20} />} label="Character" active />
          <NavButton icon={<Backpack size={20} />} label="Inventory" onClick={() => setIsInventoryOpen(true)} />
          <NavButton icon={<Book size={20} />} label="Quests" onClick={() => setIsQuestsOpen(true)} />
          <NavButton icon={<Zap size={20} />} label="Skills" onClick={() => setIsSkillsOpen(true)} />
          <NavButton icon={<MapIcon size={20} />} label="Map" onClick={() => setIsMapOpen(true)} />
          <NavButton icon={<BookOpen size={20} />} label="Bestiary" onClick={() => setIsBestiaryOpen(true)} />
        </div>

        {/* Right: Gold & Settings */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-yellow-500/30 rounded-full px-5 py-2.5 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <Coins size={20} className="text-yellow-400" />
            <span className="text-lg font-bold text-yellow-400">{player.gold}</span>
          </div>
          <button className="p-3 bg-black/60 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
            <Settings size={20} className="text-slate-300" />
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 relative z-10"
      >
        {/* Left Panel: Quests & Stats */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-full max-h-full min-h-0">
          {/* Active Quest */}
          <div className="bg-[#0B0F19]/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.6)] flex flex-col shrink-0 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
            <h3 className="text-[10px] font-bold text-amber-500 tracking-[0.2em] mb-3 uppercase flex items-center gap-2">
              <Book size={12} /> {player.quests.find(q => q.status === 'active' || q.status === 'completed') ? 'Current Quest' : 'No Active Quests'}
            </h3>
            
            {(() => {
              const activeQuest = player.quests.find(q => q.status === 'active' || q.status === 'completed');
              if (!activeQuest) return <p className="text-xs text-slate-500 italic">You have no active quests.</p>;
              
              return (
                <>
                  <h4 className="text-sm font-bold text-white mb-2">{activeQuest.title}</h4>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">{activeQuest.description}</p>
                  
                  <div className="mb-4 space-y-2">
                    {activeQuest.objectives.map((obj, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className={obj.currentCount >= obj.requiredCount ? 'text-emerald-400 line-through' : 'text-slate-300'}>
                          {obj.description}
                        </span>
                        <span className="font-bold text-slate-400">
                          {obj.currentCount}/{obj.requiredCount}
                        </span>
                      </div>
                    ))}
                  </div>

                  {activeQuest.status === 'completed' ? (
                    <button 
                      onClick={() => actions.claimQuestReward(activeQuest.id)}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs rounded-lg transition-colors shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                    >
                      Claim Rewards
                    </button>
                  ) : (
                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1 font-bold">Rewards</span>
                      <div className="flex gap-4 text-xs font-bold">
                        {activeQuest.rewards.gold && <span className="text-yellow-400 flex items-center gap-1"><Coins size={12} /> {activeQuest.rewards.gold}g</span>}
                        {activeQuest.rewards.xp && <span className="text-blue-400 flex items-center gap-1"><Zap size={12} /> {activeQuest.rewards.xp} XP</span>}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Stats Cards */}
          <div className="bg-[#0B0F19]/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.6)] flex flex-col flex-1 min-h-0 overflow-y-auto custom-scrollbar">
             <h3 className="text-[10px] font-bold text-indigo-300 tracking-[0.2em] mb-4 uppercase">Statistics</h3>
             <div className="grid grid-cols-2 gap-3 mb-4">
               <div className="bg-black/40 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors flex items-center gap-3">
                  <div className="p-2 bg-rose-500/20 rounded-lg"><Sword size={16} className="text-rose-400"/></div>
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Attack</div>
                    <div className="text-sm font-bold text-white">{player.baseAttack + (player.equippedWeapon?.attackBonus || 0)}</div>
                  </div>
               </div>
               <div className="bg-black/40 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg"><Shield size={16} className="text-indigo-400"/></div>
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Defense</div>
                    <div className="text-sm font-bold text-white">{player.baseDefense + (player.equippedArmor?.defenseBonus || 0)}</div>
                  </div>
               </div>
             </div>

             {/* Extended Stats */}
             <div className="space-y-2 mt-2">
               <div className="flex justify-between items-center text-xs p-2 rounded hover:bg-white/5">
                 <span className="text-slate-400">Crit Chance</span>
                 <span className="font-bold text-slate-200">5.0%</span>
               </div>
               <div className="flex justify-between items-center text-xs p-2 rounded hover:bg-white/5">
                 <span className="text-slate-400">Crit Damage</span>
                 <span className="font-bold text-slate-200">150%</span>
               </div>
               <div className="flex justify-between items-center text-xs p-2 rounded hover:bg-white/5">
                 <span className="text-slate-400">Speed</span>
                 <span className="font-bold text-slate-200">105</span>
               </div>
               <div className="flex justify-between items-center text-xs p-2 rounded hover:bg-white/5">
                 <span className="text-slate-400">Mana</span>
                 <span className="font-bold text-blue-300">100 / 100</span>
               </div>
             </div>
          </div>
        </div>

        {/* Center: Hero Focus */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[400px] h-full max-h-full overflow-hidden">
           {/* Cinematic Lighting */}
           <div className="absolute top-0 w-full h-[500px] bg-[conic-gradient(at_top_center,rgba(255,255,255,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.1)_360deg)] opacity-30 mix-blend-overlay" />
           <div className="absolute bottom-10 w-96 h-24 bg-indigo-500/20 rounded-[100%] blur-3xl" />
           <div className="absolute bottom-14 w-64 h-8 bg-black/80 rounded-[100%] blur-md shadow-[0_0_50px_rgba(0,0,0,1)]" />
           
           <motion.div 
             animate={{ y: [0, -8, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
             className="relative z-10 h-[80%] max-h-[500px]"
           >
             <HeroAvatar player={player} className="h-full w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
           </motion.div>

           {/* Equipment Bar */}
           <div className="absolute bottom-0 w-full flex justify-center pb-4">
             <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl flex gap-2 overflow-x-auto custom-scrollbar max-w-full">
                <EquipSlot item={player.equippedWeapon} type="Weapon" />
                <EquipSlot item={player.equippedArmor} type="Armor" />
                <EquipSlot item={null} type="Helmet" locked />
                <EquipSlot item={null} type="Gloves" locked />
                <EquipSlot item={null} type="Boots" locked />
                <EquipSlot item={null} type="Ring" locked />
                <EquipSlot item={null} type="Necklace" locked />
             </div>
           </div>
        </div>

        {/* Right Panel: Map & Location Actions */}
        <div className="lg:col-span-4 flex flex-col gap-4 h-full max-h-full min-h-0">
          
          {/* Mini Map Area */}
          <div className="bg-[#0B0F19]/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.6)] shrink-0 h-48 relative overflow-hidden group">
            <div className="absolute inset-0 bg-indigo-900/20" />
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] mix-blend-overlay" />
            <div className="relative z-10 flex justify-between items-start mb-4">
              <h3 className="text-[10px] font-bold text-slate-300 tracking-[0.2em] uppercase flex items-center gap-1"><MapIcon size={12}/> Environment</h3>
              <button onClick={() => setIsMapOpen(true)} className="p-1 hover:bg-white/10 rounded text-indigo-400 transition-colors" title="World Map (M)">
                <Compass size={14} />
              </button>
            </div>
            
            {/* Progression Track */}
            <div className="relative z-10 w-full h-full flex items-center justify-center px-4 -mt-6">
              <div className="w-full relative h-1 bg-white/10 rounded-full">
                {/* Progress fill */}
                <div 
                  className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                  style={{ width: `${(stepsInLocation % 10) * (100 / 9)}%` }}
                />
                
                {/* Nodes */}
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-colors duration-500 ${
                      (stepsInLocation % 10) >= i
                        ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] border-none' 
                        : 'bg-[#0B0F19] border border-white/20'
                    }`}
                    style={{ left: `${i * (100 / 9)}%` }}
                  />
                ))}

                {/* Player Indicator */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] border-2 border-white flex items-center justify-center z-20"
                  animate={{ left: `${(stepsInLocation % 10) * (100 / 9)}%`, scale: [1, 1.2, 1] }}
                  transition={{ left: { type: 'spring', stiffness: 300, damping: 25 }, scale: { repeat: Infinity, duration: 2 } }}
                />
              </div>
            </div>

            <div className="absolute bottom-3 left-0 w-full text-center relative z-10">
               <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Expedition Depth: {Math.floor((stepsInLocation || 0) / 10)}</span>
            </div>
            
            <div className="absolute inset-0 border-2 border-white/5 pointer-events-none rounded-2xl" />
          </div>
          
          {/* Location Actions */}
          <div className="bg-[#0B0F19]/90 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.6)] relative flex flex-col flex-1 min-h-0 overflow-hidden">
             <div className="h-20 shrink-0 w-full bg-gradient-to-b from-indigo-950 to-transparent border-b border-white/5 relative flex flex-col justify-end p-5">
                <h2 className="text-xl font-serif font-bold text-white uppercase tracking-[0.15em] relative z-10 drop-shadow-md">{currentLocation.name}</h2>
                <div className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">Safe Zone</div>
             </div>
             
             <div className="p-5 flex-1 flex flex-col overflow-y-auto custom-scrollbar">
               <p className="text-slate-400 text-xs mb-5 leading-relaxed">{currentLocation.description}</p>

               {currentLocation.safeZone ? (
                 <div className="flex flex-col gap-3 mb-5 shrink-0">
                   <div className="grid grid-cols-2 gap-3 mb-3">
                      <button onClick={actions.rest} className="group relative flex flex-col items-center justify-center gap-2 bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 rounded-xl p-4 transition-all hover:border-indigo-400/50 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Tent className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-300" size={24} />
                        <div className="text-center relative z-10">
                          <div className="text-white font-bold text-xs tracking-widest uppercase mb-1">Inn</div>
                          <div className="text-amber-400/70 text-[9px] font-bold">10g / Full Heal</div>
                        </div>
                      </button>
                      <button onClick={actions.buyPotion} className="group relative flex flex-col items-center justify-center gap-2 bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 rounded-xl p-4 transition-all hover:border-blue-400/50 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <FlaskConical className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] group-hover:scale-110 transition-transform duration-300" size={24} />
                        <div className="text-center relative z-10">
                          <div className="text-white font-bold text-xs tracking-widest uppercase mb-1">Alchemist</div>
                          <div className="text-amber-400/70 text-[9px] font-bold">25g / Potion</div>
                        </div>
                      </button>
                   </div>
                   <button onClick={() => setIsShopOpen(true)} className="group relative flex items-center justify-center gap-3 bg-amber-900/20 hover:bg-amber-900/40 border border-amber-500/20 rounded-xl p-3 transition-all hover:border-amber-500/50 overflow-hidden mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Coins size={16} className="text-amber-400" />
                      <span className="text-amber-200 font-bold text-xs tracking-widest uppercase relative z-10">Visit Merchant</span>
                   </button>
                   {currentLocation.id === 'village' && (
                     <button onClick={() => actions.talk('elder')} className="group relative flex items-center justify-center gap-3 bg-indigo-900/40 hover:bg-indigo-800/60 border border-indigo-500/30 rounded-xl p-3 transition-all hover:border-indigo-400/60 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <User size={16} className="text-indigo-300" />
                        <span className="text-indigo-100 font-bold text-xs tracking-widest uppercase relative z-10">Talk to Village Elder</span>
                     </button>
                   )}
                 </div>
               ) : (
                 <div className="flex mb-5 shrink-0">
                    <button onClick={actions.explore} className="group relative flex-1 flex items-center justify-center gap-3 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 rounded-xl p-5 transition-all hover:border-rose-500/60 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)] overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Swords className="text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] group-hover:scale-125 transition-transform duration-500 ease-out" size={24} />
                      <div className="text-left relative z-10">
                        <div className="text-white font-bold text-sm tracking-widest uppercase mb-0.5 group-hover:text-rose-100 transition-colors">Explore Area</div>
                        <div className="text-rose-400/60 text-[10px] uppercase tracking-wider font-bold">Hunt Enemies & Find Loot</div>
                      </div>
                    </button>
                 </div>
               )}
               
               {/* Navigation Grid (Fast Travel) */}
               <div className="mt-auto pt-4 border-t border-white/5 shrink-0">
                 <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">Fast Travel</h3>
                 <div className="grid grid-cols-2 gap-2">
                    {LOCATIONS.map(loc => {
                      if (loc.id === currentLocation.id) return null;
                      const canTravel = player.level >= loc.levelReq;
                      return (
                        <button 
                          key={loc.id} 
                          disabled={!canTravel}
                          onClick={() => actions.travel(loc.id)} 
                          className={`rounded-xl px-3 py-2.5 text-xs transition-all flex items-center justify-between border ${
                            canTravel 
                              ? 'bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-white/20 cursor-pointer'
                              : 'bg-black/40 border-transparent text-slate-600 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {loc.safeZone ? <Tent size={12} className={canTravel ? "text-emerald-500" : "text-slate-700"} /> : <Swords size={12} className={canTravel ? "text-rose-500" : "text-slate-700"} />}
                            <span className="font-bold tracking-wider truncate max-w-[80px]">{loc.name}</span>
                          </div>
                          {!canTravel && <Lock size={12} className="text-slate-600 shrink-0" />}
                        </button>
                      )
                    })}
                 </div>
               </div>
             </div>
          </div>
        </div>
      </motion.div>

      <InventoryModal isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} player={player} equipItem={actions.equipItem} />
      <QuestsModal isOpen={isQuestsOpen} onClose={() => setIsQuestsOpen(false)} player={player} claimQuestReward={actions.claimQuestReward} />
      <SkillsModal isOpen={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} player={player} />
      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} player={player} currentLocation={currentLocation} onTravel={actions.travel} />
      <BestiaryModal isOpen={isBestiaryOpen} onClose={() => setIsBestiaryOpen(false)} />
      <ShopModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} player={player} onBuy={actions.buyItem} onSell={actions.sellItem} />
    </div>
  );
}

