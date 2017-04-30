/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlanetDetails from 'ui/components/PlanetDetails/PlanetDetails';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';
import {LOCALBONUS_COMP} from 'gameEngine/constants';
describe('Tests a component', function () {

  beforeEach(function () {
      //setup the test
  });

  it('renders with an empty name', function () {
    let props = {
      planet : new EarthLike('',1)
    };

    let wrapper = mount(<PlanetDetails {...props}></PlanetDetails>);
    expect(wrapper.find('h1').html().toLowerCase().indexOf('select a planet')).toBeGreaterThan(-1);
  });

  it('renders with a planet', function () {
    let props = {
      buildingOptions : {},
      planet : new EarthLike('p',1)
    };

    props.planet[LOCALBONUS_COMP].mod = {
      'blabla' : 1,
      'blabla2' : 2,
    };

    let wrapper = mount(<PlanetDetails {...props}></PlanetDetails>);
    expect(wrapper.find('h5').length).toBe(2);
  });

  it('renders buildingOptions', function () {
    let props = {
      buildingOptions : {
        "tmp" : {
          name : 'tmp_name'
        }
      },
      planet : new EarthLike('p',1),
      onClick : jest.fn()
    };

    let wrapper = mount(<PlanetDetails {...props}></PlanetDetails>);
    wrapper.find('.planetBonuse').simulate('click');
    expect(props.onClick.mock.calls[0][0]).toBe('tmp');
  });
});