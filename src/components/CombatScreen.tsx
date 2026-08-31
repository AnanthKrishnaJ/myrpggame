import React from 'react';
import { Player, Enemy, DamageEvent, Skill } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Sword, FlaskConical, Wind, Sparkles } from 'lucide-react';
import { EnemyAvatar } from './EnemyAvatar';
import { HeroAvatar } from './HeroAvatar';
import { CombatParticles } from './CombatParticles';

import { StatusEffectsDisplay } from './StatusEffectsDisplay';

interface CombatScreenProps {
  player: Player;
  enemy: Enemy;
  combatTurn: 'player' | 'enemy' | null;
  combatLog: string[];
  damageEvents: DamageEvent[];
  actions: {
    attack: () => void;
    heal: () => void;
    flee: () => void;
    useSkill?: (skill: Skill) => void;
  };
}

const BattleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-2xl">
    {/* Deep space parallax background */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d] via-[#121b2b] to-[#0d131f]" />
    
    {/* Moving Fog */}
    <motion.div 
      animate={{ x: ['-100%', '100%'] }} 
      transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      className="absolute inset-0 opacity-20"
      style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(129,140,248,0.2) 0%, transparent 70%)', width: '200%' }}
    />
    <motion.div 
      animate={{ x: ['100%', '-100%'] }} 
      transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      className="absolute inset-0 opacity-10"
      style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(251,191,36,0.2) 0%, transparent 50%)', width: '200%' }}
    />
    
    {/* Floor perspective */}
    <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-indigo-900/40 to-transparent" style={{ transform: 'perspective(500px) rotateX(60deg) scale(2)' }} />
  </div>
);

