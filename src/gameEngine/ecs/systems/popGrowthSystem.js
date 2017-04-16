function popGrowthSystem(entities){
  for(let entityID in entities){
    let entity = entities[entityID];

    if(entity.components['population']){
      let newPop = Math.max((+entity.components['population'].value + 0.005),0);

      if(entity.components['planetSize']){
        //1M per planetSize.
        let maxPop = entity.components['planetSize'].value;
        entity.components['population'].maxPop = maxPop;

        newPop = Math.min(maxPop,newPop);
        entity.components['population'].value = newPop;
      }
    }
  }
}

export default popGrowthSystem;