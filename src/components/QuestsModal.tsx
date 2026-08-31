import React, { useState } from 'react';
import { Player, Quest } from '../types';
import { X, Book, CheckCircle, Circle, Coins, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  claimQuestReward: (questId: string) => void;
}

export function QuestsModal({ isOpen, onClose, player, claimQuestReward }: QuestsModalProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const filteredQuests = player.quests.filter(q => {
    if (activeTab === 'active') return q.status === 'active' || q.status === 'completed';
    return q.status === 'turned_in';
  });

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
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-amber-950/40 to-transparent">
              <h3 className="flex items-center text-xl font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">
                <Book size={24} className="mr-3 text-amber-400" />
                Quest Log
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 transition-colors hover:text-white rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left Sidebar (Tabs) */}
              <div className="w-48 border-r border-white/5 p-4 flex flex-col gap-2 shrink-0 bg-black/20">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-left ${
                    activeTab === 'active' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Active Quests
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-left ${
                    activeTab === 'completed' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  Completed
                </button>
              </div>

              {/* Main Area */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] bg-repeat">
                {filteredQuests.length === 0 ? (
                  <div className="h-full flex items-center justify-center flex-col text-slate-500">
                    <Book size={48} className="mb-4 opacity-20" />
                    <p className="text-sm uppercase tracking-widest font-bold">No {activeTab} quests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredQuests.map((quest) => (
                      <div key={quest.id} className="bg-black/60 border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden">
                        {quest.status === 'completed' && (
                           <div className="absolute top-0 right-0 p-2 bg-emerald-500 text-black text-[9px] font-bold uppercase tracking-widest rounded-bl-xl">
                             Ready to Turn In
                           </div>
                        )}
                        <h4 className="text-xl font-bold text-white mb-2 font-serif">{quest.title}</h4>
                        <p className="text-slate-400 text-sm mb-5 italic">{quest.description}</p>
                        
                        <div className="mb-6 space-y-3">
                          {quest.objectives.map((obj, i) => {
                            const isDone = obj.currentCount >= obj.requiredCount;
                            return (
                              <div key={i} className="flex items-center gap-3">
                                {isDone ? (
                                  <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                                ) : (
                                  <Circle size={18} className="text-slate-500 shrink-0" />
                                )}
                                <div className="flex-1">
                                  <div className={`text-sm ${isDone ? 'text-emerald-300 line-through opacity-70' : 'text-slate-200'}`}>
                                    {obj.description}
                                  </div>
                                </div>
                                <div className={`text-xs font-bold ${isDone ? 'text-emerald-400' : 'text-slate-400'}`}>
                                  {obj.currentCount} / {obj.requiredCount}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Rewards:</span>
                            {quest.rewards.gold && (
                              <span className="text-yellow-400 flex items-center gap-1 text-xs font-bold">
                                <Coins size={14} /> {quest.rewards.gold}g
                              </span>
                            )}
                            {quest.rewards.xp && (
                              <span className="text-blue-400 flex items-center gap-1 text-xs font-bold">
                                <Zap size={14} /> {quest.rewards.xp} XP
                              </span>
                            )}
                          </div>
                          
                          {quest.status === 'completed' && (
                            <button
                              onClick={() => claimQuestReward(quest.id)}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-colors shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                            >
                              Claim Reward
                            </button>
                          )}
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
