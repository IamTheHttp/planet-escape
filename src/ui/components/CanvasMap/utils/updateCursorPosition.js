export default (reactComponent) => {
  return (event) => {
    let canvas = reactComponent.canvas;
    if (!canvas) {
      return null;
    }
    let rect = canvas.getBoundingClientRect();
    // base position
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // adjust scale
    reactComponent.x = Math.max(0, Math.round(x * (canvas.width / canvas.offsetWidth)));
    reactComponent.y = Math.max(0, Math.round(y * (canvas.height / canvas.offsetHeight)));
  };
};