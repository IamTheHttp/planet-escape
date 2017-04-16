function summarySystem(entities){

  let totalIncome = 0;
  let totalPop = 0;
  let hasSummary = [];


  for(let entityID in entities){
    let entity = entities[entityID];

    if(!entity.hasComponents(['summary']) && entity.hasComponents(['income'])){
      let income = entity.components.income;
      totalIncome += +income.value;
    }

    if( !entity.hasComponents(['summary']) && entity.hasComponents(['population']) ){
      let pop = entity.components.population;
      totalPop += +pop.value;
    }

    if(entity.hasComponents(['summary'])){
      hasSummary.push(entity);
    }
  }

  hasSummary.forEach((entity) => {
    entity.components.population.value = totalPop;
    entity.components.income.value = totalIncome;
    //console.log(entity);
  });
}

export default summarySystem;