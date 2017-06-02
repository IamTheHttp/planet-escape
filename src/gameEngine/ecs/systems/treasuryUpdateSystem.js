let tickCount = 0;
import {
  POPULATION_COMP,
  TREASURY_COMP,
  GOLD_RESOURCE,
  INCOME_COMP
} from 'gameEngine/constants';

function treasuryUpdateSystem(entities) {
  tickCount++;
  let totalIncome = 0;
  let totalPop = 0;
  let totalgold = 0;
  let hasSummary = [];

  for (let entityID in entities) {
    let entity = entities[entityID];

    if (entity.hasComponents([TREASURY_COMP])) {
      hasSummary.push(entity);
      continue; // we do not want to run math on any entity with a treasury component
    }

    if (entity.hasComponents([INCOME_COMP])) {
      let income = entity[INCOME_COMP];
      totalIncome += +income.value;
    }

    if (entity.hasComponents([POPULATION_COMP])) {
      let pop = entity[POPULATION_COMP];
      totalPop += +pop.value;
    }
  }

  hasSummary.forEach((entity) => {
    entity[POPULATION_COMP].value = totalPop;
    entity[INCOME_COMP].value = totalIncome;

    if (tickCount === 200) {
      entity[TREASURY_COMP].items[GOLD_RESOURCE] += totalIncome;
      tickCount = 0;
    }
  });
}

export default treasuryUpdateSystem;