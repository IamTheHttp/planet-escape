// let LS = {
//   selectedPlayer
//   users: [
//     {
//       userName: 'Patrick',
//       levelsPassed: {}, // levelKeys
//       lastActive: null
//     }
//   ]
// }



import ls from 'lib/Storage/LocalStorage';

class PlayerService {
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

    this.players = this.data.players;
  }

  persistState() {
    ls.setJSON('PE', this.data);
  }

  reset() {
    ls.clear();
    this.data = {
      players: []
    };
    this.persistState();
    // resets the LS, useful for testing
  }

  getPlayer(userName) {
    return this.data.players.find((player) => {
      return player.userName = userName;
    });
  }

  createPlayer(userName) {
    this.data.players.push({
      userName,
      levelsPassed: {}
    });

    this.persistState();
  }

  finishLevel(levelKey) {
    if (!this.getSelectedPlayer()) {
      return false;
    } else {
      this.data.selectedPlayer.levelsPassed[levelKey] = 1;
      return true;
    }
  }

  deletePlayer(userName) {

  }

  getSelectedPlayer() {
    return this.data.selectedPlayer;
  }

  selectPlayer(userName) {
    let player = this.getPlayer(userName);

    if (player) {
      this.data.selectedPlayer = player;
      this.persistState();
      return player;
    } else {
      return false;
    }
  }

  validateUsername(userName) {
    return userName && userName.length > 3;
  }
}

export default new PlayerService();