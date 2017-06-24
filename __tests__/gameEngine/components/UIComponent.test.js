/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import UIComponent from 'gameEngine/components/UIComponent';

describe('Tests a component', () => {
  beforeEach(() => {
      // setup the test
  });

  it('inits the component - string', () => {
    let comp = new UIComponent('foo');
    expect(comp.sections.length).toBe(1);
  });

  it('inits the component - array of strings', () => {
    let comp = new UIComponent(['foo']);
    expect(comp.sections.length).toBe(1);
  });

  it('inits the component - object', () => {
    let comp = new UIComponent({name:'foo',data:{bar:true}});
    expect(comp.sections.length).toBe(1);
  });

  it('inits the component - array of objects', () => {
    let comp = new UIComponent([{name:'foo',data:{bar:true}}]);
    expect(comp.sections.length).toBe(1);
  });

  it('inits the component - array of objects without a name', () => {
    try {
      new UIComponent([{data:{bar:true}}]);
    } catch (e) {
      expect(e).not.toBeUndefined();
    }
  });
});