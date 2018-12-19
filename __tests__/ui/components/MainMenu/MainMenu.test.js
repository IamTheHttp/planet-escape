/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import MainMenu from 'ui/components/MainMenu/MainMenu';

import levelsData from 'levels/levels.json';

let levels = [];
Object.keys(levelsData).forEach((levelKey) => {
  let levelData = {...levelsData[levelKey]};
  levelData.key = levelKey;

  if (levelData.order >= 0) {
    levels.push(levelData);
  }
});

levels.sort((a, b) => {
  return a.order - b.order;
});

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