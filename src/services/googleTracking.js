import {EVENTS} from 'gameEngine/constants';

let ga = window.ga;

let APP = 'APP';
let NAV = 'NAV';
let LVL = 'LVL';
// App category events
// - App loaded, App done
// - Player created

// Nav category events, Where did the player navigate to

// Level category events
// - Interaction with the level
// - Level complete
// - Level failed

function event({eventCategory, eventAction, eventLabel = null, eventValue}) {
  ga('send', {
    hitType: 'event',
    eventCategory,
    eventAction,
    eventLabel,
    eventValue
  });
}

class GoogleTracking {
  track(eventName, payload) {
    if (eventName === EVENTS.APP_LOADING) {
      event({
        eventCategory: APP,
        eventAction: 'load_start'
      });
    }

    if (eventName === EVENTS.APP_LOADED) {
      event({
        eventCategory: APP,
        eventAction: 'load_end'
      });
    }

    if (eventName === EVENTS.LEVEL_STARTED) {
      event({
        eventCategory: LVL,
        eventAction: 'lvl_started',
        eventLabel: payload.levelKey
      });
    }

    if (eventName === EVENTS.LEVEL_COMPLETE) {
      event({
        eventCategory: LVL,
        eventAction: 'lvl_won',
        eventLabel: payload.levelKey
      });
    }

    if (eventName === EVENTS.LEVEL_FAILED) {
      event({
        eventCategory: LVL,
        eventAction: 'lvl_failed',
        eventLabel: payload.levelKey
      });
    }

    if (eventName === EVENTS.PLAYER_CREATED) {
      event({
        eventCategory: APP,
        eventAction: 'player_created',
        eventLabel: null,
        eventValue: payload.uNameLen
      });
    }
  }
}

export default new  GoogleTracking();