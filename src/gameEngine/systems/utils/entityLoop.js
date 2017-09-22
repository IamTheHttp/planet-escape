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
  Object.keys(entities).forEach((entID) => {
    fn(entities[entID]) && ents.push(entities[entID]);
  });
  return ents;
};