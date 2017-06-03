export default (reactComponent) => {
  return (e) => {
    if (e.key === 'm') {
      reactComponent.props.dispatch({
        name:'move',
        x: reactComponent.x,
        y: reactComponent.y
      });
    } else {
      // silence.. do nothing
    }
  };
};