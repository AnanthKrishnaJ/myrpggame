import { Enemy, Location, Item, Skill, Quest, Role } from './types';

export const ROLES: Record<string, Role> = {
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    description: 'A resilient combatant with high health and defense.',
    maxHp: 120,
    maxMana: 30,
    baseAttack: 15,
    baseDefense: 8,
    startingEquipment: ['wood_sword', 'leather_armor']
  },
  mage: {
    id: 'mage',
    name: 'Mage',
    description: 'A master of the arcane with high mana and attack power.',
    maxHp: 80,
    maxMana: 100,
    baseAttack: 20,
    baseDefense: 3,
    startingEquipment: [] // Can add staff/robes if needed, empty for now
  },
  rogue: {
    id: 'rogue',
    name: 'Rogue',
    description: 'A swift fighter who balances attack and survivability.',
    maxHp: 95,
    maxMana: 50,
    baseAttack: 18,
    baseDefense: 5,
    startingEquipment: ['wood_sword']
  }
};

export const ITEMS: Record<string, Item> = {
  wood_sword: { id: 'wood_sword', name: 'Wooden Sword', type: 'weapon', attackBonus: 5, defenseBonus: 0, value: 5, rarity: 'common' },
  iron_sword: { id: 'iron_sword', name: 'Iron Sword', type: 'weapon', attackBonus: 12, defenseBonus: 0, value: 25, rarity: 'uncommon' },
  steel_sword: { id: 'steel_sword', name: 'Steel Sword', type: 'weapon', attackBonus: 25, defenseBonus: 0, value: 75, rarity: 'rare' },
  dragon_slayer: { id: 'dragon_slayer', name: 'Dragon Slayer', type: 'weapon', attackBonus: 50, defenseBonus: 0, value: 300, rarity: 'legendary' },
  leather_armor: { id: 'leather_armor', name: 'Leather Armor', type: 'armor', attackBonus: 0, defenseBonus: 5, value: 10, rarity: 'common' },
  iron_armor: { id: 'iron_armor', name: 'Iron Armor', type: 'armor', attackBonus: 0, defenseBonus: 12, value: 40, rarity: 'uncommon' },
  steel_armor: { id: 'steel_armor', name: 'Steel Armor', type: 'armor', attackBonus: 0, defenseBonus: 25, value: 100, rarity: 'rare' },
  dragon_scale: { id: 'dragon_scale', name: 'Dragon Scale Armor', type: 'armor', attackBonus: 0, defenseBonus: 50, value: 500, rarity: 'legendary' },
};

export const SKILLS: Record<string, Skill> = {
  fireball: { id: 'fireball', name: 'Fireball', description: 'Deals heavy magical fire damage.', manaCost: 15, type: 'damage', power: 30 },
  shield_bash: { id: 'shield_bash', name: 'Shield Bash', description: 'A solid bash dealing moderate damage.', manaCost: 10, type: 'damage', power: 15 },
  heal_light: { id: 'heal_light', name: 'Holy Light', description: 'Heals the caster with divine light.', manaCost: 20, type: 'heal', power: 40 },
  thunder_strike: { id: 'thunder_strike', name: 'Thunder Strike', description: 'A devastating bolt of lightning.', manaCost: 25, type: 'damage', power: 45 },
  vampiric_drain: { id: 'vampiric_drain', name: 'Vampiric Drain', description: 'Drains life from the enemy to heal you.', manaCost: 30, type: 'lifesteal', power: 25 },
};

