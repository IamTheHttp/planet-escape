import React from 'react';
import i18n from 'ui/i18n';
import CreateNewPlayer from './CreateNewPlayer';
import playerService from 'services/PlayerService';
import './playerSelection.scss';

class PlayerSelection extends React.Component {
  constructor() {
    super();
    this.state = {
      createUser: playerService.getRegisteredPlayers().length === 0,
      players : playerService.getRegisteredPlayers().length,
      selectedPlayer : playerService.getSelectedPlayer() || {}
    };
  }

  render() {
    let selectedPlayer = this.state.selectedPlayer;
    let players = playerService.getRegisteredPlayers();

    if (this.state.createUser) {
      return <CreateNewPlayer
        onSubmit={(userName) => {
          playerService.createPlayer(userName);
          playerService.selectPlayer(userName);
          this.setState({
            createUser: false
          });

          this.props.onPlayerSelect(playerService.getSelectedPlayer());
          this.setState({
            selectedPlayer : playerService.getSelectedPlayer() || {}
          });
        }}
      ></CreateNewPlayer>;
    } else {
      return (
        <div className="playerSelection centered md">
          <div className="menuHeader">
            {i18n.switchPlayer}
          </div>
          <div className="btnList ">
            {players.map((player, i) => {
              let className = selectedPlayer.userName === player.userName ? 'selectedUser btnItem' : 'btnItem nonSelectedUser';
              return (
              <div key={i}>
                <button className={className} onClick={() => {
                  playerService.selectPlayer(player.userName);
                  this.setState({
                    selectedPlayer : playerService.getSelectedPlayer() || {}
                  });
                  this.props.onPlayerSelect(playerService.getSelectedPlayer());
                }}>
                    {player.userName} <span className="isActive"> - {i18n.selected}</span>
                  </button>
                <button className="btnItem delete"
                  onClick={() => {
                    // delete the selected user?
                    playerService.deletePlayer(player.userName);
                    this.setState({
                      players : playerService.getRegisteredPlayers().length
                    });
                    this.props.onPlayerDelete(player.userName);
                  }}
                >{i18n.del}</button>
              </div>
              );
            })}
            <button className="btnItem" onClick={() => {
              this.setState({
                createUser: true
              });
            }}>
              {i18n.createNewPlayer}
            </button>
          </div>
        </div>
      );
    }
  }
}

export default PlayerSelection;