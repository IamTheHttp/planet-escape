import ls from 'lib/Storage/LocalStorage';




describe('testing localStorage facade', () => {
  beforeEach(() => {
    ls.clear();
  });

  it('Adds and reads from ls', () => {
    ls.setItem('foo', 'bar');
    expect(ls.getItem('foo')).toBe('bar');

    ls.removeItem('foo');
    expect(ls.getItem('foo')).toBeFalsy();

    let obj = {
      nice: 'try'
    };

    ls.setJSON('json', obj);
    expect(ls.getJSON('json').nice).toBe('try');
  });

  it('SET JSON fails gracefully', () => {
    let obj = {};

    obj.obj = obj;
    expect(ls.setJSON('json', obj)).toBeFalsy();
  });

  it('GET JSON fails gracefully', () => {
    ls.setItem('foo', '}}}}}}}ssdasdad');
    expect(ls.getJSON('foo')).toBeFalsy();
  });
});