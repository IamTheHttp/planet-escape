window.debugTools = {};
let title = document.getElementsByTagName('title')[0];
title.innerHTML = 'Planet Escape!';
import 'polyfill/rAF.js';
import 'polyfill/perf.js';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
import planets from 'assets/planets.png';
import fighter from 'assets/fighter.png';
import {loadImages} from 'shared/utils';

loadImages([planets, fighter], () => {
  render(<App></App>, document.getElementById('app'));
});