export const ENEMIES: Record<string, Omit<Enemy, 'hp'>> = {
  slime: { id: 'slime', name: 'Forest Slime', maxHp: 30, attack: 8, defense: 2, xpReward: 20, goldReward: 8, drops: [{ itemId: 'wood_sword', chance: 0.1 }, { itemId: 'leather_armor', chance: 0.1 }], avatarUrl: 'https://robohash.org/slime?set=set2' },
  goblin: { id: 'goblin', name: 'Goblin Scout', maxHp: 45, attack: 12, defense: 4, xpReward: 35, goldReward: 12, drops: [{ itemId: 'leather_armor', chance: 0.2 }], avatarUrl: 'https://robohash.org/goblin?set=set2' },
  wolf: { id: 'wolf', name: 'Dire Wolf', maxHp: 65, attack: 18, defense: 6, xpReward: 50, goldReward: 18, drops: [{ itemId: 'iron_sword', chance: 0.1 }], avatarUrl: 'https://robohash.org/wolf?set=set2' },
  skeleton: { id: 'skeleton', name: 'Skeleton Warrior', maxHp: 90, attack: 26, defense: 10, xpReward: 80, goldReward: 28, drops: [{ itemId: 'iron_sword', chance: 0.2 }, { itemId: 'iron_armor', chance: 0.2 }], avatarUrl: 'https://robohash.org/skeleton?set=set2' },
  orc: { id: 'orc', name: 'Orc Berserker', maxHp: 160, attack: 40, defense: 18, xpReward: 150, goldReward: 60, drops: [{ itemId: 'steel_sword', chance: 0.15 }, { itemId: 'steel_armor', chance: 0.15 }], avatarUrl: 'https://robohash.org/orc?set=set2' },
  dragon: { id: 'dragon', name: 'Elder Dragon', maxHp: 500, attack: 75, defense: 35, xpReward: 1000, goldReward: 500, drops: [{ itemId: 'dragon_slayer', chance: 1 }, { itemId: 'dragon_scale', chance: 1 }], avatarUrl: 'https://robohash.org/dragon?set=set2' },
  spider: { id: 'spider', name: 'Giant Spider', maxHp: 55, attack: 14, defense: 4, xpReward: 40, goldReward: 15, drops: [], avatarUrl: 'https://robohash.org/spider?set=set2' },
  bandit: { id: 'bandit', name: 'Bandit Rogue', maxHp: 70, attack: 22, defense: 5, xpReward: 60, goldReward: 45, drops: [{ itemId: 'iron_sword', chance: 0.3 }], avatarUrl: 'https://robohash.org/bandit?set=set2' },
  ghost: { id: 'ghost', name: 'Restless Spirit', maxHp: 80, attack: 24, defense: 12, xpReward: 75, goldReward: 25, drops: [], avatarUrl: 'https://robohash.org/ghost?set=set2' },
  golem: { id: 'golem', name: 'Stone Golem', maxHp: 200, attack: 20, defense: 30, xpReward: 180, goldReward: 50, drops: [{ itemId: 'steel_armor', chance: 0.2 }], avatarUrl: 'https://robohash.org/golem?set=set2' },
  vampire: { id: 'vampire', name: 'Vampire Lord', maxHp: 250, attack: 45, defense: 20, xpReward: 300, goldReward: 150, drops: [{ itemId: 'steel_sword', chance: 0.5 }], avatarUrl: 'https://robohash.org/vampire?set=set2' },
  troll: { id: 'troll', name: 'Cave Troll', maxHp: 180, attack: 35, defense: 15, xpReward: 160, goldReward: 80, drops: [{ itemId: 'iron_armor', chance: 0.4 }], avatarUrl: 'https://robohash.org/troll?set=set2' },
  wyvern: { id: 'wyvern', name: 'Poison Wyvern', maxHp: 280, attack: 50, defense: 22, xpReward: 350, goldReward: 200, drops: [{ itemId: 'dragon_scale', chance: 0.2 }], avatarUrl: 'https://robohash.org/wyvern?set=set2' },
  lich: { id: 'lich', name: 'Undead Lich', maxHp: 350, attack: 60, defense: 25, xpReward: 500, goldReward: 300, drops: [{ itemId: 'steel_armor', chance: 0.8 }], avatarUrl: 'https://robohash.org/lich?set=set2' },
  demon: { id: 'demon', name: 'Abyssal Demon', maxHp: 450, attack: 70, defense: 30, xpReward: 800, goldReward: 400, drops: [{ itemId: 'dragon_slayer', chance: 0.5 }], avatarUrl: 'https://robohash.org/demon?set=set2' },
  mimic: { id: 'mimic', name: 'Treasure Mimic', maxHp: 120, attack: 30, defense: 15, xpReward: 100, goldReward: 250, drops: [{ itemId: 'steel_sword', chance: 0.5 }], avatarUrl: 'https://robohash.org/mimic?set=set2' },
  cerberus: { id: 'cerberus', name: 'Cerberus', maxHp: 600, attack: 85, defense: 40, xpReward: 1200, goldReward: 600, drops: [{ itemId: 'dragon_scale', chance: 0.5 }], avatarUrl: 'https://robohash.org/cerberus?set=set2' },
  kraken: { id: 'kraken', name: 'Deep Sea Kraken', maxHp: 800, attack: 100, defense: 50, xpReward: 2000, goldReward: 1000, drops: [{ itemId: 'dragon_slayer', chance: 0.8 }], avatarUrl: 'https://robohash.org/kraken?set=set2' },
  siren: { id: 'siren', name: 'Siren', maxHp: 150, attack: 55, defense: 10, xpReward: 200, goldReward: 100, drops: [], avatarUrl: 'https://robohash.org/siren?set=set2' },
  cyclops: { id: 'cyclops', name: 'Cyclops', maxHp: 300, attack: 65, defense: 25, xpReward: 400, goldReward: 200, drops: [{ itemId: 'steel_armor', chance: 0.4 }], avatarUrl: 'https://robohash.org/cyclops?set=set2' },
  minotaur: { id: 'minotaur', name: 'Minotaur', maxHp: 400, attack: 75, defense: 30, xpReward: 600, goldReward: 300, drops: [{ itemId: 'steel_sword', chance: 0.6 }], avatarUrl: 'https://robohash.org/minotaur?set=set2' },
  yay: { id: 'yay', name: 'Yay (Final Boss)', maxHp: 5000, attack: 250, defense: 150, xpReward: 10000, goldReward: 5000, drops: [{ itemId: 'dragon_slayer', chance: 1 }, { itemId: 'dragon_scale', chance: 1 }], avatarUrl: 'https://robohash.org/yay?set=set2' },
};

