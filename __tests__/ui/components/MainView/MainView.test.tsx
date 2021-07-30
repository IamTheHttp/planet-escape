
import {mount, shallow} from 'enzyme';
import React from 'react';
import MainView from 'ui/components/MainView/MainView';
import {Entity} from "game-platform";

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('renders the hints', () => {
    let onHintsApprvd = jest.fn();

    let wrapper = mount(<MainView
      canvasElm={null}
      newHeight={null}
      newWidth={null}
      newWidthToHeight={null}
      showLevelHints={null}
      viewMapCanvasAPI={null}
      widthToHeight={null}
      levelHints={['Hint 1', 'Hint 2']}
      onLevelHintsApproved={onHintsApprvd}
    />);

    wrapper.setState({
      showLevelHints: true
    });

    expect(wrapper.find('li').length).toBe(2); // 2 hints

    wrapper.find('.btnItem').simulate('click');
    expect(wrapper.find('li').length).toBe(0); // 2 hints
    expect(onHintsApprvd.mock.calls.length).toBe(1);
  });
});