import {BUILDINGS_COMP,PLAYERCONTROLLED_COMP} from 'gameEngine/constants';
// store our actions, singleton
let actions = [];

function pushAction(action) {
  actions.push(action);
}

function isClickedInCircle(x,y,centerX,centerY,radius) {
  return Math.pow((x - centerX),2) + Math.pow((y - centerY),2) < Math.pow(radius,2);
}

function userInputSystem(entities) {
  // loop over all actions
  actions.forEach((action) => {
    // for each entity in the action, do the required logic
    if (action.entities) {
      action.entities.forEach((entityID) => {
        let ent = entities[entityID];
        let toBuild;
        switch (action.name) {
        case 'build':
          toBuild = entities[action.entityID];
          ent.components[BUILDINGS_COMP].inProgress.push(new toBuild.constructor());
          break;
        default:
          break;
        }
      });
    } else {
      for (let entID in entities) {
        let ent = entities[entID];
        if (ent[PLAYERCONTROLLED_COMP]) {
          let x = action.x;
          let y = action.y;
          let centerX = ent[PLAYERCONTROLLED_COMP].x;
          let centerY = ent[PLAYERCONTROLLED_COMP].y;
          let radius = ent[PLAYERCONTROLLED_COMP].radius;
          let isClickInside = isClickedInCircle(x,y,centerX,centerY,radius);
          ent[PLAYERCONTROLLED_COMP].selected = isClickInside;
        }
      }
    }
  });
  // reset actions when we're done
  actions = [];
}

export default userInputSystem;
export {pushAction};