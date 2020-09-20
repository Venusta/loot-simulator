/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { store } from "../app/store";
import {
  AttackStyle, AttackType, EquipmentSlots, EquipmentBonuses, StyleExperience, TaskReward, CharacterSkills,
} from "../types/types";
import { Monster } from "./Monster";
import { getRandomInt } from "../util";
import { Equipment } from "./Equipment";

type EffectiveLevels = {
  attack: number;
  strength: number;
  defence: number;
  ranged: number;
  magic: number;
};

export interface CombatStats {
  attack: number;
  defence: number;
  strength: number;
  ranged: number;
  prayer?: number;
  magic: number;
}

interface CombatBonuses {
  characterStrengthBonus: number;
  characterAttackBonus: number;
  characterDefenceBonus: number;
  monsterStrengthBonus: number;
  monsterAttackBonus: number;
  monsterDefenceBonus: number;
}

const addAttackStance = (attackStyle: AttackStyle, attackType: AttackType, combatStats: EffectiveLevels) => {
  let {
    attack, strength, defence, ranged,
  } = combatStats;

  if (attackType === AttackType.Ranged) {
    // Using ranged
    switch (attackStyle) {
      case AttackStyle.accurate:
        ranged += 3;
        break;
      case AttackStyle.longrange:
        defence += 3;
        break;
      default:
        break;
    }
  } else if (attackType === AttackType.Magic) {
    // Using magic
    // TODO: actually check if weapon is trident
  } else {
    // Using melee
    switch (attackStyle) {
      case AttackStyle.accurate:
        attack += 3;
        break;
      case AttackStyle.controlled:
        attack += 1;
        strength += 1;
        defence += 1;
        break;
      case AttackStyle.aggressive:
        strength += 3;
        break;
      default:
        break;
    }
  }
  return {
    ...combatStats, attack, strength, defence, ranged,
  };
};

const addToEffectiveLevels = (characterEffectiveLevels: EffectiveLevels, amount = 0) => {
  return Object.entries(characterEffectiveLevels).reduce((accum, [key, value]) => {
    if (key === "hitpoints") {
      return { ...accum, [key]: value };
    }
    return { ...accum, [key]: value + amount };
  }, {}) as EffectiveLevels;
}; // todo probably try use Map

const getBoostedCombatStats = (stats: CharacterSkills): CombatStats => {
  return {
    attack: stats.attack.level + stats.attack.boost,
    defence: stats.defence.level + stats.defence.boost,
    strength: stats.strength.level + stats.strength.boost,
    ranged: stats.ranged.level + stats.ranged.boost,
    prayer: stats.prayer.level + stats.prayer.boost,
    magic: stats.magic.level + stats.magic.boost,
  };
};

export class CombatSimulator {
  private monster: Monster;
  private timeLimit = 6000;
  private supplies: any;
  private attackStyle: AttackStyle;
  private attackType: AttackType;
  private styleExperience: StyleExperience;
  private attackSpeed: number;
  private skills: CharacterSkills;
  private equipment: EquipmentSlots;

  constructor(
    monster: Monster,
    characterId: string,
    attackStyle: AttackStyle,
    supplies: any,
  ) {
    this.skills = store.getState().characters.skills[characterId];
    this.equipment = store.getState().characters.equipment[characterId];
    this.supplies = supplies;

    const equipment = new Equipment(this.equipment);
    this.attackStyle = attackStyle;
    const attackTypeAndExperience = equipment.getAttackTypeAndExperience(this.attackStyle);
    this.attackType = attackTypeAndExperience.attackType;
    this.styleExperience = attackTypeAndExperience.styleExperience;
    this.attackSpeed = equipment.getAttackSpeed(this.attackStyle);

    this.monster = monster; // getMonsterByID(monsterID)
  }

  private calculateAccuracy = (
    maxAttackRoll: number,
    maxDefenceRoll: number,
  ): number => {
    if (maxAttackRoll > maxDefenceRoll) {
      return 1 - (maxDefenceRoll + 2) / (2 * (maxAttackRoll + 1));
    }
    return maxAttackRoll / (2 * maxDefenceRoll + 1);
  };

