class MemoryLocalStorage {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

/* istanbul ignore else  */
if (!window.localStorage) {
  window.localStorage = new MemoryLocalStorage();
}


class LocalStorage {
  clear() {
    window.localStorage.clear();
  }
  setItem(...args) {
    window.localStorage.setItem.apply(window.localStorage, args);
  }
  getItem(...args) {
    return window.localStorage.getItem.apply(window.localStorage, args);
  }
  removeItem(...args) {
    delete window.localStorage.removeItem.apply(window.localStorage, args);
  }

  setJSON(key, obj) {
    try {
      this.setItem(key, JSON.stringify(obj));
      return true;
    } catch (e) {
      // nothing
      return false;
    }
  }

  getJSON(args) {
    try {
      return JSON.parse(this.getItem(args));
    } catch (e) {
      return null;
    }
  }
}



export default new LocalStorage();