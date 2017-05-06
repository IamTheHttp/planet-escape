let tickCount = 0;
import {
  POPULATION_COMP,
  TREASURY_COMP,
  GOLD_RESOURCE,
  INCOME_COMP
} from 'gameEngine/constants';

function treasuryUpdateSystem(entities){


  tickCount++;
  let totalIncome = 0;
  let totalPop = 0;
  let totalgold = 0;
  let hasSummary = [];


  for(let entityID in entities){
    let entity = entities[entityID];

    if(entity.hasComponents([TREASURY_COMP])){
      hasSummary.push(entity);
      continue; //we do not want to run math on any entity with a treasury component
    }

    if(entity.hasComponents([INCOME_COMP])){
      let income = entity.components[INCOME_COMP];
      totalIncome += +income.value;
    }

    if(entity.hasComponents([POPULATION_COMP]) ){
      let pop = entity.components[POPULATION_COMP];
      totalPop += +pop.value;
    }

    if(entity.hasComponents([GOLD_RESOURCE]) ){
      let gold = entity.components[GOLD_RESOURCE];
      totalgold += +gold.value;
    }
  }

  hasSummary.forEach((entity) => {
    entity.components[POPULATION_COMP].value = totalPop;
    entity.components[INCOME_COMP].value = totalIncome;

    if(tickCount === 200){
      entity.components[GOLD_RESOURCE] += totalIncome;
      tickCount =0;
    }
  });
}

export default treasuryUpdateSystem;