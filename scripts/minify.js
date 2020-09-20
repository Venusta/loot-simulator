/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

const outputDir = "./minified/";
const inputDir = "./data/";
const skipIds = [617, 8890, 6964, 20405, 4178];
const includedNames = ["Abyssal whip", "Coins", "Dwarf remains", "Cooked chicken"];
const imageIds = [ 5321, 1753, 9735, 9144, 890, 7060, 239, 449, 2361, 995, 5952, 6332, 566, 12829, 2, 564, 560, 1401, 7936, 1407, 1623, 886, 987, 1247, 829, 1373, 1319, 4091, 1513, 1403, 9245, 4093, 1405, 383, 563, 451, 8780, 561, 985, 1149, 442, 1621, 1452, 1462, 2363, 892, 5295, 12827, 1185, 12073, 1201, 1619, 12833, 12823, 12819, 1615, 2366, 12816, 1617, 830, 1249 ]

const checkExistsAndCreateDir = (input) => {
  try {
    if (!fs.existsSync(input)) {
      console.error(`File not found: ${input}`);
      return false;
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
      console.log(`Directory made: ${outputDir}`);
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};

const minifyCacheData = () => {
  const input = `${inputDir}items-cache-data.json`;
  const output = `${outputDir}mini-items-cache-data.json`;

  const itemFilter = (item) => !item.placeholder && !item.noted;// && !item.linked_id_item;

  try {
    if (!checkExistsAndCreateDir(input)) {
      console.log("File no exist?!?£!?£%");
      return;
    }

    const rawdata = fs.readFileSync(input);
    const data = JSON.parse(rawdata);

    const shrinkedData = Object.values(data).filter(itemFilter).reduce((accum, thing) => {
      const {
        id, name, stackable, equipable, cost, highalch, stacked, linked_id_item,
      } = thing;

      let objBuild = {
        id,
        name,
      };

      if (cost !== 0) {
        objBuild = { ...objBuild, cost };
      }
      if (highalch !== 0) {
        objBuild = { ...objBuild, highalch };
      }
      if (stackable !== false) {
        objBuild = { ...objBuild, stackable };
      }
      if (equipable !== false) {
        objBuild = { ...objBuild, equipable };
      }
      if (stacked !== null) {
        objBuild = { ...objBuild, stacked };
      }
      if (linked_id_item !== null) {
        objBuild = { ...objBuild, linked_id_item };
      }

      if (skipIds.includes(id)) {
        return accum;
      }
      return {
        ...accum,
        [id]: {
          ...objBuild,
        },
      };
    }, {});

    fs.writeFileSync(output, JSON.stringify(shrinkedData));
    console.log(`${input} minified to\n${output}`);
  } catch (err) {
    console.error(err);
  }
};

const minifySearchData = () => {
  const input = `${inputDir}items-cache-data.json`;
  const output = `${outputDir}mini-item-search-data.json`;

  const itemFilter = (item) => !item.placeholder && !item.noted && !item.linked_id_item;

  try {
    if (!checkExistsAndCreateDir(input)) {
      console.log("File no exist?!?£!?£%");
      return;
    }
    const rawdata = fs.readFileSync(input);
    const data = JSON.parse(rawdata);

    const shrinkedData = Object.values(data).filter(itemFilter).reduce((accum, thing) => {
      const { id, name } = thing;

      // if (!includedNames.includes(name) || trashItems.includes(id)) {
      if (skipIds.includes(id)) {
        return accum;
      }

      return {
        ...accum,
        [id]: name,
      };
    }, {});

    fs.writeFileSync(output, JSON.stringify(shrinkedData));
    console.log(`${input} minified to\n${output}`);
  } catch (err) {
    console.error(err);
  }
};

const copyImages = () => {
  const input = `${inputDir}/images/`;
  const output = `${outputDir}/images/`;

  imageIds.forEach((id) => {
    // destination will be created or overwritten by default.
    fs.copyFile(`${input}${id}.png`, `${output}${id}.png`, (err) => {
      if (err) throw err;
      console.log('File was copied to destination');
    });
  });
}

const args = process.argv.slice(2);

switch (args[0]) {
  case "search": {
    console.log("Creating minified search data...");
    minifySearchData();
    break;
  }
  case "cache": {
    console.log("Creating minified cache data...");
    minifyCacheData();
    break;
  }
  case "copy": {
    console.log("Copying images over...");
    copyImages();
    break;
  }
  default:
    console.log(`Unknown argument: ${args}`);
    break;
}
