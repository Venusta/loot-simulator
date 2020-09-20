/* eslint-disable max-len */
import { SkillName, ExpReward } from "../types/types";

export class LogMsgBuilder {
  private msg: string;

  constructor() {
    this.msg = "[Msg Builder] ";
  }

  finished = (characterName: string, action: string, amount: number, name: string): this => {
    this.msg = this.msg.concat(`<orange#${characterName}> finished ${action} <green#${amount}x ${name}s>. `);
    return this;
  };

  /**
   * Queued a cooking task of 50x chickens for Maximus
   * @param characterName
   * @param action
   * @param amount
   * @param name
   */
  // todo finish
  queued = (characterName: string, action: string, amount: number, name: string): this => {
    this.msg = this.msg.concat(`<orange#${characterName}> queued a `);
    return this;
  };

  /**
   * @param expReward \[{ skill: "construction", amount: 93 }]
   * @returns They gained 50 slayer xp
   * @returns They gained 50 slayer and 90 cooking xp
   * @returns They gained 50 slayer, 90 cooking and 25 smithing xp
   */

  gainingExp = (expReward: ExpReward[]): this => {
    const x = expReward
      .map(({ skill, amount }) => `<cyan#${amount}> ${skill}`)
      .join(", ")
      .replace(/(?:,)([^,]+)$/, " and$1");
    this.msg = this.msg.concat(`They gained ${x} xp. `);
    return this;
  };
  // gainingExp = (expReward: ExpMap): this => {
  //   const x = Array.from(expReward)
  //     .map(([skill, amount]) => `<cyan#${amount}> ${skill}`)
  //     .join(", ")
  //     .replace(/(?:,)([^,]+)$/, " and$1");
  //   this.msg = this.msg.concat(`They gained ${x} xp. `);
  //   return this;
  // };

  andLevels = (levelsGained: [SkillName, number, number][]): this => {
    if (levelsGained.length === 0) {
      return this;
    }
    // const x = levelsGained.map(([skill, gained]) => `<cyan#${gained}> ${skill}`)
    //   .join(", ")
    //   .replace(/(?:,)([^,]+)$/, " and$1");
    // // this.msg = this.msg.concat(`\n\nThey advanced ${x} level(s). `);

    // const y = levelsGained.map(([skill,, level]) => `<pink#${level}> ${skill}`)
    //   .join(", ")
    //   .replace(/(?:,)([^,]+)$/, " and$1");
    // // this.msg = this.msg.concat(`They're now ${y}. `);

    const z = levelsGained.map(([skill, gained, level]) => {
      console.log("");

      // return `They advanced <green#${gained}> <green#${skill}> level${gained > 1 ? "s" : ""}. Their <green#${skill}> level is now <green#${level}>!`;
      return `Their <green#${skill}> level is now <green#${level}>!`;
    }).join("\n");
    this.msg = this.msg.concat(`\n\n${z}`);
    return this;
  };

  /**
   * returns a message string, end the chain with this
   */

  returnMsg = (): string => this.msg;
}
