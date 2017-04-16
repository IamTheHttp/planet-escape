/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import PlanetList from 'ui/components/PlanetList';
import EarthLike from 'gameEngine/planets/EarthLike';
describe('Tests a component', function () {
  let wrapper,dispatchGameAction;

  beforeEach(function () {
      let planets = {
        '1' : new EarthLike()
      };
      dispatchGameAction = jest.fn();
      wrapper = mount(<PlanetList
        dispatchGameAction={dispatchGameAction}
        planets={planets}
      ></PlanetList>);
  });

  it('renders the planets',()=>{
    expect(wrapper.find('.planet').length).toBe(1);
  });

  it('dispatches proper actions',()=>{
    let entID = 1;
    wrapper.instance().addPop(entID);
    expect(dispatchGameAction.mock.calls[0][0].entities[0]).toBe(1);
  })
});