/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import IsDocked from 'gameEngine/components/IsDocked';
describe('Tests a component', () => {
  beforeEach(() => {
        // setup the test
  });

  it('Tests is Docked is initialized correctly', () => {
    let comp = new IsDocked();
    expect(comp.isDocked).toBe(true);
  });
});