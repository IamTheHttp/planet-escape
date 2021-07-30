
import {mount, shallow} from 'enzyme';
import React from 'react';
import Help from 'ui/components/MainMenu/Help';
import {Entity} from "game-platform";

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('renders the full help page, with the level-specific hints', () => {
    let wrapper = mount(<Help
      onClick={null}
      levelHints={['FOO', 'BAR']}
    />);

    expect(wrapper.find('.hint').length).toBe(2);
  });
});