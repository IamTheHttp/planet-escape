import React from 'react';
import i18n from 'ui/i18n';
import CreateNewPlayer from './CreateNewPlayer';
import {playerService} from 'services/PlayerService';
import globalTracker from 'services/globalTracker';
import './playerSelection.scss';
import {EVENTS} from 'gameEngine/constants';
import {IPlayer} from "../../../interfaces/interfaces";

interface IProps {
  onPlayerSelect: (selectedPlayer: IPlayer) => void;
  onPlayerDelete: (userName: string) => void;
}


interface IState {
  createUser: boolean;
  selectedPlayer: IPlayer;
  players: number;
}

class PlayerSelection extends React.Component< IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      createUser: playerService.getRegisteredPlayers().length === 0,
      players: playerService.getRegisteredPlayers().length,
      selectedPlayer: playerService.getSelectedPlayer() || {levelsPassed: {}, userName: 'guest'}
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

          globalTracker.dispatch(EVENTS.PLAYER_CREATED, {
            uNameLen: userName.length
          });

          this.setState({
            selectedPlayer: playerService.getSelectedPlayer()
          });
        }}
      />;
    } else {
      let selected = 'selectedUser btnItem';
      let nonSelected = 'btnItem nonSelectedUser';

      return (
        <div className="playerSelection centered md">
          <div className="menuHeader">
            {i18n.switchPlayer}
          </div>
          <div className="btnList ">
            {players.map((player: IPlayer, i: number) => {
              let className = selectedPlayer.userName === player.userName ? selected : nonSelected;
              return (
                <div key={i}>
                  <button className={className} onClick={() => {
                    playerService.selectPlayer(player.userName);
                    this.setState({
                      selectedPlayer: playerService.getSelectedPlayer()
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
                        players: playerService.getRegisteredPlayers().length
                      });
                      this.props.onPlayerDelete(player.userName);
                    }}
                  >{i18n.del}</button>
                </div>
              );
            })}
            <button className="btnItem createPlayerBtn" onClick={() => {
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