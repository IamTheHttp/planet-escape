class Entity{
  constructor(){
    Entity.counter++;
    this.id = Entity.counter;
    this.components = {};
    Entity.entities[this.id] = this;
  }

  addComponent(component){
    this.components[component.name] = component;
  }

  removeComponent(componentName){
    delete this.components[componentName];
  }

  hasComponents(components = []){
    return components.reduce((agg,compName)=>{
        return agg && !!this.components[compName];
    },true)
  }
}

Entity.entities = {};
Entity.counter = 0;

export default Entity;