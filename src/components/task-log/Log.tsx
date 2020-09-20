/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
import React, { useRef, useLayoutEffect } from "react";
import { v1 as uuid } from "uuid";
import { useSelector, shallowEqual } from "react-redux";
import { LogMsgBuilder } from "../../builders/LogMsgBuilder";
import { RootState } from "../../app/store";
import { ItemData } from "../../types/types";
import { Item } from "../loot-window/Item";
import "./Log.css";
import { formatStackNumbers } from "../../util";

export const Log = (): JSX.Element => {
  const items = useSelector((state: RootState) => state.log.items, shallowEqual);

  const ref = useRef<HTMLDivElement>(null);

  const regex = /<([\w-]+#)(.*?)>/gi;

  useLayoutEffect(() => { // todo only scroll if at the bottom of the list
    if (ref.current !== null) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [items]);

  const renderItem = (itemID: number, { amount, colour }: {amount: string; colour: string}): JSX.Element => (
    <Item
      key={`bankItem-${uuid()}`}
      itemID={itemID}
      amount={amount}
      colour={colour}
    />
  );

  const renderBank2 = (name: string, bank: ItemData[]) => { // todo add some error checks and shit
    // console.log(`${name} Log bank Rendered`);

    const bankGrid: JSX.Element[] = [];

    bank.forEach((itemInBank) => {
      bankGrid.push(renderItem(itemInBank.item, { ...formatStackNumbers(itemInBank.amount) }));
    });

    return bankGrid;
  };

  const NewListShit = (): JSX.Element => {
    // console.error("sdguiadfuigadfg");

    // console.log(items);
    const sortedTaskData: Array<JSX.Element> = [];
    let ohMyGod: Array<JSX.Element> = [];

    const formatMsg = (msg: string) => msg.split(regex).reduce((accum: Array<string | JSX.Element>, thing, index, splitMsg) => {
      if (thing.endsWith("#") && splitMsg[index + 1]) {
        return [...accum, <span key={uuid()} className={thing.slice(0, -1)}>{splitMsg[index + 1]}</span>];
      }
      if (splitMsg[index - 1] && splitMsg[index - 1].endsWith("#")) return accum;
      return [...accum, thing];
    }, []);

    items.forEach((item) => {
      const { action, payload } = item;
      switch (action) {
        case "msg": {
          sortedTaskData.push(
            <div key={uuid()} className="log-item item-bubble">
              {formatMsg(payload)}
            </div>,
          );
          break;
        }
        case "task-complete": {
          const {
            gained, reward, type, characterName, info: { name, amount },
          } = payload;
          const msg = new LogMsgBuilder()
            .finished(characterName, type, amount, name)
            .gainingExp(reward.exp)
            .andLevels(gained)
            .returnMsg();
          console.log(msg);
          ohMyGod = (renderBank2("jfc", reward.items));
          sortedTaskData.push(
            <div key={uuid()} className="log-item item-bubble">
              {formatMsg(msg)}
              <div className="loot-table">
                {ohMyGod}
              </div>
            </div>,
          );
          break;
        }
        default:
          sortedTaskData.push(
            <div key={uuid()} className="log-item item-bubble">{`Invalid task action: ${action}`}</div>,
          );
          break;
      }
    });

    return (
      <div className="log-inner-inner">
        {sortedTaskData}
      </div>
    );
  };

  return (
    <div className="log-window panel-window">
      <div className="log-title panel-title">Character Log</div>
      <div ref={ref} className="log-inner">
        {/* <div className="log-inner-inner"> */}

        <NewListShit />
        {/* </div> */}
      </div>
    </div>
  );
};
