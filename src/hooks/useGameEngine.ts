import { useState, useCallback, useEffect } from 'react';
import { Player, Enemy, GameState, Location, Item, DamageEvent, Skill, Quest } from '../types';
import { LOCATIONS, ENEMIES, ITEMS, SKILLS, QUESTS, ROLES } from '../data';
import { audio } from '../audio';

const createInitialPlayer = (): Player => ({
  name: 'Hero',
  maxHp: 100,
  hp: 100,
  maxMana: 50,
  mana: 50,
  level: 1,
  xp: 0,
  gold: 20,
  baseAttack: 15,
  baseDefense: 5,
  potions: 3,
  inventory: [],
  equippedWeapon: null,
  equippedArmor: null,
  skills: [],
  quests: JSON.parse(JSON.stringify(QUESTS)),
});

export function useGameEngine() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [player, setPlayer] = useState<Player>(createInitialPlayer());
  const [currentLocation, setCurrentLocation] = useState<Location>(LOCATIONS[0]);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [combatTurn, setCombatTurn] = useState<'player' | 'enemy'>('player');
  const [damageEvents, setDamageEvents] = useState<DamageEvent[]>([]);
  const [skillChoices, setSkillChoices] = useState<Skill[]>([]);
  const [hasSave, setHasSave] = useState(false);
  const [stepsInLocation, setStepsInLocation] = useState(0);

  useEffect(() => {
    setHasSave(!!localStorage.getItem('ethereal_save'));
  }, []);

  useEffect(() => {
    if (gameState === 'exploring' || gameState === 'combat' || gameState === 'level_up') {
      const saveData = {
        player,
        currentLocationId: currentLocation.id,
        stepsInLocation,
      };
      localStorage.setItem('ethereal_save', JSON.stringify(saveData));
      setHasSave(true);
    }
  }, [player, currentLocation, gameState]);

  const loadGame = useCallback(() => {
    try {
      const saveStr = localStorage.getItem('ethereal_save');
      if (saveStr) {
        const save = JSON.parse(saveStr);
        setPlayer(save.player);
        const loc = LOCATIONS.find(l => l.id === save.currentLocationId) || LOCATIONS[0];
        setCurrentLocation(loc);
        setStepsInLocation(save.stepsInLocation || 0);
        setGameState('exploring');
        setCombatLog(['Game loaded successfully.']);
        audio.playStart();
      }
    } catch (e) {
      console.error('Failed to load game', e);
    }
  }, []);

  const addDamageEvent = useCallback((target: 'player' | 'enemy', amount: number, type: 'attack' | 'spell' | 'heal' = 'attack', isCrit: boolean = false) => {
    const id = Date.now().toString() + Math.random().toString();
    setDamageEvents(prev => [...prev, { id, target, amount, type, isCrit }]);
    setTimeout(() => {
      setDamageEvents(prev => prev.filter(e => e.id !== id));
    }, 1000);
  }, []);

  const addLog = useCallback((msg: string) => {
    setCombatLog(prev => {
      const next = [...prev, msg];
      return next.slice(-8); // Keep last 8 messages
    });
  }, []);

  const progressQuest = useCallback((type: 'kill' | 'explore' | 'collect' | 'talk', target: string) => {
    setPlayer(p => {
      let changed = false;
      const newQuests = p.quests.map(q => {
        if (q.status !== 'active') return q;
        let objChanged = false;
        const newObjs = q.objectives.map(obj => {
          if (obj.type === type && obj.target === target && obj.currentCount < obj.requiredCount) {
            objChanged = true;
            changed = true;
            return { ...obj, currentCount: obj.currentCount + 1 };
          }
          return obj;
        });
        if (objChanged) {
          const allDone = newObjs.every(o => o.currentCount >= o.requiredCount);
          if (allDone) {
            addLog(`Quest Completed: ${q.title}!`);
            audio.playVictory();
            return { ...q, objectives: newObjs, status: 'completed' as const };
          }
          return { ...q, objectives: newObjs };
        }
        return q;
      });
      return changed ? { ...p, quests: newQuests } : p;
    });
  }, [addLog]);

  const claimQuestReward = useCallback((questId: string) => {
    setPlayer(p => {
      const q = p.quests.find(x => x.id === questId);
      if (!q || q.status !== 'completed') return p;
      
      const rewards = q.rewards;
      addLog(`Claimed rewards for ${q.title}!`);
      audio.playTreasure();

      const newQuests = p.quests.map(x => x.id === questId ? { ...x, status: 'turned_in' as const } : x);

      let newLevel = p.level;
      let newXp = p.xp + (rewards.xp || 0);
      let nextLevelXp = newLevel * 100;
      let hpBonus = 0;
      let manaBonus = 0;
      let atkBonus = 0;
      let defBonus = 0;
      
      while (newXp >= nextLevelXp) {
        newLevel++;
        newXp -= nextLevelXp;
        nextLevelXp = newLevel * 100;
        hpBonus += 25;
        manaBonus += 10;
        atkBonus += 6;
        defBonus += 3;
        addLog(`Level up! You are now level ${newLevel}!`);
        audio.playLevelUp();
      }

      const newInventory = rewards.items ? [...p.inventory, ...rewards.items] : [...p.inventory];

      return {
        ...p,
        level: newLevel,
        xp: newXp,
        gold: p.gold + (rewards.gold || 0),
        maxHp: p.maxHp + hpBonus,
        hp: p.maxHp + hpBonus,
        maxMana: p.maxMana + manaBonus,
        mana: p.mana + manaBonus,
        baseAttack: p.baseAttack + atkBonus,
        baseDefense: p.baseDefense + defBonus,
        inventory: newInventory,
        quests: newQuests
      };
    });
  }, [addLog]);

  const startGame = useCallback(() => {
    setGameState('role_selection');
    audio.playStart();
  }, []);

  const selectRole = useCallback((roleId: string) => {
    const role = ROLES[roleId];
    if (!role) return;

    const initial = createInitialPlayer();
    initial.maxHp = role.maxHp;
    initial.hp = role.maxHp;
    initial.maxMana = role.maxMana;
    initial.mana = role.maxMana;
    initial.baseAttack = role.baseAttack;
    initial.baseDefense = role.baseDefense;
    
    // Add starting equipment
    for (const itemId of role.startingEquipment) {
      if (ITEMS[itemId]) {
        const item = ITEMS[itemId];
        if (item.type === 'weapon' && !initial.equippedWeapon) {
          initial.equippedWeapon = item;
        } else if (item.type === 'armor' && !initial.equippedArmor) {
          initial.equippedArmor = item;
        } else {
          initial.inventory.push(item);
        }
      }
    }

    setPlayer(initial);
    setCurrentLocation(LOCATIONS[0]);
    setGameState('exploring');
    setCombatLog([`You have chosen the path of the ${role.name}.`]);
    audio.playStart();
  }, []);

  const travel = useCallback((locationId: string) => {
    const loc = LOCATIONS.find(l => l.id === locationId);
    if (loc && player.level >= loc.levelReq) {
      setCurrentLocation(loc);
      setStepsInLocation(0);
      setCombatLog([]);
      addLog(`Travelled to ${loc.name}.`);
      audio.playExplore();
      progressQuest('explore', locationId);
    } else {
       addLog(`Cannot travel there yet. Level ${loc?.levelReq} required.`);
    }
  }, [player.level, addLog, progressQuest]);

  const explore = useCallback(() => {
    if (currentLocation.safeZone) {
      addLog("It's peaceful here. Nothing to fight.");
      return;
    }
    
    setStepsInLocation(prev => prev + 1);

    // 20% chance to find nothing, 80% combat
    if (Math.random() > 0.8) {
      const foundGold = Math.floor(Math.random() * 15) + 1;
      setPlayer(p => ({ ...p, gold: p.gold + foundGold }));
      addLog(`You found a hidden stash with ${foundGold} gold!`);
      audio.playTreasure();
      return;
    }

    // Trigger Combat
    const enemies = currentLocation.enemies;
    const randomEnemyId = enemies[Math.floor(Math.random() * enemies.length)];
    const enemyData = ENEMIES[randomEnemyId];
    
    setCurrentEnemy({
      ...enemyData,
      hp: enemyData.maxHp
    });
    setGameState('combat');
    setCombatTurn('player');
    addLog(`A wild ${enemyData.name} appears!`);
    audio.playEncounter();
  }, [currentLocation, addLog]);

  const endCombat = useCallback((won: boolean) => {
    if (won && currentEnemy) {
      addLog(`You defeated the ${currentEnemy.name}! Gained ${currentEnemy.xpReward} XP and ${currentEnemy.goldReward} gold.`);
      
      progressQuest('kill', currentEnemy.id);

      let foundItem: Item | null = null;
      if (currentEnemy.drops) {
        for (const drop of currentEnemy.drops) {
          if (Math.random() < drop.chance) {
            foundItem = ITEMS[drop.itemId];
            break;
          }
        }
      }

      if (foundItem) {
        addLog(`The ${currentEnemy.name} dropped a ${foundItem.name}!`);
        audio.playTreasure();
      }
      
      const nextXp = player.xp + currentEnemy.xpReward;
      const leveledUp = nextXp >= player.level * 100;
      
      setPlayer(p => {
        const newPlayer = {
          ...p,
          xp: p.xp + currentEnemy.xpReward,
          gold: p.gold + currentEnemy.goldReward,
          inventory: foundItem ? [...p.inventory, foundItem] : p.inventory
        };
        
        if (leveledUp) {
          const nextLevelXp = p.level * 100;
          return {
            ...newPlayer,
            level: p.level + 1,
            xp: newPlayer.xp - nextLevelXp,
            maxHp: p.maxHp + 25,
            hp: p.maxHp + 25,
            maxMana: p.maxMana + 10,
            mana: p.maxMana + 10,
            baseAttack: p.baseAttack + 6,
            baseDefense: p.baseDefense + 3,
          };
        }
        return newPlayer;
      });
      
      if (currentEnemy.id === 'dragon') {
        setGameState('victory');
        audio.playVictory();
      } else if (leveledUp) {
        const availableSkills = Object.values(SKILLS).filter(s => !player.skills.find(ps => ps.id === s.id));
        const shuffled = availableSkills.sort(() => 0.5 - Math.random());
        setSkillChoices(shuffled.slice(0, 3));
        setGameState('level_up');
        addLog(`Level up! You are now level ${player.level + 1}!`);
        audio.playLevelUp();
      } else {
        setGameState('exploring');
      }
    } else {
      setGameState('gameover');
      audio.playGameOver();
    }
    setCurrentEnemy(null);
  }, [currentEnemy, player, addLog]);

  const getTotalAttack = useCallback((p: Player) => {
    return p.baseAttack + (p.equippedWeapon?.attackBonus || 0) + (p.equippedArmor?.attackBonus || 0);
  }, []);

  const getTotalDefense = useCallback((p: Player) => {
    return p.baseDefense + (p.equippedWeapon?.defenseBonus || 0) + (p.equippedArmor?.defenseBonus || 0);
  }, []);

  const attack = useCallback(() => {
    if (combatTurn !== 'player' || !currentEnemy) return;

    // Player attacks
    const totalAttack = getTotalAttack(player);
    const critChance = player.critChance || 0.05;
    const isCrit = Math.random() < critChance;
    const critMultiplier = isCrit ? (player.critDamage || 1.5) : 1;
    const damage = Math.max(1, Math.floor((totalAttack * (0.8 + Math.random() * 0.4) * critMultiplier)) - currentEnemy.defense);
    
    addLog(`You attack the ${currentEnemy.name} for ${damage} damage!${isCrit ? ' (CRITICAL)' : ''}`);
    audio.playAttack();
    addDamageEvent('enemy', damage, 'attack', isCrit);
    
    const newEnemyHp = currentEnemy.hp - damage;
    if (newEnemyHp <= 0) {
      setCurrentEnemy(e => e ? { ...e, hp: 0 } : null);
      setTimeout(() => endCombat(true), 1200);
      return;
    }

    setCurrentEnemy(e => e ? { ...e, hp: newEnemyHp } : null);
    setCombatTurn('enemy');
  }, [combatTurn, currentEnemy, player, getTotalAttack, endCombat, addLog, addDamageEvent]);

  const useSkill = useCallback((skill: Skill) => {
    if (combatTurn !== 'player' || !currentEnemy || player.mana < skill.manaCost) return;

    setPlayer(p => ({ ...p, mana: p.mana - skill.manaCost }));
    audio.playAttack(); // Maybe add specific sound later

    if (skill.type === 'damage') {
      const isCrit = Math.random() < (player.critChance || 0.05);
      const critMultiplier = isCrit ? (player.critDamage || 1.5) : 1;
      const damage = Math.floor(skill.power * (0.8 + Math.random() * 0.4) * critMultiplier);
      addLog(`You cast ${skill.name} dealing ${damage} damage!${isCrit ? ' (CRITICAL)' : ''}`);
      addDamageEvent('enemy', damage, 'spell', isCrit);
      
      const newEnemyHp = currentEnemy.hp - damage;
      if (newEnemyHp <= 0) {
        setCurrentEnemy(e => e ? { ...e, hp: 0 } : null);
        setTimeout(() => endCombat(true), 1200);
        return;
      }
      setCurrentEnemy(e => e ? { ...e, hp: newEnemyHp } : null);
    } else if (skill.type === 'heal') {
      const healAmount = Math.floor(skill.power * (0.9 + Math.random() * 0.2));
      setPlayer(p => ({ ...p, hp: Math.min(p.maxHp, p.hp + healAmount) }));
      addLog(`You cast ${skill.name} and healed for ${healAmount} HP!`);
      addDamageEvent('player', healAmount, 'heal', false);
      audio.playHeal();
    } else if (skill.type === 'lifesteal') {
      const isCrit = Math.random() < (player.critChance || 0.05);
      const critMultiplier = isCrit ? (player.critDamage || 1.5) : 1;
      const damage = Math.floor(skill.power * (0.8 + Math.random() * 0.4) * critMultiplier);
      const healAmount = Math.floor(damage * 0.8);
      addLog(`You cast ${skill.name} dealing ${damage} damage and healing for ${healAmount} HP!${isCrit ? ' (CRITICAL)' : ''}`);
      addDamageEvent('enemy', damage, 'spell', isCrit);
      audio.playHeal();
      
      const newEnemyHp = currentEnemy.hp - damage;
      setPlayer(p => ({ ...p, hp: Math.min(p.maxHp, p.hp + healAmount) }));
      
      if (newEnemyHp <= 0) {
        setCurrentEnemy(e => e ? { ...e, hp: 0 } : null);
        setTimeout(() => endCombat(true), 1200);
        return;
      }
      setCurrentEnemy(e => e ? { ...e, hp: newEnemyHp } : null);
    }
    
    setCombatTurn('enemy');
  }, [combatTurn, currentEnemy, player, endCombat, addLog, addDamageEvent]);

  const selectSkill = useCallback((skill: Skill) => {
    setPlayer(p => ({ ...p, skills: [...p.skills, skill] }));
    addLog(`You learned a new skill: ${skill.name}!`);
    audio.playTreasure();
    setGameState('exploring');
  }, [addLog]);

  const heal = useCallback(() => {
    if (combatTurn !== 'player' || player.potions <= 0) return;
    const healAmount = 50;
    setPlayer(p => ({
      ...p,
      hp: Math.min(p.maxHp, p.hp + healAmount),
      potions: p.potions - 1
    }));
    addLog(`You used a potion and healed for ${healAmount} HP.`);
    audio.playHeal();
    setCombatTurn('enemy');
  }, [combatTurn, player.potions, addLog]);

  const flee = useCallback(() => {
    if (combatTurn !== 'player') return;
    if (Math.random() > 0.4) {
      addLog("You successfully fled the battle!");
      audio.playFlee();
      setTimeout(() => {
        setGameState('exploring');
        setCurrentEnemy(null);
      }, 1000);
    } else {
      addLog("You tried to flee, but failed!");
      setCombatTurn('enemy');
    }
  }, [combatTurn, addLog]);

  // Enemy Turn Effect
  useEffect(() => {
    if (gameState === 'combat' && combatTurn === 'enemy' && currentEnemy && player.hp > 0) {
      const timer = setTimeout(() => {
        const totalDefense = getTotalDefense(player);
        // Boss/enemy crit chance (flat 5% for now)
        const isCrit = Math.random() < 0.05;
        const critMultiplier = isCrit ? 1.5 : 1;
        const damage = Math.max(1, Math.floor((currentEnemy.attack * (0.8 + Math.random() * 0.4) * critMultiplier)) - totalDefense);
        addLog(`The ${currentEnemy.name} attacks you for ${damage} damage!${isCrit ? ' (CRITICAL)' : ''}`);
        audio.playHit();
        addDamageEvent('player', damage, 'attack', isCrit);
        
        setPlayer(p => {
          const newHp = p.hp - damage;
          if (newHp <= 0) {
            setTimeout(() => endCombat(false), 1200);
            return { ...p, hp: 0 };
          }
          return { ...p, hp: newHp };
        });
        setCombatTurn('player');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [combatTurn, gameState, currentEnemy, player, getTotalDefense, endCombat, addLog, addDamageEvent]);

  // Safe zone actions
  const rest = useCallback(() => {
    if (!currentLocation.safeZone) return;
    const cost = 10;
    if (player.gold >= cost && player.hp < player.maxHp) {
      setPlayer(p => ({ ...p, gold: p.gold - cost, hp: p.maxHp }));
      addLog("You rested at the inn. HP fully restored.");
      audio.playHeal();
    } else if (player.hp >= player.maxHp) {
       addLog("You already have full HP.");
    } else {
      addLog("Not enough gold to rest (costs 10).");
    }
  }, [currentLocation.safeZone, player.gold, player.hp, player.maxHp, addLog]);

  const buyPotion = useCallback(() => {
    if (!currentLocation.safeZone) return;
    const cost = 25;
    if (player.gold >= cost) {
      setPlayer(p => ({ ...p, gold: p.gold - cost, potions: p.potions + 1 }));
      addLog("You bought a healing potion.");
      audio.playTreasure();
    } else {
      addLog("Not enough gold for a potion (costs 25).");
    }
  }, [currentLocation.safeZone, player.gold, addLog]);

  const talk = useCallback((npcId: string) => {
    progressQuest('talk', npcId);
    if (npcId === 'elder') {
      addLog("Elder: Welcome, young hero. Your journey begins now.");
    }
  }, [progressQuest, addLog]);

  const buyItem = useCallback((item: Item) => {
    if (!currentLocation.safeZone) return;
    const cost = item.value * 2;
    if (player.gold >= cost) {
      setPlayer(p => ({ ...p, gold: p.gold - cost, inventory: [...p.inventory, item] }));
      addLog(`You bought ${item.name} for ${cost} gold.`);
      audio.playTreasure();
    } else {
      addLog(`Not enough gold for ${item.name} (costs ${cost}).`);
    }
  }, [currentLocation.safeZone, player.gold, addLog]);

  const sellItem = useCallback((item: Item) => {
    if (!currentLocation.safeZone) return;
    setPlayer(p => {
      const idx = p.inventory.findIndex(i => i.id === item.id);
      if (idx === -1) return p;
      const newInventory = [...p.inventory];
      newInventory.splice(idx, 1);
      return { ...p, inventory: newInventory, gold: p.gold + item.value };
    });
    addLog(`You sold ${item.name} for ${item.value} gold.`);
    audio.playTreasure();
  }, [currentLocation.safeZone, addLog]);

  const equipItem = useCallback((itemToEquip: Item, index: number) => {
    setPlayer(p => {
      const actualItem = p.inventory[index];
      if (!actualItem || actualItem.id !== itemToEquip.id) return p; 

      const newInventory = [...p.inventory];
      newInventory.splice(index, 1);

      if (actualItem.type === 'weapon') {
         if (p.equippedWeapon) newInventory.push(p.equippedWeapon);
         return { ...p, inventory: newInventory, equippedWeapon: actualItem };
      } else {
         if (p.equippedArmor) newInventory.push(p.equippedArmor);
         return { ...p, inventory: newInventory, equippedArmor: actualItem };
      }
    });
    addLog(`Equipped ${itemToEquip.name}.`);
    audio.playTreasure();
  }, [addLog]);

  return {
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
    actions: {
      startGame,
      selectRole,
      loadGame,
      travel,
      explore,
      attack,
      useSkill,
      selectSkill,
      heal,
      flee,
      rest,
      buyPotion,
      buyItem,
      sellItem,
      equipItem,
      talk,
      claimQuestReward,
    },
    getTotalAttack,
    getTotalDefense,
  };
}
