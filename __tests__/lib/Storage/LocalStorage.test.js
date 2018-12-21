import ls from 'lib/Storage/LocalStorage';




describe('testing localStorage facade', () => {
  beforeEach(() => {
    ls.clear();
  });

  it('Adds and reads from ls', () => {
    ls.setItem('foo', 'bar');
    expect(ls.getItem('foo')).toBe('bar');

    let obj = {
      nice: 'try'
    };

    ls.setJSON('json', obj);
    expect(ls.getJSON('json').nice).toBe('try');
  });
});