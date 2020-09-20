import React, { useEffect, useState } from "react";
import "./App.css";

import { ItemData } from "./types/types";

import { monsters } from "./monsters";
import { itemMapToItemData } from "./drop-simulator/DropSimulator";
import { LootWindow } from "./components/loot-window/LootWindow";

const testKill = () => {
  const { corporealBeast } = monsters;
  const loot3 = corporealBeast.getLoot(1000);
  return itemMapToItemData(loot3);
};

const App = (): JSX.Element => {
  const init: ItemData[] = [];
  const [loot, setLoot] = useState(init);

  useEffect(() => {
    setLoot(testKill());
  }, []);

  return (
    <div className="App">
      <LootWindow bank={loot} />
    </div>
  );
};

export default App;
