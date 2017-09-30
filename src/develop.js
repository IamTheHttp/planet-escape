import 'polyfill/rAF.js';
import 'polyfill/perf.js';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
import planets from 'assets/planets.png';

let planetsImage = new Image();
planetsImage.onload = () => {
  render(<App></App>, document.getElementById('app'));
};
planetsImage.src = planets;


