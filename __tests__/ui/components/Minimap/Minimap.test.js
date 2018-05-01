/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Minimap from 'ui/components/Minimap/Minimap';
describe('Tests a component', () => {
  it('renders', () => {
    let wrapper = shallow(<Minimap
    ></Minimap>);
  });
});