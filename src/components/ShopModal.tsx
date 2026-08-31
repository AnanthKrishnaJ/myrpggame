import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Coins, Shield, Sword } from 'lucide-react';
import { Item, Player } from '../types';
import { ITEMS } from '../data';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  onBuy: (item: Item) => void;
  onSell: (item: Item) => void;
}

export function ShopModal({ isOpen, onClose, player, onBuy, onSell }: ShopModalProps) {
  const shopItems = [
    ITEMS.wood_sword,
    ITEMS.iron_sword,
    ITEMS.steel_sword,
    ITEMS.leather_armor,
    ITEMS.iron_armor,
    ITEMS.steel_armor,
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-serif">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-4xl h-[80vh] flex flex-col bg-[#0A0D14] border border-slate-700/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-amber-900/40 to-transparent">
              <h3 className="flex items-center text-xl font-bold text-white uppercase tracking-[0.2em]">
                <ShoppingBag size={24} className="mr-3 text-amber-400" />
                Merchant
              </h3>
              <div className="flex flex-1 justify-center items-center">
                 <div className="bg-black/60 rounded-full px-4 py-2 border border-yellow-500/30 flex items-center gap-2">
                   <Coins size={16} className="text-yellow-400" />
                   <span className="text-yellow-400 font-bold">{player.gold}</span>
                 </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Buy Section */}
              <div className="flex-1 border-r border-white/5 p-6 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]">
                <h4 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4 border-b border-white/10 pb-2">For Sale</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {shopItems.map(item => {
                    const price = item.value * 2; // Shop sells at 2x value
                    const canAfford = player.gold >= price;
                    return (
                      <div key={`buy-${item.id}`} className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-colors">
                        <div>
                          <div className="font-bold text-slate-200 text-sm mb-1">{item.name}</div>
                          <div className="text-xs text-slate-400 flex gap-3">
                            {item.attackBonus > 0 && <span className="flex items-center gap-1 text-rose-400"><Sword size={12}/> +{item.attackBonus}</span>}
                            {item.defenseBonus > 0 && <span className="flex items-center gap-1 text-indigo-400"><Shield size={12}/> +{item.defenseBonus}</span>}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className={`text-sm font-bold flex items-center gap-1 ${canAfford ? 'text-yellow-400' : 'text-slate-500'}`}>
                            <Coins size={14}/> {price}
                          </span>
                          <button
                            onClick={() => onBuy(item)}
                            disabled={!canAfford}
                            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                              canAfford 
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/40 hover:shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                                : 'bg-black/50 text-slate-500 border-white/5 cursor-not-allowed'
                            }`}
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Sell Section */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]">
                <h4 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4 border-b border-white/10 pb-2">Your Items (Sell)</h4>
                {player.inventory.length === 0 ? (
                  <p className="text-slate-500 text-xs italic">You have no items to sell.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {player.inventory.map((item, index) => {
                      const isEquipped = player.equippedWeapon?.id === item.id || player.equippedArmor?.id === item.id;
                      const sellPrice = item.value;
                      return (
                        <div key={`sell-${item.id}-${index}`} className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-slate-500/30 transition-colors">
                          <div>
                            <div className="font-bold text-slate-200 text-sm mb-1">{item.name} {isEquipped && <span className="text-[10px] text-amber-500 ml-1">(Equipped)</span>}</div>
                            <div className="text-xs text-slate-400 flex gap-3">
                              {item.attackBonus > 0 && <span className="flex items-center gap-1 text-rose-400"><Sword size={12}/> +{item.attackBonus}</span>}
                              {item.defenseBonus > 0 && <span className="flex items-center gap-1 text-indigo-400"><Shield size={12}/> +{item.defenseBonus}</span>}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm font-bold flex items-center gap-1 text-slate-300">
                              <Coins size={14}/> {sellPrice}
                            </span>
                            <button
                              onClick={() => onSell(item)}
                              disabled={isEquipped}
                              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                                !isEquipped
                                  ? 'bg-slate-700/50 text-slate-200 border-slate-500/50 hover:bg-slate-600/50'
                                  : 'bg-black/50 text-slate-600 border-white/5 cursor-not-allowed'
                              }`}
                            >
                              Sell
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
