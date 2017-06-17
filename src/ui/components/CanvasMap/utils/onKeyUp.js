class OnKeyUp {
  constructor() {
    this.callbacks = {};
    document.addEventListener('keyup',(e) => {
      // console.log(e);
      this.getCallbacks(e.key).forEach((fn) => {
        fn(e);
      });
    });
  }

  getCallbacks(key) {
    return this.callbacks[key] || [];
  }

  onKeyUp(key,fn) {
    if (!this.callbacks[key]) {
      this.callbacks[key] = [];
    }
    this.callbacks[key].push(fn);
  }
}

let instance = new OnKeyUp();

export default instance.onKeyUp.bind(instance);
export {instance};
