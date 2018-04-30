/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import MainMenu from 'ui/components/MainMenu/MainMenu';
describe('Tests a component', () => {
  it('renders', () => {
    let wrapper = shallow(<MainMenu
    ></MainMenu>);

    wrapper.find('.btnItem').forEach((el) => {
      console.log(el);
      el.simulate('click');
    });
  });
});