  private calculateMaxRoll = (effectiveLevel: number, equipmentbonus: number): number => {
    return effectiveLevel * (equipmentbonus + 64);
  };

  private calculateMaxHit = (effectiveLevel: number, equipmentBonus: number) => {
    return Math.floor(0.5 + (effectiveLevel * (equipmentBonus + 64)) / 640);
  };

  public calculateEffectiveLevelsCharacter = (): EffectiveLevels => {
    const boostedCombatStats = getBoostedCombatStats(this.skills);
    console.log(boostedCombatStats);

    // TODO: Handle prayer bonus here

    let characterEffectiveLevels = addAttackStance(this.attackStyle, this.attackType, boostedCombatStats);
    console.log(characterEffectiveLevels);

    characterEffectiveLevels = addToEffectiveLevels(characterEffectiveLevels, 8);
    console.log(characterEffectiveLevels);

    // TODO: Handle set bonuses here

    return characterEffectiveLevels;
  };

  private calculateEffectiveLevelsMonster = (): EffectiveLevels => {
    // Obtain monster stats
    const {
      attackLevel: monsterAttack,
      strengthLevel: monsterStrength,
      defenceLevel: monsterDefence,
      rangedLevel: monsterRanged,
      magicLevel: monsterMagic,
    } = this.monster.data;

    // Calculate monster effective levels (+1 attack style bonus and +8 for reasons)
    const monsterEffectiveLevels = {
      attack: monsterAttack + 9,
      strength: monsterStrength + 9,
      defence: monsterDefence + 9,
      ranged: monsterRanged + 9,
      magic: monsterMagic + 9,
    };

    return monsterEffectiveLevels;
  };

  private rollHit = (accuracy: number, maxHit: number) => {
    const roll = Math.random();
    if (roll < accuracy) {
      return getRandomInt(0, maxHit);
    }
    return 0;
  };

  private getRelevantCombatBonuses = (characterAttackType: AttackType, monsterAttackType: AttackType, equipmentBonuses: EquipmentBonuses): CombatBonuses => {
    const combatBonuses = {
      characterStrengthBonus: 0,
      characterAttackBonus: 0,
      characterDefenceBonus: 0,
      monsterStrengthBonus: 0,
      monsterAttackBonus: 0,
      monsterDefenceBonus: 0,
    };

    // Figure out character attack & strength bonus and monster defence bonus based on character attack type
    switch (characterAttackType) {
      case AttackType.Ranged:
        combatBonuses.characterAttackBonus = equipmentBonuses.attack_ranged;
        combatBonuses.characterStrengthBonus = equipmentBonuses.ranged_strength;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceRanged;
        break;
      case AttackType.Magic:
        combatBonuses.characterAttackBonus = equipmentBonuses.attack_magic;
        combatBonuses.characterStrengthBonus = equipmentBonuses.magic_damage;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceMagic;
        break;
      case AttackType.Crush:
        combatBonuses.characterAttackBonus = equipmentBonuses.attack_crush;
        combatBonuses.characterStrengthBonus = equipmentBonuses.melee_strength;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceCrush;
        break;
      case AttackType.Slash:
        combatBonuses.characterAttackBonus = equipmentBonuses.attack_slash;
        combatBonuses.characterStrengthBonus = equipmentBonuses.melee_strength;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceSlash;
        break;
      case AttackType.Stab:
        combatBonuses.characterAttackBonus = equipmentBonuses.attack_stab;
        combatBonuses.characterStrengthBonus = equipmentBonuses.melee_strength;
        combatBonuses.monsterDefenceBonus = this.monster.data.defenceStab;
        break;
      default:
        break;
    }

    // Figure out monster attack bonus and character defence bonus based on monster attack type
    switch (monsterAttackType) {
      case AttackType.Ranged:
        combatBonuses.monsterStrengthBonus = this.monster.data.rangedStrength;
        combatBonuses.monsterAttackBonus = this.monster.data.attackRanged;
        combatBonuses.characterDefenceBonus = equipmentBonuses.defence_ranged;
        break;
      case AttackType.Magic:
        combatBonuses.monsterStrengthBonus = this.monster.data.magicDamage; // ?? not sure if this is correct
        combatBonuses.monsterAttackBonus = this.monster.data.attackMagic;
        combatBonuses.characterDefenceBonus = equipmentBonuses.defence_magic;
        break;
      case AttackType.Crush:
        combatBonuses.monsterStrengthBonus = this.monster.data.meleeStrength;
        combatBonuses.monsterAttackBonus = this.monster.data.attackCrush;
        combatBonuses.characterDefenceBonus = equipmentBonuses.defence_crush;
        break;
      case AttackType.Slash:
        combatBonuses.monsterStrengthBonus = this.monster.data.meleeStrength;
        combatBonuses.monsterAttackBonus = this.monster.data.attackSlash;
        combatBonuses.characterDefenceBonus = equipmentBonuses.defence_slash;
        break;
      case AttackType.Stab:
        combatBonuses.monsterStrengthBonus = this.monster.data.meleeStrength;
        combatBonuses.monsterAttackBonus = this.monster.data.attackStab;
        combatBonuses.characterDefenceBonus = equipmentBonuses.defence_stab;
        break;
      default:
        // So we need to think about what to do when monster attack type is 'melee'
        // I guess just default to slash for now, probably fine forever tbh
        combatBonuses.monsterStrengthBonus = this.monster.data.meleeStrength;
        combatBonuses.monsterAttackBonus = this.monster.data.attackSlash;
        combatBonuses.characterDefenceBonus = equipmentBonuses.defence_slash;
        break;
    }

    return combatBonuses;
  };

