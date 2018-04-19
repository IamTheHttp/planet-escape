
import logger from 'shared/logger';

/**
 * used to loop over and possibly filter entities
 * if the CB returns true, an array of entities that return true is returned.
 * else an empty array is returned
 * @param entities
 * @param fn
 * @returns {Array}
 */
export default (entities, fn) => {
  let ents = [];

  if (entities.forEach) {
    entities.forEach((ent) => {
      fn(ent) && ents.push(ent);
    });
  } else {
    Object.keys(entities).forEach((entID) => {
      fn(entities[entID]) && ents.push(entities[entID]);
    });
  }

  /* istanbul ignore next */
  if (ents.length > 1000) {
    logger.warn('WARNING, BIG LOOP DETECTED');
  }

  return ents;
};