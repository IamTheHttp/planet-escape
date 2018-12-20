import LocalStorage from 'lib/Storage/LocalStorage';

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock;



describe('testing localStorage facade', () => {
  let ls;
  beforeEach(() => {
    ls = new LocalStorage();
  });

  it('Adds and reads from ls', () => {
    ls.setItem('foo','bar');
    expect(ls.getItem('foo')).toBe('bar');

    let obj = {
      'nice': 'try'
    };

    ls.setJSON('json', obj);
    expect(ls.getJSON('json').nice).toBe('try');
  });
});