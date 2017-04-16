function incomeSystem(entities){
  for(let entityID in entities){
    let entity = entities[entityID];
    if(entity.hasComponents(['population','income'])){
      let pop    = entity.components.population;
      let income = entity.components.income;
      income.value = Math.max((+pop.value * 2.5),0);
    }
  }
}

export default incomeSystem;