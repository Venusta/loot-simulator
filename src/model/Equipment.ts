/* eslint-disable max-len */
import {
  EquipmentData, EquipableRequirements, EquipmentSlots, EquipmentBonuses,
  EquipmentSlotNames, AttackType, AttackStyle, StyleExperience,
} from "../types/types";
import rawBodySlotData from "../assets/mini-items-json-slot/mini-items-body.json";
import rawAmmoSlotData from "../assets/mini-items-json-slot/mini-items-ammo.json";
import rawCapeSlotData from "../assets/mini-items-json-slot/mini-items-cape.json";
import rawFeetSlotData from "../assets/mini-items-json-slot/mini-items-feet.json";
import rawHandsSlotData from "../assets/mini-items-json-slot/mini-items-hands.json";
import rawHeadSlotData from "../assets/mini-items-json-slot/mini-items-head.json";
import rawLegsSlotData from "../assets/mini-items-json-slot/mini-items-legs.json";
import rawNeckSlotData from "../assets/mini-items-json-slot/mini-items-neck.json";
import rawRingSlotData from "../assets/mini-items-json-slot/mini-items-ring.json";
import rawShieldSlotData from "../assets/mini-items-json-slot/mini-items-shield.json";
import rawWeaponSlotData from "../assets/mini-items-json-slot/mini-items-weapon.json";
import rawTwoHandedSlotData from "../assets/mini-items-json-slot/mini-items-2h.json";
import rawStanceData from "../assets/weapon-stances.json";

interface MinifiedWeaponData {
  "attack_speed": number;
  "weapon_type": string;
}

interface MinifiedItemData {
  "id": number;
  "name": string;
  "weight": number;
  "equipment": EquipmentData | null;
  "weapon": MinifiedWeaponData | null;
}

interface WeaponStance {
  "combat_style": string;
  "attack_type": AttackType | null;
  "attack_style": AttackStyle | null;
  "experience": StyleExperience | null;
  "boosts": string | null;
}

const bodySlotData = rawBodySlotData as { [id: string]: MinifiedItemData };
const ammoSlotData = rawAmmoSlotData as { [id: string]: MinifiedItemData };
const capeSlotData = rawCapeSlotData as { [id: string]: MinifiedItemData };
const feetSlotData = rawFeetSlotData as { [id: string]: MinifiedItemData };
const handsSlotData = rawHandsSlotData as { [id: string]: MinifiedItemData };
const headSlotData = rawHeadSlotData as { [id: string]: MinifiedItemData };
const legsSlotData = rawLegsSlotData as { [id: string]: MinifiedItemData };
const neckSlotData = rawNeckSlotData as { [id: string]: MinifiedItemData };
const ringSlotData = rawRingSlotData as { [id: string]: MinifiedItemData };
const shieldSlotData = rawShieldSlotData as { [id: string]: MinifiedItemData };
const weaponSlotData = rawWeaponSlotData as { [id: string]: MinifiedItemData };
const twoHandedSlotData = rawTwoHandedSlotData as { [id: string]: MinifiedItemData };
const stanceData = rawStanceData as { [id: string]: WeaponStance[] };

export class Equipment {
  private characterEquipment: EquipmentSlots;
  public equipmentBonuses: EquipmentBonuses;

  constructor(equipment: EquipmentSlots) {
    this.characterEquipment = equipment;
    this.equipmentBonuses = this.calculateEquipmentBonuses();
  }

  private calculateEquipmentBonuses = (): EquipmentBonuses => {
    const bonuses: EquipmentBonuses = {
      attack_stab: 0,
      attack_slash: 0,
      attack_crush: 0,
      attack_magic: 0,
      attack_ranged: 0,
      defence_stab: 0,
      defence_slash: 0,
      defence_crush: 0,
      defence_magic: 0,
      defence_ranged: 0,
      melee_strength: 0,
      ranged_strength: 0,
      magic_damage: 0,
      prayer: 0,
    };

    Object.entries(this.characterEquipment).forEach(([slot, itemID]: [string, number]) => {
      const slotItemData = this.getItemDataForSlot(slot as EquipmentSlotNames);
      if (slotItemData[itemID] === undefined) return;

      const slotEquipmentData = slotItemData[itemID].equipment;
      if (slotEquipmentData === null) return;

      Object.entries(slotEquipmentData).forEach(([key, value]) => {
        if (Object.prototype.hasOwnProperty.call(bonuses, key)) {
          bonuses[key as keyof EquipmentBonuses] += value;
        }
      });
    });
    console.log(bonuses);

    return bonuses;
  };

  private getItemDataForSlot = (slot: EquipmentSlotNames): { [id: string]: MinifiedItemData } => {
    switch (slot) {
      case EquipmentSlotNames.body:
        return bodySlotData;
      case EquipmentSlotNames.ammo:
        return ammoSlotData;
      case EquipmentSlotNames.cape:
        return capeSlotData;
      case EquipmentSlotNames.feet:
        return feetSlotData;
      case EquipmentSlotNames.hands:
        return handsSlotData;
      case EquipmentSlotNames.head:
        return headSlotData;
      case EquipmentSlotNames.legs:
        return legsSlotData;
      case EquipmentSlotNames.neck:
        return neckSlotData;
      case EquipmentSlotNames.ring:
        return ringSlotData;
      case EquipmentSlotNames.shield:
        return shieldSlotData;
      case EquipmentSlotNames.weapon:
        return weaponSlotData;
      default:
        console.error("wtf");
        return {} as { [id: string]: MinifiedItemData };
    }
  };

  public getAttackTypeAndExperience = (attackStyle: AttackStyle): { attackType: AttackType; styleExperience: StyleExperience } => {
    const weaponID = this.characterEquipment[EquipmentSlotNames.weapon];
    const weaponData = weaponSlotData[weaponID].weapon;
    const weaponType = weaponData?.weapon_type;

    if (weaponType === null || weaponType === undefined) {
      console.error("Weapon did not have a valid weapon type.");
      throw new Error("fuck you this shouldn't happen");
    }

    console.log(weaponType);

    const stances = stanceData[weaponType];
    const usedStance = stances.find((stance) => stance.attack_style === attackStyle);
    const attackType = usedStance?.attack_type;
    const styleExperience: StyleExperience | null | undefined = usedStance?.experience;

    if (attackType === null || attackType === undefined) {
      console.error("Stance did not have a valid attack type.");
      throw new Error("this also should never happen aaaa");
    }

    if (styleExperience === null || styleExperience === undefined) {
      console.error("Stance did not have a valid experience value.");
      throw new Error("this also should never happen bbbbbbb");
    }

    return { attackType, styleExperience };
  };

  public getAttackSpeed = (attackStyle: AttackStyle): number => {
    const weaponID = this.characterEquipment[EquipmentSlotNames.weapon];
    const weaponData = weaponSlotData[weaponID].weapon;
    const attackSpeed = weaponData?.attack_speed;

    if (attackSpeed === undefined) {
      console.error("Weapon did not have a valid attack speed.");
      throw new Error("fuck you this shouldn't happen?!?!?!?");
    }

    if (attackStyle === AttackStyle.rapid) {
      return attackSpeed - 1;
    }

    return attackSpeed;
  };
}
