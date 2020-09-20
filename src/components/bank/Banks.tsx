import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Bank } from "./Bank";
import { IDsState } from "../../builders/CharacterBuilder";

export const Banks = (): JSX.Element => {
  const ids: IDsState = useSelector((state: RootState) => state.characters.ids, shallowEqual);
  console.log("Don't re-render me!");

  return (
    <div>
      {ids.map((id) => <Bank key={id} id={id} />)}
    </div>
  );
};
