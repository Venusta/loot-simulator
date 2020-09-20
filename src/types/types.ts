export interface CharacterSkill {
  exp: number;
  level: number;
  boost: number;
}

export interface CharacterSkills {
  attack: CharacterSkill;
  defence: CharacterSkill;
  strength: CharacterSkill;
  hitpoints: CharacterSkill;
  ranged: CharacterSkill;
  prayer: CharacterSkill;
  magic: CharacterSkill;
  cooking: CharacterSkill;
  woodcutting: CharacterSkill;
  fletching: CharacterSkill;
  fishing: CharacterSkill;
  firemaking: CharacterSkill;
  crafting: CharacterSkill;
  smithing: CharacterSkill;
  mining: CharacterSkill;
  herblore: CharacterSkill;
  agility: CharacterSkill;
  thieving: CharacterSkill;
  slayer: CharacterSkill;
  farming: CharacterSkill;
  runecrafting: CharacterSkill;
  hunter: CharacterSkill;
  construction: CharacterSkill;
}

export interface TaskInputOptions {
  characterId: string;
  taskName: string;
  amount: number;
}

export interface CharacterState {
  name: string;
  skills: CharacterSkills;
  equipment: EquipmentSlots;
  bank: ItemData[];
}

export type ItemData = {
  item: number;
  amount: number;
  placeholder?: boolean;
};

export type SkillData = {
  skill: SkillName;
  level: number;
};

export type ExpReward = {
  skill: SkillName;
  amount: number;
};
// Same types but still worth having them with different names
// since the "number" isn't the same in both (level vs xp)
export type SkillMap = Map<SkillName, number>;
export type ExpMap = Map<SkillName, number>;
export type ItemMap = Map<number, number>;

export interface TaskRewardMap {
  exp: ExpMap;
  items: ItemMap;
}
export interface TaskReward {
  exp: ExpReward[];
  items: ItemData[];
}

export interface TaskFailMap {
  items: ItemMap;
}

export interface TaskEquipmentData extends ItemData {
  slot: EquipmentSlotName;
}

export interface TaskRequirements {
  // skills: SkillData[]
  skills: SkillMap;
  items: ItemMap;
  equipment: TaskEquipmentData[];
}

export interface TaskOptions {
  name: string;
  requirements: TaskRequirements;
  rewards: TaskRewardMap;
  duration: number;
  fails: TaskFailMap;
  icon: number;
}

export interface CookingTask extends TaskOptions {
  stopBurnLevel: number;
  stopBurnGauntlets: number;
}

export interface FishingTask extends TaskOptions {
  weight1: number;
  weight99: number;
}

export interface MonsterOptions {
  id: number;
  name: string;
}

export enum MonsterAttribute {
  Demon = "demon",
  Dragon = "dragon",
  Fiery = "fiery",
  Kalphite = "kalphite",
  Leafy = "leafy",
  Penance = "penance",
  Shade = "shade",
  Undead = "undead",
  Vampyre = "vampyre",
  Xerician = "xerician"
}

export enum MonsterSlayerMaster {
  Turael = "turael",
  Krystilia = "krystilia",
  Mazchna = "mazchna",
  Vannaka = "vannaka",
  Chaeldar = "chaeldar",
  Konar = "konar",
  Nieve = "nieve",
  Duradel = "duradel"
}

export interface MonsterData {
  combatLevel: number;
  hitpoints: number;
  attackType: AttackType[];
  attackSpeed: number;
  attributes: MonsterAttribute[];
  category: string[];
  attackLevel: number;
  strengthLevel: number;
  defenceLevel: number;
  magicLevel: number;
  rangedLevel: number;
  attackStab: number;
  attackSlash: number;
  attackCrush: number;
  attackMagic: number;
  attackRanged: number;
  defenceStab: number;
  defenceSlash: number;
  defenceCrush: number;
  defenceMagic: number;
  defenceRanged: number;
  attackAccuracy: number;
  meleeStrength: number;
  rangedStrength: number;
  magicDamage: number;
  slayerLevelRequired: number;
  slayerXP: number;
}

export type SkillName = "attack" |
"defence" |
"strength" |
"hitpoints" |
"ranged" |
"prayer" |
"magic" |
"cooking" |
"woodcutting" |
"fletching" |
"fishing" |
"firemaking" |
"crafting" |
"smithing" |
"mining" |
"herblore" |
"agility" |
"thieving" |
"slayer" |
"farming" |
"runecrafting" |
"hunter" |
"construction";

