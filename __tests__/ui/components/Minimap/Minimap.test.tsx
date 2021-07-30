
import {mount, shallow} from 'enzyme';
import React from 'react';
import Minimap from 'ui/components/Minimap/Minimap';
describe('Tests a component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Minimap
    />);
  });

  it('renders through the states', () => {
    expect(wrapper.find('.contractMinimap').length).toBe(1);
    expect(wrapper.find('.minimized').length).toBe(0);

    wrapper.find('.contractMinimap').simulate('click');

    expect(wrapper.find('.contractMinimap').length).toBe(0);
    expect(wrapper.find('.minimized').length).toBe(1);

    wrapper.find('button').simulate('click');
    expect(wrapper.find('.contractMinimap').length).toBe(1);
    expect(wrapper.find('.minimized').length).toBe(0);
  });
});