export const LOCATIONS: Location[] = [
  {
    id: 'village',
    name: 'Oakhaven Village',
    description: 'A peaceful settlement where adventurers rest and resupply.',
    levelReq: 1,
    safeZone: true,
    enemies: []
  },
  {
    id: 'forest',
    name: 'Whispering Woods',
    description: 'A dense, ancient forest teeming with wild beasts and low-level monsters.',
    levelReq: 1,
    safeZone: false,
    enemies: ['slime', 'goblin', 'wolf', 'spider']
  },
  {
    id: 'cave',
    name: 'Echoing Caves',
    description: 'Dark, damp caverns hiding dangerous undead and rich ores.',
    levelReq: 3,
    safeZone: false,
    enemies: ['goblin', 'skeleton', 'orc', 'spider', 'bandit']
  },
  {
    id: 'ruins',
    name: 'Forgotten Ruins',
    description: 'Ancient ruins inhabited by restless spirits and golems.',
    levelReq: 5,
    safeZone: false,
    enemies: ['ghost', 'golem', 'mimic']
  },
  {
    id: 'swamp',
    name: 'Poisonous Swamp',
    description: 'A toxic wasteland where trolls and wyverns roam.',
    levelReq: 8,
    safeZone: false,
    enemies: ['troll', 'wyvern']
  },
  {
    id: 'castle',
    name: 'Vampire Castle',
    description: 'A cursed castle ruled by a powerful vampire lord.',
    levelReq: 10,
    safeZone: false,
    enemies: ['vampire', 'lich', 'skeleton']
  },
  {
    id: 'abyss',
    name: 'The Abyss',
    description: 'A deep chasm connected to the underworld.',
    levelReq: 13,
    safeZone: false,
    enemies: ['demon', 'lich']
  },
  {
    id: 'mountain',
    name: 'Dragon Peak',
    description: 'The treacherous summit where a legendary beast is said to slumber.',
    levelReq: 15,
    safeZone: false,
    enemies: ['orc', 'dragon', 'wyvern']
  },
  {
    id: 'desert',
    name: 'Scorching Desert',
    description: 'A vast, unforgiving desert filled with dangerous creatures.',
    levelReq: 10,
    safeZone: false,
    enemies: ['cyclops', 'golem', 'spider']
  },
  {
    id: 'labyrinth',
    name: 'Ancient Labyrinth',
    description: 'A confusing maze of corridors guarding ancient secrets.',
    levelReq: 15,
    safeZone: false,
    enemies: ['minotaur', 'skeleton', 'mimic']
  },
  {
    id: 'frozen_peaks',
    name: 'Frozen Peaks',
    description: 'High altitude frozen mountains where only the strong survive.',
    levelReq: 18,
    safeZone: false,
    enemies: ['troll', 'cyclops']
  },
  {
    id: 'volcano',
    name: 'Infernal Volcano',
    description: 'A river of magma that serves as the domain of fiery beasts.',
    levelReq: 20,
    safeZone: false,
    enemies: ['demon', 'cerberus', 'dragon']
  },
  {
    id: 'floating_islands',
    name: 'Floating Islands',
    description: 'Mystical islands suspended in the sky by powerful magic.',
    levelReq: 22,
    safeZone: false,
    enemies: ['wyvern', 'siren']
  },
  {
    id: 'ocean_depths',
    name: 'Ocean Depths',
    description: 'The dark, crushing depths of the abyssal sea.',
    levelReq: 25,
    safeZone: false,
    enemies: ['kraken', 'siren']
  },
  {
    id: 'final_realm',
    name: 'The Final Realm',
    description: 'The edge of existence where the ultimate boss Yay awaits.',
    levelReq: 30,
    safeZone: false,
    enemies: ['yay']
  }
];

export const QUESTS: Quest[] = [
  {
    id: 'q_elder_call',
    title: "The Elder's Call",
    description: 'Meet the village elder in Oakhaven to receive your first assignment.',
    objectives: [
      { type: 'talk', target: 'elder', requiredCount: 1, currentCount: 0, description: 'Talk to the Elder in Oakhaven' }
    ],
    rewards: { gold: 100, xp: 50, items: [ITEMS['iron_sword']] },
    status: 'active'
  },
  {
    id: 'q_slime_hunter',
    title: "Slime Hunter",
    description: 'The Whispering Woods are infested with slimes. Thin their numbers.',
    objectives: [
      { type: 'kill', target: 'slime', requiredCount: 3, currentCount: 0, description: 'Defeat 3 Forest Slimes' }
    ],
    rewards: { gold: 50, xp: 100 },
    status: 'active'
  },
  {
    id: 'q_dragon_slayer',
    title: "Slay the Dragon",
    description: 'Defeat the Elder Dragon at Dragon Peak to save the realm.',
    objectives: [
      { type: 'kill', target: 'dragon', requiredCount: 1, currentCount: 0, description: 'Slay the Elder Dragon' }
    ],
    rewards: { gold: 5000, xp: 2000 },
    status: 'active'
  }
];
