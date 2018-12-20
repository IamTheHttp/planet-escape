class LocalStorage {
  setItem(...args) {
    if (window.localStorage && localStorage.setItem) {
      window.localStorage.setItem.apply(window.localStorage, args);
    }
  }
  getItem(...args) {
    if (window.localStorage && localStorage.getItem) {
      return window.localStorage.getItem.apply(window.localStorage, args);
    } else {
      return '';
    }
  }

  setJSON(key, obj) {
    this.setItem(key, JSON.stringify(obj));
  }

  getJSON(args) {
    return JSON.parse(this.getItem(args));
  }
}



export default LocalStorage;