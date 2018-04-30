/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Sidebar from 'ui/components/Sidebar/Sidebar';
describe('Tests a component', () => {
  it('renders', () => {
    let wrapper = shallow(<Sidebar
    ></Sidebar>);
  });
});