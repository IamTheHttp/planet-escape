
import React from 'react';
import {GlobalTracker} from 'services/globalTracker';


describe('Tests the playerService', () => {
  let globalTracker: GlobalTracker;
  beforeEach(() => {
    globalTracker = new GlobalTracker();
  });

  it('Tracks correctly, can sub to and unsub correctly', () => {
    let unsub = globalTracker.subscribe((eventName, payload) => {
      expect(eventName).toBe('testing');
      expect(payload).toBe('foo');
    });

    let otherSub = () => {

    };

    globalTracker.subscribe(otherSub);

    globalTracker.dispatch('testing', 'foo');

    unsub();

    expect(globalTracker.subs.length).toBe(1);
    expect(globalTracker.subs.indexOf(otherSub)).toBe(0);
  });
});