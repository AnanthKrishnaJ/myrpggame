import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save } from 'lucide-react';
import { Player, Location } from '../types';

interface AutoSaveIndicatorProps {
  player: Player;
  currentLocation: Location;
}

export function AutoSaveIndicator({ player, currentLocation }: AutoSaveIndicatorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const isFirstRender = useRef(true);

  // Track significant changes to trigger auto-save visual
  const questStatusHash = player.quests.map(q => q.status).join(',');
  const inventoryHash = player.inventory.map(i => i.id).join(',');
  const skillsHash = player.skills.map(s => s.id).join(',');

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsSaving(true);
    const timer = setTimeout(() => {
      setIsSaving(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [
    currentLocation.id,
    player.level,
    player.gold,
    questStatusHash,
    inventoryHash,
    skillsHash
  ]);

  return (
    <AnimatePresence>
      {isSaving && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-6 right-6 z-[100] flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg"
        >
          <Save size={14} className="text-slate-400 animate-pulse" />
          <span className="text-xs text-slate-300 font-bold tracking-widest uppercase">Auto-saving...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
