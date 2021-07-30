
import {mount, shallow} from 'enzyme';
import React from 'react';
import MainMenu from 'ui/components/MainMenu/MainMenu';

import levelsData from 'levels/levels.json';
import {playerService} from 'services/PlayerService';
import {ILevelData} from "../../../../src/interfaces/interfaces";

let levels:ILevelData[] = [];
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

    let onLevelSelect = jest.fn();

    let wrapper = shallow<MainMenu>(<MainMenu
      onPlayerDelete={null}
      onPlayerSelect={null}
      onQuickStart={null}
      levels={levels}
      selectedPlayer={playerService.getSelectedPlayer()}
      onLevelSelect={onLevelSelect}
    />);

    // Click on every button...
    wrapper.find('.btnItem').forEach((el) => {
      el.simulate('click');
    });


    // Test the campaign view
    wrapper.setState({
      selection: 'campaign'
    });

    let levelSelection = mount(wrapper.instance().levelSelection());

    // first level is accessible even though it's not complete
    levelSelection.find('.level').at(0).simulate('click');
    expect(onLevelSelect.mock.calls.length).toBe(1);
    onLevelSelect.mockClear();

    // 2nd level should not be accessible
    levelSelection.find('.level').at(1).simulate('click');
    expect(onLevelSelect.mock.calls.length).toBe(0);
    onLevelSelect.mockClear();

    // Finish first level
    playerService.finishLevel(levels[0].key);
    playerService.finishLevel(levels[1].key);
    playerService.finishLevel(levels[2].key);
    playerService.finishLevel(levels[3].key);


    // Re-render the entire thing with new player preferences

    wrapper = shallow(<MainMenu
      onPlayerDelete={null}
      onPlayerSelect={null}
      onQuickStart={null}
      levels={levels}
      selectedPlayer={playerService.getSelectedPlayer()}
      onLevelSelect={onLevelSelect}
    />);

    wrapper.setState({
      selection: 'campaign'
    });

    wrapper.update();

    levelSelection = mount(wrapper.instance().levelSelection());

    // first level is accessible even after completion
    levelSelection.find('.level').at(0).simulate('click');
    expect(onLevelSelect.mock.calls.length).toBe(1);
    onLevelSelect.mockClear();

    // 2nd level should be accessible
    levelSelection.find('.level').at(1).simulate('click');
    expect(onLevelSelect.mock.calls.length).toBe(1);
    onLevelSelect.mockClear();

    // 3rd level should be accessible
    levelSelection.find('.level').at(2).simulate('click');
    expect(onLevelSelect.mock.calls.length).toBe(0);
    onLevelSelect.mockClear();
  });
});