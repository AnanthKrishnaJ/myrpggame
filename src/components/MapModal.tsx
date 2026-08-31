import React, { useState } from 'react';
import { Player, Location } from '../types';
import { LOCATIONS, ENEMIES } from '../data';
import { X, Map as MapIcon, Crosshair, Skull } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  currentLocation: Location;
  onTravel: (locationId: string) => void;
}

export function MapModal({ isOpen, onClose, player, currentLocation, onTravel }: MapModalProps) {
  const [selectedLoc, setSelectedLoc] = useState<Location>(currentLocation);

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
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-emerald-950/40 to-transparent">
              <h3 className="flex items-center text-xl font-bold text-white uppercase tracking-[0.2em] drop-shadow-md">
                <MapIcon size={24} className="mr-3 text-emerald-400" />
                World Map
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 transition-colors hover:text-white rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left Sidebar (Locations List) */}
              <div className="w-64 border-r border-white/5 p-4 flex flex-col gap-2 shrink-0 bg-black/20 overflow-y-auto custom-scrollbar">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 px-2">Regions</div>
                
                {LOCATIONS.map(loc => {
                  const isCurrent = currentLocation.id === loc.id;
                  const isSelected = selectedLoc.id === loc.id;
                  const canTravel = player.level >= loc.levelReq;

                  return (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLoc(loc)}
                      className={`flex flex-col text-left px-4 py-3 rounded-xl transition-all ${
                        isSelected 
                          ? 'bg-emerald-500/20 border border-emerald-500/30' 
                          : 'bg-black/40 border border-white/5 hover:border-emerald-500/20 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-bold uppercase tracking-widest ${canTravel ? 'text-white' : 'text-slate-500'}`}>
                          {loc.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold uppercase">
                            Here
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold tracking-widest">
                        LVL {loc.levelReq}+
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Main Area (Location Details / Mobs Map) */}
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
                   
                   <div className="flex justify-between items-start mb-6">
                     <div>
                       <h2 className="text-3xl font-bold text-white mb-2 font-serif">{selectedLoc.name}</h2>
                       <p className="text-slate-300 italic">{selectedLoc.description}</p>
                     </div>
                     {player.level < selectedLoc.levelReq ? (
                        <div className="bg-rose-500/20 border border-rose-500/50 text-rose-300 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                          Level {selectedLoc.levelReq} Required
                        </div>
                     ) : selectedLoc.id !== currentLocation.id ? (
                        <button
                          onClick={() => {
                            onTravel(selectedLoc.id);
                            onClose();
                          }}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-400"
                        >
                          Travel Here
                        </button>
                     ) : (
                        <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                          Current Location
                        </div>
                     )}
                   </div>

                   <div className="mt-8 border-t border-white/10 pt-6">
                     <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.2em] mb-4 flex items-center">
                       <Crosshair size={16} className="mr-2" />
                       Known Hostiles
                     </h3>

                     {selectedLoc.safeZone ? (
                       <p className="text-slate-400 text-sm italic">This is a safe zone. No hostiles detected.</p>
                     ) : (
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                         {selectedLoc.enemies.map(enemyId => {
                           const enemy = ENEMIES[enemyId];
                           return (
                             <div key={enemyId} className="flex items-center gap-4 bg-black/40 border border-white/5 rounded-xl p-4">
                               <div className="w-12 h-12 bg-rose-950/50 border border-rose-500/30 rounded-lg flex items-center justify-center text-rose-400">
                                 <Skull size={24} />
                               </div>
                               <div>
                                 <div className="text-sm font-bold text-white mb-1">{enemy.name}</div>
                                 <div className="text-[10px] text-slate-400 uppercase tracking-widest">
                                   Max HP: <span className="text-emerald-400">{enemy.maxHp}</span>
                                 </div>
                               </div>
                             </div>
                           );
                         })}
                       </div>
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
