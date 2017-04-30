/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import PlanetList from 'ui/components/PlanetList/PlanetList';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';
describe('Tests a component', function () {
  let wrapper,onClick;

  beforeEach(function () {
    onClick = jest.fn();
    let pl = new EarthLike();
      let planets = {
        [pl.id] : pl
      };
      wrapper = mount(<PlanetList
        planets={planets}
        onClick={onClick}
      ></PlanetList>);
  });

  it('renders the planets',()=>{
    expect(wrapper.find('.planet').length).toBe(1);
  });

  it('dispatches proper actions',()=>{
    let entID = 1;
    wrapper.instance().handleClick(entID);
    expect(onClick.mock.calls[0][0]).toBe(entID);
  })
});