
import Entity from 'lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlayerControlledComponent, {isSelected} from 'gameEngine/components/PlayerControlledComponent';
import {PLAYER_CONTROLLED} from 'gameEngine/constants';

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('renders', () => {
    let ent = new BaseEntity();
    ent.addComponent(new PlayerControlledComponent());

    expect(isSelected({})).toBe(false);
    expect(isSelected(ent:BaseEntity)).toBe(false);

    ent[PLAYER_CONTROLLED].selected = true;
    expect(isSelected(ent:BaseEntity)).toBe(true);
  });
});