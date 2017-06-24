import Entity from 'gameEngine/Entity';


class NullEntity {
  constructor() {
    if (NullEntity.singleton) {
      return NullEntity.singleton;
    } else {
      let ent = new Entity();
      NullEntity.singleton = ent;
      ent.isNull = true;
      return ent;
    }
  }
}
NullEntity.singleton = false;
export default NullEntity;