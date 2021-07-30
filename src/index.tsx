/* istanbul ignore file */

// Load RAF polyfill
import 'polyfill/rAF';
import i18n from './ui/i18n';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';

// Create title if it doesn't exist
/* istanbul ignore next */
if (!document.getElementsByTagName('title')[0]) {
  let titleElm = document.createElement('title');
  document.head.appendChild(titleElm);
}

// Modify Title
let title = document.getElementsByTagName('title')[0];
title.innerHTML = i18n.gameTitle;

// Add scaling meta data
let meta = document.createElement('meta');
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
meta.name = 'viewport';
document.head.appendChild(meta);

// library imports
import React from 'react';
import * as ReactDOM from 'react-dom';
const {render} = ReactDOM;
import App from './ui/App';
import player1 from 'assets/player1.png';
import player2 from 'assets/player2.png';
import neutral from 'assets/neutral.png';
import fighter from 'assets/fighter.png';
import mainMenuBackground from 'assets/background.jpg';
import {loadImages} from 'shared/utils';
import globalTracker from 'services/globalTracker';
import {googleTracking} from 'services/googleTracking';

import {EVENTS} from 'gameEngine/constants';
let appDiv = document.getElementById('app') || document.createElement('div');

appDiv.innerHTML = 'Loading game assets...';


// assign tracking!
// @ts-ignore TODO Update types
if (window.ga) {
  globalTracker.subscribe(googleTracking.track);
}
// @ts-ignore TODO Update types
globalTracker.dispatch(EVENTS.APP_LOADING);

loadImages([mainMenuBackground, neutral, player1, player2, fighter], () => {
  appDiv.className = 'loaded';
  document.body.removeChild(document.getElementById('progress'));
  render(<App/>, document.getElementById('app'));

  // @ts-ignore TODO Update types
  globalTracker.dispatch(EVENTS.APP_LOADED);
});
