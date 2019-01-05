/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import Entity from 'lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import Help from 'ui/components/MainMenu/Help';

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('renders the full help page, with the level-specific hints', () => {
    let wrapper = mount(<Help
      levelHints={['FOO', 'BAR']}
    ></Help>);

    expect(wrapper.find('.hint').length).toBe(2);
  });
});