// TODO this is duplicate code between develop and index, this should be unified
import './pageSetup';
import React from 'react';
import {render} from 'react-dom';
import App from './ui/App';
// TODO change image names
import player1 from 'assets/player1.png';
import player2 from 'assets/player2.png';
import neutral from 'assets/neutral.png';
import fighter from 'assets/fighter.png';
import mainMenu from 'assets/mainMenu.jpg';
import {loadImages} from 'shared/utils';

loadImages([mainMenu, neutral, player1, player2, fighter], () => {
  render(<App></App>, document.getElementById('app'));
});
