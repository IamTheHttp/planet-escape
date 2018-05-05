import 'polyfill/rAF.js';
import 'bootstrap/dist/css/bootstrap.css';

/* istanbul ignore next */
if (!document.getElementsByTagName('title')[0]) {
  let titleElm = document.createElement('title');
  document.head.appendChild(titleElm);
}

let title = document.getElementsByTagName('title')[0];
title.innerHTML = 'Planet Escape!';


let meta = document.createElement('meta');
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
meta.name = 'viewport';
document.head.appendChild(meta);


import './pageSetup';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
import player1 from 'assets/player1.png';
import player2 from 'assets/player2.png';
import neutral from 'assets/neutral.png';
import fighter from 'assets/fighter.png';
import mainMenu from 'assets/background.jpg';
import {loadImages} from 'shared/utils';

loadImages([mainMenu, neutral, player1, player2, fighter], () => {
  render(<App></App>, document.getElementById('app'));
});
