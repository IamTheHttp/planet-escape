/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import UIComponent from 'gameEngine/ecs/components/UIComponent';

describe('Tests a component', function () {

  beforeEach(function () {
      //setup the test
  });

  it('inits the component - string', function () {
    let comp = new UIComponent('foo');
    expect(comp.sections.length).toBe(1);
  });

  it('inits the component - array of strings', function () {
    let comp = new UIComponent(['foo']);
    expect(comp.sections.length).toBe(1);
  });

  it('inits the component - object', function () {
    let comp = new UIComponent({name:'foo',data:{bar:true}});
    expect(comp.sections.length).toBe(1);
  });

  it('inits the component - array of objects', function () {
    let comp = new UIComponent([{name:'foo',data:{bar:true}}]);
    expect(comp.sections.length).toBe(1);
  });

  it('inits the component - array of objects without a name', function () {
    try {
      new UIComponent([{data:{bar:true}}]);
    } catch (e) {
      expect(e).not.toBeUndefined();
    }
  });
});