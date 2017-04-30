import {BUILDINGS_COMP,LOCALBONUS_COMP,FOOD_COMP,PLANETBONUS_COMP} from 'gameEngine/constants';


function planetBonusesSystem(entities){
  for(let entityID in entities){
    let entity = entities[entityID];

    /*
     * Set the base bonuses for entities
     */
    if(entity.hasComponents([LOCALBONUS_COMP])){
      entity.components[LOCALBONUS_COMP].base = {
        [FOOD_COMP]:2,
        production:1
      };
      //set the mod for this entity
      entity.components[LOCALBONUS_COMP].mod = Object.assign({},entity.components[LOCALBONUS_COMP].base);
    }

    /*
     * Set the mod bonuses for entites
     */
    let entHasMod = entity.hasComponents([LOCALBONUS_COMP,BUILDINGS_COMP]);
    if(entHasMod){

      let foodBonus = 0;
      entity.components[BUILDINGS_COMP].built.forEach((childEntity)=>{
        foodBonus += childEntity.components[PLANETBONUS_COMP].items[FOOD_COMP] || {amount:0};
      });

      entity.components[LOCALBONUS_COMP].mod[FOOD_COMP] = foodBonus;
    }
  }
}

export default planetBonusesSystem;