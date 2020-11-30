import React from "react";
import "./App.css";

import { monsters } from "./monsters";
import { itemMapToItemData } from "./drop-simulator/DropSimulator";
import { LootWindow } from "./components/loot-window/LootWindow";
import { Monster } from "./model/Monster";

const testKill = (monster: Monster, amount: number) => itemMapToItemData(monster.getLoot(amount));

const App = (): JSX.Element => {
  const amount = 1000;
  const { corporealBeast, commanderZilyana, chicken } = monsters;

  return (
    <div className="App">
      <LootWindow
        bank={testKill(corporealBeast, amount)}
        name={corporealBeast.name}
        kills={amount}
      />
      <LootWindow
        bank={testKill(commanderZilyana, amount)}
        name={commanderZilyana.name}
        kills={amount}
      />
      <LootWindow
        bank={testKill(chicken, amount)}
        name={chicken.name}
        kills={amount}
      />
    </div>
  );
};

export default App;
