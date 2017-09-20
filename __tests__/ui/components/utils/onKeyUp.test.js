/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import onKeyUp, {instance} from 'ui/components/CanvasMap/utils/onKeyUp';
describe('Tests a keyUp', () => {
  beforeEach(() => {
      // setup the test
  });

  it('runs the function', () => {
    let fn = () => { };
    // nothing by default
    expect(instance.getCallbacks('m').length).toBe(0);
    // add a key
    onKeyUp('m', fn);
    // Expect callbacks to exist and be an array
    expect(instance.callbacks.m[0]).toBe(fn);
    expect(instance.getCallbacks('m')[0]).toBe(fn);
  });

  it('runs document.keydown', () => {
    let fn = jest.fn();
    // add a key
    onKeyUp('m', fn);
    let ev = new Event('keyup');
    ev.key = 'm';
    document.dispatchEvent(ev);
    // expect to get the correct event
    expect(fn.mock.calls[0][0]).toBe(ev);
  });
});