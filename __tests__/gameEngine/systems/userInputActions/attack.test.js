/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {attack} from 'gameEngine/systems/userInputActions/attack';
import Mothership from 'gameEngine/entities/Ships/Mothership';

describe('Tests the attack action', () => {
  beforeEach(() => {
    // setup the test
  });

  it('Cannot attack a non attackable!', (done) => {
    let ship = new Mothership(200, 300);
    attack({x:200, y:300})
      .then((result) => {
        if (result === false) {
          done();
        }
      });
  });
});