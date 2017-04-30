import {BUILDINGS_COMP} from 'gameEngine/constants';
//store our actions, singleton
let actions = [];

function pushAction(action){
  if(action.entities && action.entities.length > 0){
    actions.push(action);
  }
}

function userInputSystem(entities){
  //loop over all actions
  actions.forEach((action) => {
    //for each entity in the action, do the required logic
    action.entities.map((entityID) => {
      let ent = entities[entityID];
      switch(action.name){
        case 'build':
          let toBuild = entities[action.entityID];
          ent.components[BUILDINGS_COMP].inProgress.push(new toBuild.constructor());
          break;
        default:
          break;
      }
    })
  });
  //reset actions when we're done
  actions = [];
}

export default userInputSystem;
export {pushAction};