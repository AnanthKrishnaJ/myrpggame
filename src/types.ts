export interface DamageEvent {
  id: string;
  target: 'player' | 'enemy';
  amount: number;
  isCrit?: boolean;
  type?: 'attack' | 'spell' | 'heal' | 'poison';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  maxHp: number;
  maxMana: number;
  baseAttack: number;
  baseDefense: number;
  startingEquipment: string[]; // item IDs
}

export type GameState = 'menu' | 'role_selection' | 'exploring' | 'combat' | 'gameover' | 'victory' | 'level_up';

export type ItemType = 'weapon' | 'armor' | 'helmet' | 'boots' | 'gloves' | 'ring' | 'necklace' | 'shield' | 'artifact' | 'pet' | 'mount';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  attackBonus: number;
  defenseBonus: number;
  value: number;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  manaCost: number;
  type: 'damage' | 'heal' | 'lifesteal' | 'buff';
  power: number;
  reqLevel?: number;
  locked?: boolean;
}

export interface QuestObjective {
  type: 'kill' | 'explore' | 'collect' | 'talk';
  target: string;
  requiredCount: number;
  currentCount: number;
  description: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  objectives: QuestObjective[];
  rewards: {
    xp?: number;
    gold?: number;
    items?: Item[];
  };
  status: 'active' | 'completed' | 'turned_in';
}

export interface StatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff';
  icon: string;
  duration: number;
  description: string;
}

export interface Player {
  name: string;
  maxHp: number;
  hp: number;
  maxMana: number;
  mana: number;
  level: number;
  xp: number;
  gold: number;
  baseAttack: number;
  baseDefense: number;
  potions: number;
  inventory: Item[];
  equippedWeapon: Item | null;
  equippedArmor: Item | null;
  equippedHelmet?: Item | null;
  equippedBoots?: Item | null;
  equippedGloves?: Item | null;
  equippedRing?: Item | null;
  equippedNecklace?: Item | null;
  equippedShield?: Item | null;
  equippedArtifact?: Item | null;
  equippedPet?: Item | null;
  equippedMount?: Item | null;
  skills: Skill[];
  critChance?: number;
  critDamage?: number;
  speed?: number;
  magicAttack?: number;
  magicDefense?: number;
  stamina?: number;
  luck?: number;
  accuracy?: number;
  evasion?: number;
  quests: Quest[];
  statusEffects?: StatusEffect[];
}

export interface Enemy {
  id: string;
  name: string;
  maxHp: number;
  hp: number;
  attack: number;
  defense: number;
  xpReward: number;
  goldReward: number;
  drops?: { itemId: string; chance: number }[];
  statusEffects?: StatusEffect[];
  avatarUrl?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  levelReq: number;
  safeZone: boolean;
  enemies: string[];
}
