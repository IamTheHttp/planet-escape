export default (entities,fn) => {
  Object.keys(entities).forEach((entID) => {
    fn(entities[entID]);
  });
};