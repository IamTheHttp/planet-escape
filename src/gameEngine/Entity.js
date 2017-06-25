import Group from 'gameEngine/Group';
class Entity {
  constructor(classRef) {
    Entity.counter++;
    this.id = Entity.counter;
    this.constructor = classRef;
    this.components = {};
    Entity.entities[this.id] = this;
  }

  addComponent(component) {
    this.components[component.name] = component;
    this[component.name] = component;
    // creates an index group if it does not exist..
    Group.indexGroup(Object.keys(this.components),Entity.entities);

    // we need to see if we need to add entity into other components.

    for (let groupKey in Group.groups) {
      let group = Group.groups[groupKey];
      // if the ent is in this group, skip.
      if (group.entities[this.id]) {
        continue;
      }
      // if the component is not in this group, skip.
      if (group.components.indexOf(component.name) === -1) {
        continue;
      }

      // if this ent does not have all the other comps, skip..
      this.hasComponents(group.components,() => {
        group.entities[this.id] = this;
      });
    }
    // loop over all groups, see if this component exists in a key..
  }

  removeComponent(compName) {
    delete this.components[compName];
    delete this[compName];
  }

  hasComponents(components = [],fn = () => {}) {
    let compNames = components.reduce ? components : [components];

    let hasComp = compNames.reduce((agg,compName) => {
      return agg && !!this.components[compName];
    },true);

    if (hasComp) {
      fn();
    }
    return hasComp;
  }
}

Entity.entities = {};

Entity.getByComps = (components = []) => {
  let compNames = components.reduce ? components : [components];
  Group.indexGroup(components,Entity.entities);
  let group = Group.getGroup(compNames);
  return group.entities || {};
};


Entity.counter = 0;

export default Entity;







