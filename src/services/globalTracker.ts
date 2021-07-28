class GlobalTracker {
  constructor() {
    this.subs = [];
  }

  dispatch(name, payload) {
    this.subs.forEach((fn) => {
      fn(name, payload);
    });
  }

  subscribe(fn) {
    this.subs.push(fn);

    return () => {
      this.subs.splice(this.subs.indexOf(fn), 1);
    };
  }
}

export {GlobalTracker};
export default new GlobalTracker();