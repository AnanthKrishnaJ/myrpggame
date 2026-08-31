import React from 'react';
import { PlayerStatus } from './components/PlayerStatus';
import { ExplorationScreen } from './components/ExplorationScreen';
import { CombatScreen } from './components/CombatScreen';
import { LevelUpScreen } from './components/LevelUpScreen';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { useGameEngine } from './hooks/useGameEngine';
import { motion, AnimatePresence } from 'motion/react';
import { Skull, Crown, Play, Volume2, VolumeX } from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AutoSaveIndicator } from './components/AutoSaveIndicator';
import { useRef, useState, useEffect } from 'react';

export default function App() {
  const {
    gameState,
    player,
    currentLocation,
    currentEnemy,
    combatLog,
    combatTurn,
    damageEvents,
    skillChoices,
    hasSave,
    stepsInLocation,
    actions
  } = useGameEngine();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Try to play audio automatically on interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log('Autoplay prevented', e));
        }
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    // If we transition states and have interacted, ensure it's playing
    if (hasInteracted && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Autoplay prevented', e));
    }
  }, [gameState, hasInteracted]);

  return (
    <div className="min-h-screen bg-black text-slate-100 overflow-hidden relative flex flex-col items-center select-none font-sans">
      <audio ref={audioRef} src="/bgm.mp3" loop muted={isMuted} />
      
      {/* Audio Toggle Button */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/40 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all text-white/70 hover:text-white hover:scale-110 active:scale-95"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <AnimatedBackground />
      {player && currentLocation && (gameState === 'exploring' || gameState === 'combat' || gameState === 'level_up') && (
        <AutoSaveIndicator player={player} currentLocation={currentLocation} />
      )}
      <div className={`w-full relative z-10 flex-grow flex flex-col ${(gameState !== 'exploring' && gameState !== 'combat') ? 'max-w-6xl py-6 md:py-12 px-4' : 'h-[100dvh] overflow-y-auto overflow-x-hidden'}`}>
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center mt-20 text-center backdrop-blur-md bg-black/40 border border-white/10 p-12 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl font-serif font-bold uppercase tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-400 mb-6 drop-shadow-[0_0_30px_rgba(129,140,248,0.5)]">
                  Ethereal
                </h1>
                <p className="text-lg md:text-xl text-indigo-100/70 mb-12 max-w-lg mx-auto leading-relaxed font-serif tracking-wide">
                  Awaken your power. Explore the forgotten realms and reclaim your destiny in this dark fantasy adventure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {hasSave && (
                    <button 
                      onClick={actions.loadGame}
                      className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white uppercase tracking-[0.2em] bg-emerald-600/20 border border-emerald-400/30 rounded-full overflow-hidden transition-all hover:bg-emerald-500/30 hover:border-emerald-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      <Play className="mr-3" fill="currentColor" size={20} />
                      Continue Journey
                    </button>
                  )}
                  <button 
                    onClick={actions.startGame}
                    className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white uppercase tracking-[0.2em] bg-indigo-600/20 border border-indigo-400/30 rounded-full overflow-hidden transition-all hover:bg-indigo-500/30 hover:border-indigo-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <Play className="mr-3" fill="currentColor" size={20} />
                    {hasSave ? 'New Journey' : 'Begin Journey'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {gameState === 'role_selection' && (
            <RoleSelectionScreen onSelectRole={actions.selectRole} />
          )}

          {(gameState === 'exploring' || gameState === 'combat' || gameState === 'level_up') && (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={(gameState === 'exploring' || gameState === 'combat') ? 'h-full w-full' : 'space-y-6'}
            >
              {gameState === 'level_up' && <PlayerStatus player={player} />}
              
              {gameState === 'exploring' && (
                <ExplorationScreen 
                  player={player}
                  currentLocation={currentLocation}
                  combatLog={combatLog}
                  stepsInLocation={stepsInLocation}
                  actions={actions}
                />
              )}

              {gameState === 'combat' && currentEnemy && (
                <CombatScreen 
                  player={player}
                  enemy={currentEnemy}
                  combatLog={combatLog}
                  combatTurn={combatTurn}
                  damageEvents={damageEvents}
                  actions={actions}
                />
              )}

              {gameState === 'level_up' && (
                <LevelUpScreen 
                  player={player}
                  skillChoices={skillChoices}
                  onSelectSkill={actions.selectSkill}
                />
              )}
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center mt-20 text-center backdrop-blur-xl bg-black/40 border border-rose-500/30 p-12 rounded-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center">
                <Skull size={80} className="text-rose-500 mb-6 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                <h1 className="text-5xl font-bold uppercase tracking-[0.2em] text-rose-500 mb-4 text-shadow-[0_0_20px_rgba(244,63,94,0.3)]">You Died</h1>
                <p className="text-white/60 mb-10 text-lg">Your adventure ends here. The realms remain in darkness.</p>
                <button 
                  onClick={actions.startGame}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-rose-500/50 text-rose-100 font-bold uppercase tracking-widest rounded-xl transition-all hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'victory' && (
            <motion.div 
              key="victory"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
              className="flex flex-col items-center justify-center mt-20 text-center backdrop-blur-2xl bg-[#0a0f1d]/90 border-2 border-amber-500/50 p-12 md:p-20 rounded-[3rem] shadow-[0_0_150px_rgba(245,158,11,0.4)] relative overflow-hidden w-full max-w-4xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent animate-pulse pointer-events-none" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(251,191,36,0.1)_0%,transparent_60%)] pointer-events-none" 
              />
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Crown size={100} className="text-amber-400 mb-8 drop-shadow-[0_0_25px_rgba(251,191,36,0.8)]" />
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-6xl md:text-8xl font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 mb-6 filter drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                >
                  Victory
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-amber-100/80 mb-12 text-xl tracking-widest uppercase font-bold"
                >
                  You have slain the ancient darkness
                </motion.p>
                <div className="flex gap-6 mb-12">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="text-center p-6 bg-black/40 border border-indigo-500/30 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.2)] w-40"
                  >
                    <div className="text-indigo-300 text-xs uppercase tracking-widest font-black mb-2">Final Level</div>
                    <div className="text-5xl font-black text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]">{player.level}</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, type: "spring" }}
                    className="text-center p-6 bg-black/40 border border-amber-500/30 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.2)] w-40"
                  >
                    <div className="text-amber-300 text-xs uppercase tracking-widest font-black mb-2">Total Gold</div>
                    <div className="text-5xl font-black text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">{player.gold}</div>
                  </motion.div>
                </div>
                <motion.button 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={actions.startGame}
                  className="group relative overflow-hidden px-12 py-5 bg-amber-900/40 border border-amber-400/50 text-amber-100 font-black uppercase tracking-[0.3em] rounded-full transition-all hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] hover:bg-amber-800/60"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-200/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  Play Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
