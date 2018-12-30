/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import MainMenu from 'ui/components/MainMenu/MainMenu';

import levelsData from 'levels/levels.json';
import playerService from 'services/PlayerService';

let levels = [];
Object.keys(levelsData).forEach((levelKey) => {
  let levelData = {...levelsData[levelKey]};
  levelData.key = levelKey;

  if (levelData.order >= 0) {
    levels.push(levelData);
  }
});

levels.sort((aItem, bItem) => {
  return aItem.order - bItem.order;
});

describe('Tests a component', () => {
  beforeEach(() => {
    playerService.reset();
  });

  it('renders', () => {
    playerService.createPlayer('foo');
    playerService.selectPlayer('foo');

    let wrapper = shallow(<MainMenu
      levels={levels}
      selectedPlayer={playerService.getSelectedPlayer()}
    ></MainMenu>);

    wrapper.find('.btnItem').forEach((el) => {
      el.simulate('click');
    });
  });
});