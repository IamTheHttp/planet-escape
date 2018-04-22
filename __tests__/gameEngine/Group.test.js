/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import Entity from '../../src/lib/ECS/Entity';
import Group from '../../src/lib/ECS/Group';
import {mount, shallow} from 'enzyme';
import React from 'react';

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('resets the groups to an empty object', () => {
    Group.groups =  [1, 2, 3, 4];
    Group.reset();
    expect(Group.groups).toEqual({});
  });

  it('Indexes a group correctly', () => {
    let ent = new Entity();
    Group.indexGroup(['test1', 'test2', 'test3'], {[ent.id] : ent});
    // Group.reset();
    expect(Group.groups['test1-test2-test3']).not.toBeUndefined();
  });

  it('ensure getGroup returns sane defaults', () => {
    let group = Group.getGroup(['test1', 'test2', 'test3']);
    expect(group).toEqual({});
  });
});