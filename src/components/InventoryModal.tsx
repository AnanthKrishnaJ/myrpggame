import React, { useState, useMemo } from 'react';
import { Player, Item } from '../types';
import { X, Package, Shield, Sword, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  equipItem: (item: Item, index: number) => void;
}

const RARITY_COLORS = {
  common: 'border-slate-500 bg-slate-500/10 text-slate-300',
  uncommon: 'border-green-500 bg-green-500/10 text-green-300',
  rare: 'border-blue-500 bg-blue-500/10 text-blue-300',
  epic: 'border-purple-500 bg-purple-500/10 text-purple-300',
  legendary: 'border-amber-500 bg-amber-500/10 text-amber-300',
  mythic: 'border-red-500 bg-red-500/10 text-red-300',
};

const getRarityClass = (rarity?: string) => {
  return RARITY_COLORS[(rarity as keyof typeof RARITY_COLORS) || 'common'];
};

export function InventoryModal({ isOpen, onClose, player, equipItem }: InventoryModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'weapon' | 'armor' | 'consumable'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = useMemo(() => {
    return player.inventory.filter(item => {
      if (activeTab !== 'all' && item.type !== activeTab) return false;
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [player.inventory, activeTab, searchQuery]);

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
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-indigo-950/40 to-transparent">
              <h3 className="flex items-center text-xl font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">
                <Package size={24} className="mr-3 text-indigo-400" />
                Inventory
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 transition-colors hover:text-white rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left Sidebar (Filters) */}
              <div className="w-48 border-r border-white/5 p-4 flex flex-col gap-2 shrink-0 bg-black/20">
                <div className="relative mb-4">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 px-2 mt-2">Categories</div>
                
                {(['all', 'weapon', 'armor', 'consumable'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {tab === 'all' && <Package size={14} />}
                    {tab === 'weapon' && <Sword size={14} />}
                    {tab === 'armor' && <Shield size={14} />}
                    {tab === 'consumable' && <span className="text-[14px]">🧪</span>}
                    {tab}
                  </button>
                ))}
              </div>

              {/* Main Grid */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                {filteredInventory.length === 0 ? (
                  <div className="h-full flex items-center justify-center flex-col text-slate-500">
                    <Package size={48} className="mb-4 opacity-20" />
                    <p className="text-sm uppercase tracking-widest font-bold">No items found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredInventory.map((item, idx) => (
                      <div 
                        key={`${item.id}-${idx}`} 
                        className={`group relative aspect-square rounded-xl border flex flex-col bg-black/40 hover:bg-black/60 transition-all cursor-pointer overflow-hidden ${getRarityClass(item.rarity)}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        
                        {/* Icon */}
                        <div className="flex-1 flex items-center justify-center text-3xl z-10 group-hover:scale-110 transition-transform duration-300">
                          {item.name.includes('Sword') || item.name.includes('Dagger') ? '🗡️' : 
                           item.name.includes('Armor') || item.name.includes('Robes') ? '🛡️' : '✨'}
                        </div>
                        
                        {/* Details */}
                        <div className="relative z-10 p-2 text-center border-t border-white/5 bg-black/40 backdrop-blur-sm">
                           <div className="text-[10px] font-bold text-white truncate px-1">{item.name}</div>
                           <div className="text-[9px] text-white/60 uppercase tracking-wider mt-0.5">
                             {item.type === 'weapon' ? `+${item.attackBonus} ATK` : 
                              item.type === 'armor' ? `+${item.defenseBonus} DEF` : ''}
                           </div>
                        </div>

                        {/* Hover Overlay Actions */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                           <button
                             onClick={() => equipItem(item, idx)}
                             className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400"
                           >
                             Equip
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
