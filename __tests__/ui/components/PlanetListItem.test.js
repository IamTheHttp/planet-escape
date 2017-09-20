/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import PlanetListItem from 'ui/components/PlanetList/PlanetListItem';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
describe('Tests a component', () => {
  it('renders the Item', () => {
    let props = {
      planet : new EarthLike('p', 1),
      onClick : jest.fn(),
      isFocused : true
    };

    let wrapper = mount(<PlanetListItem {...props}></PlanetListItem>);
    expect(wrapper.find('.focus').length).toEqual(1);

    wrapper.find('.focus').simulate('click');

    expect(props.onClick.mock.calls[0][0]).toBe(props.planet.id);
  });
});