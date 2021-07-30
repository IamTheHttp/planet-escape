// let LS = {
//   selectedPlayer, // playerObject
//   users: [
//     {
//       userName: 'Patrick',
//       levelsPassed: {}, // levelKeys
//       lastActive: null
//     }
//   ]
// }


import ls from 'lib/Storage/LocalStorage';
import {IPlayer} from "../interfaces/interfaces";

class PlayerService {
  public data: {
    selectedPlayer: IPlayer,
    players: IPlayer[]
  }

  constructor() {
    // Create the required LS schema..
    if (!ls.getJSON('PE') || !ls.getJSON('PE').players) {
      this.data = {
        selectedPlayer: null,
        players: []
      };
      this.persistState();
    } else {
      this.data = ls.getJSON('PE');
    }
  }

  persistState() {
    ls.setJSON('PE', this.data);
  }

  reset() {
    ls.clear();
    this.data = {
      selectedPlayer: null,
      players: []
    };
    this.persistState();
    // resets the LS, useful for testing
  }

  getPlayer(userName: string) {
    return this.data.players.find((player) => {
      return player.userName === userName;
    });
  }

  getRegisteredPlayers() {
    return this.data.players;
  }

  createPlayer(userName: string) {
    this.data.players.push({
      userName,
      levelsPassed: {}
    });

    this.persistState();
  }

  finishLevel(levelKey: string) {
    if (!this.getSelectedPlayer()) {
      return false;
    } else {
      let selectedPlayer = this.getSelectedPlayer();
      selectedPlayer.levelsPassed[levelKey] = 1;

      this.persistState();
      return true;
    }
  }

  deletePlayer(userName: string) {
    if (this.data.selectedPlayer && this.data.selectedPlayer.userName === userName) {
      this.data.selectedPlayer = null;
    }
    this.data.players = this.data.players.filter((player) => {
      return player.userName !== userName;
    });
    this.persistState();
  }

  getSelectedPlayer() {
    return this.data.selectedPlayer;
  }

  selectPlayer(userName: string) {
    let player = this.getPlayer(userName);

    if (player) {
      this.data.selectedPlayer = player;
      this.persistState();
      return player;
    } else {
      return false;
    }
  }

  validateUsername(userName: string) {
    let isAvailable = !this.getPlayer(userName);
    let isLongEnough = userName && userName.length > 3;

    return isAvailable && isLongEnough;
  }
}

const playerService = new PlayerService();
export {PlayerService, playerService};