import levelsData from '../levels/levels.json';
import {ILevelData} from "../d.ts/interfaces";

let levels:ILevelData[] = [];

Object.keys(levelsData).forEach((levelKey) => {
  let levelData = {...levelsData[levelKey]};
  levelData.key = levelKey;

  if (levelData.order >= 0) {
    levels.push(levelData);
  }
});

levels.sort((aLevel, bLevel) => {
  return aLevel.order - bLevel.order;
});

export {levels}