  private getDamageAndAccuracyLevels = (characterAttackType: AttackType, characterEffectiveLevels: EffectiveLevels): { damage: number; accuracy: number } => {
    const relevantDamageAndAccuracyLevels = {
      damage: 0,
      accuracy: 0,
    };

    switch (characterAttackType) {
      case AttackType.Ranged:
        // Ranged: accuracy and damage both scale with the character's ranged level
        relevantDamageAndAccuracyLevels.damage = characterEffectiveLevels.ranged;
        relevantDamageAndAccuracyLevels.accuracy = characterEffectiveLevels.ranged;
        break;
      case AttackType.Magic:
        // Magic: accuracy and damage both scale with the character's magic level (probably only for fucking trident)
        relevantDamageAndAccuracyLevels.damage = characterEffectiveLevels.magic;
        relevantDamageAndAccuracyLevels.accuracy = characterEffectiveLevels.magic;
        break;
      default:
        // Melee: accuracy scales with character's attack level, damage with character's strength level
        relevantDamageAndAccuracyLevels.damage = characterEffectiveLevels.strength;
        relevantDamageAndAccuracyLevels.accuracy = characterEffectiveLevels.attack;
        break;
    }

    return relevantDamageAndAccuracyLevels;
  };

  public simulate = ({ duration, kills }: { duration?: number; kills?: number}): { killcount: number; rewards: TaskReward; ticks: number } => {
    const characterEffectiveLevels = this.calculateEffectiveLevelsCharacter();
    const monsterEffectiveLevels = this.calculateEffectiveLevelsMonster();

    const {
      damage: characterEffectiveDamageLevel,
      accuracy: characterEffectiveAccuracyLevel,
    } = this.getDamageAndAccuracyLevels(this.attackType, characterEffectiveLevels);

    const {
      damage: monsterEffectiveDamageLevel,
      accuracy: monsterEffectiveAccuracyLevel,
    } = this.getDamageAndAccuracyLevels(this.monster.data.attackType[0], monsterEffectiveLevels);

    const characterEquipmentBonuses = new Equipment(this.equipment).equipmentBonuses;

    const {
      characterStrengthBonus,
      characterAttackBonus,
      characterDefenceBonus,
      monsterStrengthBonus,
      monsterAttackBonus,
      monsterDefenceBonus,
    } = this.getRelevantCombatBonuses(this.attackType, this.monster.data.attackType[0], characterEquipmentBonuses);

    const monsterMaxAttackRoll = this.calculateMaxRoll(monsterEffectiveAccuracyLevel, monsterAttackBonus);
    const monsterMaxDefenceRoll = this.calculateMaxRoll(monsterEffectiveLevels.defence, monsterDefenceBonus);
    const characterMaxAttackRoll = this.calculateMaxRoll(characterEffectiveAccuracyLevel, characterAttackBonus);
    const characterMaxDefenceRoll = this.calculateMaxRoll(characterEffectiveLevels.defence, characterDefenceBonus);

    const characterMaxHit = this.calculateMaxHit(characterEffectiveDamageLevel, characterStrengthBonus);
    const monsterCalculatedMaxHit = this.calculateMaxHit(monsterEffectiveDamageLevel, monsterStrengthBonus);
    const monsterMaxHit = 11; // todo calc max hit

    console.log(`Character max hit: ${characterMaxHit}`);
    console.log(`Monster max hit: ${monsterMaxHit}`);
    console.log(`Monster calculated max hit: ${monsterCalculatedMaxHit}`);

    const monsterAccuracy = this.calculateAccuracy(monsterMaxAttackRoll, characterMaxDefenceRoll);
    const characterAccuracy = this.calculateAccuracy(characterMaxAttackRoll, monsterMaxDefenceRoll);

    console.log(`Character accuracy: ${characterAccuracy}`);
    console.log(`Monster accuracy: ${monsterAccuracy}`);

    let characterHitpoints = this.skills.hitpoints.level + this.skills.hitpoints.boost;
    let monsterHitpoints = this.monster.data.hitpoints;
    let killcount = 0;
    let ticks = 0; // In in-game ticks (0.6s per tick)
    let characterAttackCountdown = 0;
    let monsterAttackCountdown = 2;
    const characterEatThreshold = characterHitpoints - 20 - this.skills.hitpoints.boost; // TODO: determine number from how much the food heals

    while (true) {
      if (ticks > this.timeLimit || (duration !== undefined && ticks > duration)) {
        console.log("Time limit reached, returning early.");
        break;
      }

      if (characterHitpoints < characterEatThreshold) {
        characterHitpoints += 20; // TODO: replace 20 with actual healing value of food in this.supplies
        // remove 1 food from supplies
        characterAttackCountdown += 3; // 3 tick delay after eating food
      }

      if (characterAttackCountdown <= 0) {
        monsterHitpoints -= this.rollHit(characterAccuracy, characterMaxHit);
        if (monsterHitpoints <= 0) {
          // ded monster
          killcount += 1;
          if (kills !== undefined && killcount >= kills) {
            console.log("Kill amount reached, returning.");
            break;
          }
          monsterHitpoints = this.monster.data.hitpoints;
        }
        characterAttackCountdown = this.attackSpeed;
      }

      if (monsterAttackCountdown <= 0) {
        characterHitpoints -= this.rollHit(monsterAccuracy, monsterMaxHit);
        if (characterHitpoints <= 0) {
          // ded character
          console.log("Character died, returning.");
          break;
        }
        monsterAttackCountdown = this.monster.data.attackSpeed;
      }

      // Increment time counter by one tick
      ticks += 1;

      // Decrement attack cooldown counters
      characterAttackCountdown -= 1;
      monsterAttackCountdown -= 1;
    }

    const rewards = {
      exp: this.monster.getExperience(killcount, this.styleExperience),
      items: this.monster.kill(killcount),
    };

    console.log(`Trip results: ${killcount} kills in ${Math.round(ticks * 0.6)} second(s).`);

    return { killcount, rewards, ticks };
  };
}
