// import {POPULATION_COMP,INCOME_COMP} from 'gameEngine/constants';
//
// function incomeSystem(entities) {
//   for (let entityID in entities) {
//     let entity = entities[entityID];
//     entity.hasComponents([POPULATION_COMP,INCOME_COMP], () => {
//       let pop    = entity.components[POPULATION_COMP];
//       let income = entity.components[INCOME_COMP];
//       income.value = Math.max((+pop.value * 2.5),0);
//     });
//   }
// }
//
// export default incomeSystem;