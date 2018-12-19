/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import MainMenu from 'ui/components/MainMenu/MainMenu';

import levels from 'levels/levels.json';
describe('Tests a component', () => {
  it('renders', () => {
    let wrapper = shallow(<MainMenu
      levels={levels}
    ></MainMenu>);

    wrapper.find('.btnItem').forEach((el) => {
      el.simulate('click');
    });
  });
});