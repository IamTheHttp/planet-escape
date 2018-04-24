import './pageSetup';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
import player1 from 'assets/player1.png';
import player2 from 'assets/player2.png';
import neutral from 'assets/neutral.png';
import fighter from 'assets/fighter.png';
import {loadImages} from 'shared/utils';

loadImages([neutral, player1, player2, fighter], () => {
  render(<App></App>, document.getElementById('app'));
});
