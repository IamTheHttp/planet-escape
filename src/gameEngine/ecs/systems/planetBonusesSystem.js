import {
  BUILDINGS_COMP,
  PLANETBONUS_COMP,
  FOOD_RESOURCE,
  MODS_PLANET_BONUSES
} from 'gameEngine/constants';

function planetBonusesSystem(entities) {
  for (let entityID in entities) {
    let entity = entities[entityID];

    /*
     * Set the base bonuses for entities
     */
    if (entity.hasComponents([PLANETBONUS_COMP])) {
      entity[PLANETBONUS_COMP].base = {
        [FOOD_RESOURCE]:2,
        production:1
      };
    }

    /*
     * Set the mod bonuses for entites
     */
    let entHasMod = entity.hasComponents([PLANETBONUS_COMP,BUILDINGS_COMP]);
    if (entHasMod) {
      let foodBonus = entity[PLANETBONUS_COMP].base[FOOD_RESOURCE];
      entity[BUILDINGS_COMP].built.forEach((childEntity) => {
        if (childEntity[MODS_PLANET_BONUSES].items[FOOD_RESOURCE]) {
          foodBonus += childEntity[MODS_PLANET_BONUSES].items[FOOD_RESOURCE].amount || {amount:0};
        }
      });

      entity.components[PLANETBONUS_COMP].mod[FOOD_RESOURCE] = foodBonus;
    }
  }
}

export default planetBonusesSystem;