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
      isGamePaused={false}
    ></Sidebar>);

    let text = wrapper.find('button').props().children;
    expect(text.length).toBeGreaterThan(0);

    wrapper.setProps({
      isGamePaused:true
    });

    let newText = wrapper.find('button').props().children;

    expect(text).not.toBe(newText);
    expect(newText.length).toBeGreaterThan(0);
  });
});