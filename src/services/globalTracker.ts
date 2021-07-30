class GlobalTracker {
  public subs: ((name:string, payload: any) => void)[];
  constructor() {
    this.subs = [];
  }

  dispatch(name: string, payload: any) {
    this.subs.forEach((fn) => {
      fn(name, payload);
    });
  }

  subscribe(fn: (name:string, payload: any) => void) {
    this.subs.push(fn);

    return () => {
      this.subs.splice(this.subs.indexOf(fn), 1);
    };
  }
}

export {GlobalTracker};
export default new GlobalTracker();