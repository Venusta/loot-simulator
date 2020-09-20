/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from "react";

import "./Bank.css";
import { useSelector, shallowEqual } from "react-redux";
import { v1 as uuid } from "uuid";
import { ItemData } from "../../types/types";
import { ItemInBank } from "../loot-window/Item";
import { RootState } from "../../app/store";
import { formatStackNumbers } from "../../util";

interface BankProps {
  id: string;
}

export const Bank: React.FC<BankProps> = ({ id }) => { // todo pass bank / loot data in props
  const name: string = useSelector((state: RootState) => state.characters.names[id], shallowEqual);
  const bank: ItemData[] = useSelector((state: RootState) => state.characters.banks[id], shallowEqual);

  const handleDragStart = (e: React.DragEvent) => { // todo make this work
    console.log(e.target);
    // e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e: React.DragEvent) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  };

  const renderItem = (itemID: number, { amount, colour }: {amount: string; colour: string}): JSX.Element => (
    <ItemInBank
      key={`bankItem-${uuid()}`}
      itemID={itemID}
      amount={amount}
      colour={colour}
    />
  );

  const renderBank2 = () => { // todo add some error checks and shit
    console.log(`${name} Bank Rendered`);

    const bankGrid: JSX.Element[] = [];

    bank.forEach((itemInBank) => {
      bankGrid.push(renderItem(itemInBank.item, { ...formatStackNumbers(itemInBank.amount) }));
    });

    return bankGrid;
  };

  return (
    <div className="bank-window panel-window">
      <div className="bank-title panel-title">
        {`${name}'s Bank`}
      </div>
      <div className="bank-inner">
        <div
          className="bank-wrapper"
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {renderBank2()}
        </div>
      </div>
    </div>
  );
};