const TurnAnnouncer = ({ turn }: { turn: 'player' | 'enemy' | null }) => {
  return (
    <AnimatePresence>
      {turn && (
        <motion.div 
          key={turn}
          initial={{ opacity: 0, scale: 0.5, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.2, 1.2, 1.5], letterSpacing: ['0.1em', '0.5em', '0.5em', '1em'] }}
          transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1], ease: 'easeOut' }}
          className="absolute top-1/3 left-0 w-full text-center z-50 pointer-events-none"
        >
          <div className={`text-2xl md:text-3xl font-black italic uppercase drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] ${turn === 'player' ? 'text-indigo-400' : 'text-rose-500'}`}>
            {turn === 'player' ? 'Your Turn' : 'Enemy Turn'}
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-2 opacity-30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function CombatScreen({ 
  player, 
  enemy, 
  combatTurn,
  combatLog, 
  damageEvents,
  actions 
}: CombatScreenProps) {
  const isPlayerTurn = combatTurn === 'player';
  const enemyHpPercent = Math.max(0, (enemy.hp / enemy.maxHp) * 100);
  const playerHpPercent = Math.max(0, (player.hp / player.maxHp) * 100);
  const playerMpPercent = Math.max(0, (player.mana / player.maxMana) * 100);

  // Fallback to mock effects for visual demonstration if the game engine hasn't populated them
  const playerEffects = player.statusEffects?.length ? player.statusEffects : [
    { id: 'm1', name: 'Strength', type: 'buff' as const, icon: 'Swords', duration: 3, description: 'Attack power increased by 20%.' }
  ];
  const enemyEffects = enemy.statusEffects?.length ? enemy.statusEffects : [
    { id: 'm2', name: 'Poison', type: 'debuff' as const, icon: 'Skull', duration: 2, description: 'Taking damage over time.' }
  ];

  const [heroAnimType, setHeroAnimType] = React.useState<'none' | 'attack' | 'spell' | 'hit' | 'heal'>('none');
  const [enemyAnimType, setEnemyAnimType] = React.useState<'none' | 'attack' | 'spell' | 'hit'>('none');
  const [heroCrit, setHeroCrit] = React.useState(false);
  const [enemyCrit, setEnemyCrit] = React.useState(false);
  const [lastDamageId, setLastDamageId] = React.useState<string | null>(null);
  const [cameraShake, setCameraShake] = React.useState(false);
  const [turnAnnounce, setTurnAnnounce] = React.useState<'player' | 'enemy' | null>(null);

  React.useEffect(() => {
    if (combatTurn) {
      setTurnAnnounce(combatTurn);
      const timer = setTimeout(() => setTurnAnnounce(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [combatTurn]);

  React.useEffect(() => {
    if (damageEvents.length > 0) {
      const latest = damageEvents[damageEvents.length - 1];
      if (latest.id !== lastDamageId) {
        setLastDamageId(latest.id);
        const animDuration = latest.isCrit ? 600 : 300;

        if (latest.target === 'enemy') {
          setHeroAnimType(latest.type === 'spell' ? 'spell' : 'attack');
          setEnemyAnimType('hit');
          setHeroCrit(!!latest.isCrit);
          setEnemyCrit(!!latest.isCrit);
          if (latest.isCrit) {
            setCameraShake(true);
          }
          setTimeout(() => {
            setHeroAnimType('none');
            setEnemyAnimType('none');
            setHeroCrit(false);
            setEnemyCrit(false);
            setCameraShake(false);
          }, animDuration);
        } else if (latest.target === 'player') {
          if (latest.type === 'heal') {
            setHeroAnimType('heal');
            setTimeout(() => {
              setHeroAnimType('none');
            }, 600);
          } else {
            setEnemyAnimType(latest.type === 'spell' ? 'spell' : 'attack');
            setHeroAnimType('hit');
            setEnemyCrit(!!latest.isCrit);
            setHeroCrit(!!latest.isCrit);
            if (latest.isCrit) {
              setCameraShake(true);
            }
            setTimeout(() => {
              setEnemyAnimType('none');
              setHeroAnimType('none');
              setEnemyCrit(false);
              setHeroCrit(false);
              setCameraShake(false);
            }, animDuration);
          }
        }
      }
    }
  }, [damageEvents, lastDamageId]);

  const arenaVariants = {
    normal: { scale: 1, x: 0, y: 0 },
    zoomedPlayerAtk: { scale: 1.05, x: 20, y: 10, transition: { duration: 0.2 } },
    zoomedEnemyAtk: { scale: 1.05, x: -20, y: 10, transition: { duration: 0.2 } },
    shake: { scale: 1.1, x: [-15, 15, -15, 15, -10, 10, 0], y: [-10, 10, -5, 5, 0], transition: { duration: 0.5, ease: 'linear' } }
  };

  const getArenaState = () => {
    if (cameraShake) return 'shake';
    if (heroAnimType === 'attack' || heroAnimType === 'spell') return 'zoomedPlayerAtk';
    if (enemyAnimType === 'attack' || enemyAnimType === 'spell') return 'zoomedEnemyAtk';
    return 'normal';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 w-full max-w-5xl mx-auto p-4 py-8 md:p-8 min-h-[100dvh] lg:min-h-0 flex flex-col justify-center font-sans"
    >
      <TurnAnnouncer turn={turnAnnounce} />

      <motion.div 
        variants={arenaVariants}
        animate={getArenaState()}
        className="backdrop-blur-xl bg-[#0a0f1d]/80 border border-indigo-500/20 rounded-3xl p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
      >
        <BattleBackground />
        <CombatParticles />
        
        {/* Magic Circles & Overlays */}
        <AnimatePresence>
          {heroAnimType === 'spell' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.5, 2], rotate: 180 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-indigo-500/50 rounded-full flex items-center justify-center border-dashed"
            >
              <div className="w-48 h-48 border-2 border-indigo-300/40 rounded-full" />
            </motion.div>
          )}
          {heroAnimType === 'heal' && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: [0, 0.8, 0], y: -50 }}
              transition={{ duration: 0.6 }}
              className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-full bg-gradient-to-t from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 blur-xl pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="flex justify-between items-end border-b border-indigo-500/20 pb-8 mb-8 relative z-10">
          
          {/* PLAYER SIDE */}
          <div className="text-center w-1/3 relative z-10 flex flex-col items-center">
            {/* Status Bars (Player) */}
            <div className="w-full mb-6 max-w-[160px] relative">
              <StatusEffectsDisplay effects={playerEffects} />
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-bold uppercase tracking-widest text-indigo-200 text-sm drop-shadow-md truncate pr-2">{player.name}</h3>
                <span className="text-[10px] text-white/50 font-bold whitespace-nowrap">{Math.ceil(player.hp)} / {player.maxHp} HP</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2 mb-1.5 border border-white/10 overflow-hidden relative">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-rose-500 rounded-full"
                  initial={{ width: `${playerHpPercent}%` }}
                  animate={{ width: `${playerHpPercent}%` }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                />
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                  initial={{ width: `${playerHpPercent}%` }}
                  animate={{ width: `${playerHpPercent}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="w-full bg-black/60 rounded-full h-1.5 border border-white/10 overflow-hidden">
                <motion.div 
                  className="bg-blue-500 h-full rounded-full"
                  initial={{ width: `${playerMpPercent}%` }}
                  animate={{ width: `${playerMpPercent}%` }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                />
              </div>
            </div>

            {/* Damage Number Overlays */}
            <AnimatePresence>
              {damageEvents.filter(e => e.target === 'player' && e.type !== 'heal').map(e => (
                <motion.div
                  key={`slash-${e.id}`}
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, e.isCrit ? 3 : 2, e.isCrit ? 4 : 3], rotate: -45 }}
                  transition={{ duration: e.isCrit ? 0.6 : 0.3 }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-2 ${e.isCrit ? 'bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,1)]' : 'bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,1)]'} rounded-full blur-[2px] pointer-events-none z-40`}
                />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {damageEvents.filter(e => e.target === 'player').map(e => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -80, scale: e.type === 'heal' ? 1.5 : (e.isCrit ? 2.5 : 1.8) }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: e.isCrit ? 1.2 : 0.8, ease: [0.175, 0.885, 0.32, 1.275] }} // Bounce ease
                  className={`absolute top-1/4 left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-black italic ${e.type === 'heal' ? 'text-emerald-400 drop-shadow-[0_4px_10px_rgba(16,185,129,0.8)]' : (e.isCrit ? 'text-amber-400 drop-shadow-[0_4px_15px_rgba(251,191,36,1)]' : 'text-rose-500 drop-shadow-[0_4px_10px_rgba(244,63,94,0.8)]')} z-50 pointer-events-none flex flex-col items-center`}
                >
                  {e.isCrit && e.type !== 'heal' && <span className="text-[12px] tracking-widest text-amber-200 uppercase">Critical</span>}
                  <span>{e.type === 'heal' ? '+' : '-'}{e.amount}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Avatar */}
            <motion.div 
              animate={
                heroAnimType === 'attack' 
                  ? { x: [0, heroCrit ? 100 : 60, 0], scale: [1, heroCrit ? 1.3 : 1.2, 1], filter: ["brightness(1)", "brightness(2)", "brightness(1)"] } 
                  : heroAnimType === 'spell'
                    ? { y: [0, -30, 0], scale: [1, 1.1, 1], filter: ["hue-rotate(0deg)", "hue-rotate(180deg) brightness(2)", "hue-rotate(0deg)"] }
                  : heroAnimType === 'heal'
                    ? { scale: [1, 1.1, 1], filter: ["brightness(1)", "brightness(1.5) sepia(1) hue-rotate(90deg)", "brightness(1)"] }
                  : heroAnimType === 'hit'
                    ? { x: heroCrit ? [-20, 20, -20, 20, 0] : [-10, 10, -10, 10, 0], filter: ["brightness(1)", "brightness(0.2) sepia(1) hue-rotate(-50deg) saturate(10)", "brightness(1)"] } 
                    : {}
              }
              transition={{ duration: heroAnimType === 'hit' && heroCrit ? 0.6 : 0.3, ease: "easeInOut" }}
              className="relative"
            >
              <HeroAvatar player={player} />
            </motion.div>
          </div>
          
          <div className="text-center pb-8 flex flex-col justify-center items-center z-10 opacity-70">
            <span className="text-2xl font-black text-white/20 italic mb-2 tracking-[0.3em]">VS</span>
          </div>

          {/* ENEMY SIDE */}
          <div className="text-center w-1/3 relative z-10 flex flex-col items-center">
            {/* Damage Number Overlays */}
            <AnimatePresence>
              {damageEvents.filter(e => e.target === 'enemy').map(e => (
                <motion.div
                  key={`slash-${e.id}`}
                  initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, e.isCrit ? 3 : 2, e.isCrit ? 4 : 3], rotate: 45 }}
                  transition={{ duration: e.isCrit ? 0.6 : 0.3 }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-2 ${e.isCrit ? 'bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,1)]' : 'bg-white shadow-[0_0_20px_rgba(255,255,255,1)]'} rounded-full blur-[2px] pointer-events-none z-40`}
                />
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {damageEvents.filter(e => e.target === 'enemy').map(e => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -80, scale: e.isCrit ? 2.5 : 1.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: e.isCrit ? 1.2 : 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
                  className={`absolute top-1/4 left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-black italic ${e.isCrit ? 'text-amber-400 drop-shadow-[0_4px_15px_rgba(251,191,36,1)]' : 'text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.8)]'} z-50 pointer-events-none flex flex-col items-center`}
                >
                  {e.isCrit && <span className="text-[12px] tracking-widest text-amber-200 uppercase">Critical</span>}
                  <span>-{e.amount}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Enemy Status */}
            <div className="w-full mb-6 max-w-[160px] relative">
              <StatusEffectsDisplay effects={enemyEffects} />
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-bold uppercase tracking-widest text-rose-200 text-sm drop-shadow-md truncate pr-2">{enemy.name}</h3>
                <span className="text-[10px] text-white/50 font-bold whitespace-nowrap">{Math.ceil(enemy.hp)} / {enemy.maxHp} HP</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2 mb-1 border border-white/10 overflow-hidden relative">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-rose-500 rounded-full"
                  initial={{ width: `${enemyHpPercent}%` }}
                  animate={{ width: `${enemyHpPercent}%` }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                />
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                  initial={{ width: `${enemyHpPercent}%` }}
                  animate={{ width: `${enemyHpPercent}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            <motion.div 
              animate={
                enemyAnimType === 'attack' 
                  ? { x: [0, enemyCrit ? -100 : -60, 0], scale: [1, enemyCrit ? 1.3 : 1.2, 1], filter: ["brightness(1)", "brightness(2)", "brightness(1)"] } 
                  : enemyAnimType === 'spell'
                    ? { y: [0, -30, 0], scale: [1, 1.1, 1], filter: ["hue-rotate(0deg)", "hue-rotate(-90deg) brightness(2)", "hue-rotate(0deg)"] }
                  : enemyAnimType === 'hit' 
                    ? { x: enemyCrit ? [-20, 20, -20, 20, 0] : [-10, 10, -10, 10, 0], filter: ["brightness(1)", "brightness(0.2) sepia(1) hue-rotate(-50deg) saturate(10)", "brightness(1)"] } 
                    : {}
              }
              transition={{ duration: enemyAnimType === 'hit' && enemyCrit ? 0.6 : 0.3, ease: "easeInOut" }}
              className="relative"
            >
              <EnemyAvatar enemy={enemy} />
            </motion.div>
          </div>
        </div>

        {/* AAA Action Menu */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <motion.button 
              whileHover={isPlayerTurn ? { scale: 1.05, y: -5 } : {}}
              whileTap={isPlayerTurn ? { scale: 0.95 } : {}}
              disabled={!isPlayerTurn}
              onClick={actions.attack}
              className={`relative overflow-hidden p-4 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                isPlayerTurn 
                  ? 'bg-rose-900/40 hover:bg-rose-600/50 border-rose-400/50 text-rose-50 cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_40px_rgba(244,63,94,0.6)]' 
                  : 'bg-black/40 border-white/5 text-white/20 cursor-not-allowed grayscale'
              }`}
            >
              {isPlayerTurn && <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent pointer-events-none" />}
              <Sword className={`mb-3 relative z-10 ${isPlayerTurn ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''}`} size={32} />
              <span className="font-black uppercase tracking-[0.2em] text-sm relative z-10">Attack</span>
            </motion.button>
            
            <motion.button 
              whileHover={isPlayerTurn && player.potions > 0 ? { scale: 1.05, y: -5 } : {}}
              whileTap={isPlayerTurn && player.potions > 0 ? { scale: 0.95 } : {}}
              disabled={!isPlayerTurn || player.potions <= 0}
              onClick={actions.heal}
              className={`relative overflow-hidden p-4 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                isPlayerTurn && player.potions > 0
                  ? 'bg-emerald-900/40 hover:bg-emerald-600/50 border-emerald-400/50 text-emerald-50 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]' 
                  : 'bg-black/40 border-white/5 text-white/20 cursor-not-allowed grayscale'
              }`}
            >
              {isPlayerTurn && player.potions > 0 && <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent pointer-events-none" />}
              <div className="relative">
                <FlaskConical className={`mb-3 relative z-10 ${isPlayerTurn && player.potions > 0 ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''}`} size={32} />
                <span className="absolute -top-2 -right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">{player.potions}</span>
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-sm relative z-10">Heal</span>
            </motion.button>
            
            <motion.button 
              whileHover={isPlayerTurn ? { scale: 1.05, y: -5 } : {}}
              whileTap={isPlayerTurn ? { scale: 0.95 } : {}}
              disabled={!isPlayerTurn}
              onClick={actions.flee}
              className={`relative overflow-hidden p-4 rounded-2xl border flex flex-col items-center justify-center transition-all sm:col-span-1 col-span-2 ${
                isPlayerTurn 
                  ? 'bg-slate-800/40 hover:bg-slate-700/60 border-slate-400/50 text-slate-50 cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                  : 'bg-black/40 border-white/5 text-white/20 cursor-not-allowed grayscale'
              }`}
            >
              <Wind className="mb-3 relative z-10" size={32} />
              <span className="font-black uppercase tracking-[0.2em] text-sm relative z-10">Flee</span>
            </motion.button>
          </div>

          <div className="md:col-span-4 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col h-40 overflow-y-auto custom-scrollbar relative">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-indigo-300 font-bold mb-2 sticky top-0 bg-black/80 backdrop-blur-sm py-1 z-10">Combat Log</h4>
            <AnimatePresence>
              {[...combatLog].reverse().map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: Math.max(0.3, 1 - i * 0.15), x: 0, height: 'auto' }}
                  key={`${combatLog.length - i}-${log}`} 
                  className={`text-xs mb-1.5 leading-relaxed font-mono py-1 border-l-2 pl-2 ${
                    log.includes('CRITICAL') ? 'text-amber-400 border-amber-500 font-bold bg-amber-500/10' :
                    log.includes('attacks you') ? 'text-rose-300 border-rose-500' :
                    log.includes('You attack') ? 'text-indigo-200 border-indigo-500' :
                    log.includes('healed') ? 'text-emerald-300 border-emerald-500' :
                    log.includes('fled') ? 'text-slate-400 border-slate-500' :
                    'text-white/60 border-white/20'
                  }`}
                >
                  <span className="text-white/30 mr-1.5 text-[9px]">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Skills Row */}
        {player.skills.length > 0 && (
          <div className="mt-6 pt-6 border-t border-indigo-500/20">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-indigo-300 font-bold mb-4 flex items-center gap-2">
              <Sparkles size={12} /> Special Skills
            </h4>
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {player.skills.map((skill) => {
                const canCast = player.mana >= skill.manaCost;
                return (
                  <motion.button
                    key={skill.id}
                    whileHover={isPlayerTurn && canCast ? { scale: 1.05, y: -2 } : {}}
                    whileTap={isPlayerTurn && canCast ? { scale: 0.95 } : {}}
                    disabled={!isPlayerTurn || !canCast}
                    onClick={() => actions.useSkill?.(skill)}
                    className={`shrink-0 w-36 p-3 rounded-xl border flex flex-col items-center justify-center transition-all relative overflow-hidden ${
                      isPlayerTurn && canCast
                        ? 'bg-indigo-900/40 hover:bg-indigo-600/50 border-indigo-400/50 text-indigo-50 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]' 
                        : 'bg-black/40 border-white/5 text-white/20 cursor-not-allowed grayscale'
                    }`}
                  >
                    {isPlayerTurn && canCast && <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent pointer-events-none" />}
                    <span className="font-bold text-xs uppercase tracking-widest mb-2 relative z-10 text-center">{skill.name}</span>
                    <span className={`text-[10px] font-black px-2 py-1 rounded relative z-10 flex items-center gap-1 ${isPlayerTurn && canCast ? 'bg-indigo-950/80 text-blue-300 border border-blue-500/30' : 'bg-black/50 text-white/30 border border-white/10'}`}>
                      {skill.manaCost} MP
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
