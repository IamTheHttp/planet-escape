import 'polyfill/rAF.js';
import 'polyfill/perf.js';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
render(<App></App>, document.getElementById('app'));
