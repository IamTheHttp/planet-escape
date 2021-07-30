
import {mount, shallow} from 'enzyme';
import React from 'react';
import MoveComponent from 'gameEngine/components/MoveComponent';
describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('inits the component', () => {
    let comp = new MoveComponent(5);
    expect(comp.speed).toBe(5);
  });
});