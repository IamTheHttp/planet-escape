/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Entity from 'gameEngine/ecs/Entity';
describe('Tests for entities', function () {
    it('Creates a new entity', function () {
      let e = new Entity();
      expect(e.id).not.toBeUndefined();
      expect(e.components).toEqual({});
    });

  it('Adds and removes components', function () {
    let e = new Entity();
    let comp = {name:'test',foo:'bar'};
    e.addComponent(comp);
    expect(e.components['test']).toBe(comp);
    e.removeComponent('test');
    expect(e.components['test']).toBeUndefined();
  });

  it('Tests the hasComponent method', function () {
    let e = new Entity();
    let comp1 = {name:'test1',foo:'bar'};
    e.addComponent(comp1);
    let comp2 = {name:'test2',foo:'bar'};
    e.addComponent(comp2);


    expect(e.hasComponents(['test1'])).toBe(true);
    expect(e.hasComponents(['test1','test2'])).toBe(true);
    expect(e.hasComponents(['anotherComp'])).toBe(false);
  });
});