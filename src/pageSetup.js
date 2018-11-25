// Load RAF polyfill
import 'polyfill/rAF.js';
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
// let meta = document.createElement('meta');
// meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
// meta.name = 'viewport';
// document.head.appendChild(meta);

import './pageSetup';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
import player1 from 'assets/player1.png';
import player2 from 'assets/player2.png';
import neutral from 'assets/neutral.png';
import fighter from 'assets/fighter.png';
import mainMenuBackground from 'assets/background.jpg';
import {loadImages} from 'shared/utils';


let appDiv = document.getElementById('app') || document.createElement('div');

appDiv.innerHTML = 'Loading game assets...';


loadImages([mainMenuBackground, neutral, player1, player2, fighter], () => {
  appDiv.className = 'loaded';
  document.body.removeChild(document.getElementById('progress'));
  render(<App></App>, document.getElementById('app'));
});
