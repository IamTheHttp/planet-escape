export default (reactComponent) => {
  return (e) => {
    let canvas = reactComponent.canvas;
    let rect = canvas.getBoundingClientRect();
    // base position
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // adjust scale
    reactComponent.x = Math.max(0,Math.round(x * (canvas.width / canvas.offsetWidth)));
    reactComponent.y = Math.max(0,Math.round(y * (canvas.height / canvas.offsetHeight)));
  };
};