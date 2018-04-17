/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import Defending from 'gameEngine/components/Defending';
import {DEFENDING} from 'gameEngine/constants';
describe('Tests a component', () => {
  beforeEach(() => {
        // setup the test
  });

  it('Tests is Docked is initialized correctly', () => {
    let comp = new Defending();
    expect(comp).toEqual({
      name : DEFENDING
    });
  });
});