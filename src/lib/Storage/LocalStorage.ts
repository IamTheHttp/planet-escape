class MemoryLocalStorage {
  private store: Record<string, unknown>
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: unknown) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

/* istanbul ignore else  */
if (!window.localStorage) {
  // @ts-ignore
  window.localStorage = new MemoryLocalStorage();
}


class LocalStorage {
  clear() {
    window.localStorage.clear();
  }
  setItem(...args: any[]) {
    window.localStorage.setItem.apply(window.localStorage, args);
  }
  getItem(...args: any[]) {
    return window.localStorage.getItem.apply(window.localStorage, args);
  }
  removeItem(...args: any[]) {
    return window.localStorage.removeItem.apply(window.localStorage, args);
  }

  setJSON(key: string, obj: Record<string, any>) {
    try {
      this.setItem(key, JSON.stringify(obj));
      return true;
    } catch (e) {
      // nothing
      return false;
    }
  }

  getJSON(args: any) {
    try {
      return JSON.parse(this.getItem(args));
    } catch (e) {
      return null;
    }
  }
}



export default new LocalStorage();