
import Entity from 'lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import MainView from 'ui/components/MainView/MainView';

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('renders the hints', () => {
    let onHintsApprvd = jest.fn();

    let wrapper = mount(<MainView
      levelHints={['Hint 1', 'Hint 2']}
      onLevelHintsApproved={onHintsApprvd}
    ></MainView>);

    wrapper.setState({
      showLevelHints: true
    });

    expect(wrapper.find('li').length).toBe(2); // 2 hints

    wrapper.find('.btnItem').simulate('click');
    expect(wrapper.find('li').length).toBe(0); // 2 hints
    expect(onHintsApprvd.mock.calls.length).toBe(1);
  });
});