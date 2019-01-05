/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import googleTracking from 'services/googleTracking';

import {EVENTS} from 'gameEngine/constants';

describe('Tests google tracking', () => {
  let ga;

  beforeEach(() => {
    window.ga = jest.fn();
    ga = window.ga;
  });

  it('Tracks APP_LOADING', () => {
    googleTracking.track(EVENTS.APP_LOADING);
    let e = ga.mock.calls[0][1];

    expect(e.hitType).toBe('event');
    expect(e.eventCategory).toBe('APP');
    expect(e.eventAction).toBe('load_start');
    expect(e.eventLabel).toBe(null);
    expect(e.eventValue).toBe(null);
  });

  it('Tracks APP_LOADED', () => {
    googleTracking.track(EVENTS.APP_LOADED);
    let e = ga.mock.calls[0][1];

    expect(e.hitType).toBe('event');
    expect(e.eventCategory).toBe('APP');
    expect(e.eventAction).toBe('load_end');
    expect(e.eventLabel).toBe(null);
    expect(e.eventValue).toBe(null);
  });

  it('Tracks LEVEL_STARTED', () => {
    googleTracking.track(EVENTS.LEVEL_STARTED, {
      levelKey: 'foobar'
    });

    let e = ga.mock.calls[0][1];

    expect(e.hitType).toBe('event');
    expect(e.eventCategory).toBe('LVL');
    expect(e.eventAction).toBe('lvl_started');
    expect(e.eventLabel).toBe('foobar');
    expect(e.eventValue).toBe(null);
  });

  it('Tracks LEVEL_COMPLETE', () => {
    googleTracking.track(EVENTS.LEVEL_COMPLETE, {
      levelKey: 'foobar'
    });

    let e = ga.mock.calls[0][1];

    expect(e.hitType).toBe('event');
    expect(e.eventCategory).toBe('LVL');
    expect(e.eventAction).toBe('lvl_won');
    expect(e.eventLabel).toBe('foobar');
    expect(e.eventValue).toBe(null);
  });

  it('Tracks LEVEL_FAILED', () => {
    googleTracking.track(EVENTS.LEVEL_FAILED, {
      levelKey: 'foobar'
    });

    let e = ga.mock.calls[0][1];

    expect(e.hitType).toBe('event');
    expect(e.eventCategory).toBe('LVL');
    expect(e.eventAction).toBe('lvl_failed');
    expect(e.eventLabel).toBe('foobar');
    expect(e.eventValue).toBe(null);
  });

  it('Tracks PLAYER_CREATED', () => {
    googleTracking.track(EVENTS.PLAYER_CREATED, {
      uNameLen: 15
    });

    let e = ga.mock.calls[0][1];

    expect(e.hitType).toBe('event');
    expect(e.eventCategory).toBe('APP');
    expect(e.eventAction).toBe('player_created');
    expect(e.eventLabel).toBe(null);
    expect(e.eventValue).toBe(15);
  });
});