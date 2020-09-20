import React from "react";

import "./LootWindow.css";
import { v1 as uuid } from "uuid";
import { ItemData } from "../../types/types";
import { ItemInBank } from "./Item";
import { formatStackNumbers } from "../../util";

interface BankProps {
  bank: ItemData[];
}

export const LootWindow: React.FC<BankProps> = ({ bank }) => {
  const renderItem = (itemID: number, { amount, colour }: { amount: string; colour: string }): JSX.Element => (
    <ItemInBank
      key={`bankItem-${uuid()}`}
      itemID={itemID}
      amount={amount}
      colour={colour}
    />
  );

  const renderBank2 = () => {
    const bankGrid: JSX.Element[] = [];

    bank.forEach((itemInBank) => {
      bankGrid.push(renderItem(itemInBank.item, { ...formatStackNumbers(itemInBank.amount) }));
    });

    return bankGrid;
  };

  return (
    <div className="bank-window">
      <div className="bank-title">
        Kill data maybe
      </div>
      <div className="bank-inner">
        <div className="bank-wrapper">
          {renderBank2()}
        </div>
      </div>
    </div>
  );
};