export type EquipmentSlotName = "head" |
"body" |
"legs" |
"feet" |
"hands" |
"cape" |
"weapon" |
"shield" |
"ammo" |
"ring" |
"neck";

// export interface SkillStats {
//   level: number;
//   exp: number;
//   boost: number
// }

// export interface SkillsStats {
//   attack: SkillStats;
//   defence: SkillStats;
//   strength: SkillStats;
//   hitpoints: SkillStats;
//   ranged: SkillStats;
//   prayer: SkillStats;
//   magic: SkillStats;
//   cooking: SkillStats;
//   woodcutting: SkillStats;
//   fletching: SkillStats;
//   fishing: SkillStats;
//   firemaking: SkillStats;
//   crafting: SkillStats;
//   smithing: SkillStats;
//   mining: SkillStats;
//   herblore: SkillStats;
//   agility: SkillStats;
//   thieving: SkillStats;
//   slayer: SkillStats;
//   farming: SkillStats;
//   runecrafting: SkillStats;
//   hunter: SkillStats;
//   construction: SkillStats;
// }

export interface EquipmentSlots {
  head: number;
  body: number;
  legs: number;
  feet: number;
  hands: number;
  cape: number;
  weapon: number;
  shield: number;
  ammo: number;
  ring: number;
  neck: number;
}

export enum EquipmentSlotNames {
  head = "head",
  body = "body",
  legs = "legs",
  feet = "feet",
  hands = "hands",
  cape = "cape",
  weapon = "weapon",
  shield = "shield",
  ammo = "ammo",
  ring = "ring",
  neck = "neck"
}

// export interface CompleteItemData {
//   "id": number;
//   "name": string;
//   "incomplete": boolean;
//   "members": boolean;
//   "tradeable": boolean;
//   "tradeable_on_ge": boolean;
//   "stackable": boolean;
//   "stacked": null;
//   "noted": boolean;
//   "noteable": boolean;
//   "linked_id_item": number | null;
//   "linked_id_noted": number | null;
//   "linked_id_placeholder": number | null;
//   "placeholder": boolean;
//   "equipable": boolean;
//   "equipable_by_player": boolean;
//   "equipable_weapon": boolean;
//   "cost": number;
//   "lowalch": number | null;
//   "highalch": number | null;
//   "weight": number;
//   "buy_limit": number | null;
//   "quest_item": boolean;
//   "release_date": string;
//   "duplicate": boolean;
//   "examine": string;
//   "icon": string;
//   "wiki_name": string;
//   "wiki_url": string;
//   "wiki_exchange": string | null;
//   "equipment": EquipmentData | null;
//   "weapon": WeaponData | null;
// }

export interface EquipmentData {
  "attack_stab": number;
  "attack_slash": number;
  "attack_crush": number;
  "attack_magic": number;
  "attack_ranged": number;
  "defence_stab": number;
  "defence_slash": number;
  "defence_crush": number;
  "defence_magic": number;
  "defence_ranged": number;
  "melee_strength": number;
  "ranged_strength": number;
  "magic_damage": number;
  "prayer": number;
  "slot": EquipmentSlotNames;
  "requirements": EquipableRequirements | null;
}

export interface EquipableRequirements {
  attack?: number;
  strength?: number;
  defence?: number;
  ranged?: number;
  magic?: number;
  prayer?: number;
}

// export interface WeaponData {
//   "attack_speed": number;
//   "weapon_type": string;
//   "stances": WeaponStance[];
// }

// export interface WeaponStance {
//   "combat_style": string;
//   "attack_type": AttackType | null;
//   "attack_style": AttackStyle | null;
//   "experience": string;
//   "boosts": string | null;
// }

export enum AttackStyle {
  aggressive = "aggressive",
  accurate = "accurate",
  controlled = "controlled",
  defensive = "defensive",
  rapid = "rapid",
  longrange = "longrange",
}

export enum AttackType {
  Stab = "stab",
  Slash = "slash",
  Crush = "crush",
  Magic = "magic",
  Ranged = "ranged",
  Melee = "melee",
}

export interface EquipmentBonuses {
  "attack_stab": number;
  "attack_slash": number;
  "attack_crush": number;
  "attack_magic": number;
  "attack_ranged": number;
  "defence_stab": number;
  "defence_slash": number;
  "defence_crush": number;
  "defence_magic": number;
  "defence_ranged": number;
  "melee_strength": number;
  "ranged_strength": number;
  "magic_damage": number;
  "prayer": number;
}

export type StyleExperience = "shared" |
"ranged and defence" |
"magic and defence" |
SkillName;
