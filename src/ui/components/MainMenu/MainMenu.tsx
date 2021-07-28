import i18n from 'ui/i18n';

import React from 'react';
import './mainMenu.scss';
import Help from './Help';
import {version} from '../../../../package.json';
import earthImage from 'assets/player1.png';
import alienImage from 'assets/player2.png';
import PlayerSelection from '../PlayerSelection/PlayerSelection';

import {
  TINY,
  MEDIUM,
  SMALL,
  LARGE,
  EASY,
  CHALLENGING,
  HARD
} from 'gameEngine/constants';
import {ILevelData} from "../../../d.ts/interfaces";

let mapScales = [{
  scale: TINY,
  title: i18n.tiny
},
{
  scale: SMALL,
  title: i18n.small
},
{
  scale: MEDIUM,
  title: i18n.medium
},
{
  scale: LARGE,
  title: i18n.large
}
];

let difficulties = [EASY, CHALLENGING, HARD];

interface IProps {
  selectedPlayer: unknown;
  onPlayerSelect: (selectedPlayer: unknown) => void;
  onPlayerDelete: () => void;
  levels: ILevelData[];
  onLevelSelect: (level: ILevelData, levels: ILevelData[]) => void;
  onQuickStart: (menuSelection: IState) => void;
}

interface IState {
  selection: unknown;
  mapScale: number;
  difficulty:string;
}

class MainMenu extends React.Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selection: false,
      mapScale: TINY,
      difficulty: EASY
    };
  }


  topMenu() {
    if (this.state.selection) {
      return null;
    }

    return (
      <div className="btnList mainMenu">
        <button className="btnItem" onClick={() => {
          this.setState({selection: 'campaign'});
        }}>
          {i18n.campaign}
        </button>
        <button className="btnItem" onClick={() => {
          this.setState({selection: 'quickStart'});
        }}>
          {i18n.quickStart}
        </button>
        <button className="btnItem" onClick={() => {
          this.setState({selection: 'help'});
        }}>
          {i18n.help}
        </button>
        <button className="btnItem goToPlayerSelection" onClick={() => {
          this.setState({selection: 'playerSelection'});
        }}>
          {i18n.changeActivePlayer}
        </button>
        <button className="btnItem" onClick={() => {
          this.setState({selection: 'about'});
        }}>
          {i18n.about}
        </button>
      </div>
    );
  }

  about() {
    if (this.state.selection !== 'about') {
      return null;
    }
    return (
      <div className="about bordered centered md">Created by Patrick Tolosa</div>
    );
  }

  help() {
    if (this.state.selection !== 'help') {
      return null;
    }
    return (
      <div className="centered md">
        <Help></Help>
      </div>
    );
  }

  levelSelection() {
    if (this.state.selection !== 'campaign') {
      return null;
    }

    let levelsPassed = this.props.selectedPlayer.levelsPassed;

    // Done planets are earthy
    return (
      <div className="campaignScreen">
        {this.props.levels.map((level, i) => {
          let levelIsDone = !!levelsPassed[level.key];

          let lastLevelDone = i === 0 || !levelIsDone && i > 0 && levelsPassed[this.props.levels[i - 1].key];

          /* istanbul ignore next */
          if (process.env.NODE_ENV === 'dev') {
            if (this.props.selectedPlayer.userName.toLowerCase() === 'iamhttp') {
              lastLevelDone = true;
              levelIsDone = true;
            }
          }

          let lvlIsNextCls = lastLevelDone ? 'nextLevel' : '';
          let lvlIsDoneCls = levelIsDone ? 'levelIsDone' : '';

          return (
            <div
              className={`level ${lvlIsNextCls} ${lvlIsDoneCls}`}
              key={level.key}
              onClick={() => {
                if (lastLevelDone || levelIsDone) {
                  this.props.onLevelSelect(level, this.props.levels);
                }
              }}
            >
              <div className="level-image">
                <img src={levelIsDone ? earthImage : alienImage}/>
              </div>
              <div className="level-title">
                {level.key}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  playerSelection() {
    if (this.state.selection !== 'playerSelection') {
      return null;
    }

    return (
      <PlayerSelection
        onPlayerSelect={this.props.onPlayerSelect}
        onPlayerDelete={this.props.onPlayerDelete}
      >
      </PlayerSelection>
    );
  }

  quickStartSelection() {
    if (this.state.selection !== 'quickStart') {
      return null;
    }

    return (
      <div className="quickStartGame">
        <div className="row">
          <div className="difficultySelector col-xs-4">
            <div className="btnList">
              <h4 className="title">
                Select difficulty
              </h4>
              {difficulties.map((diff) => {
                return (<button
                  key={diff}
                  className={`btnItem ${this.state.difficulty === diff && 'active'}`}
                  onClick={() => {
                    this.setState({difficulty: diff});
                  }}
                >{diff.toLowerCase()}</button>);
              })}
            </div>
          </div>
          <div className="mapScaleselector col-xs-4">
            <div className="btnList">
              <h4 className="title">
                {i18n.selectMapSize}
              </h4>
              {mapScales.map(({scale, title}) => {
                return (<button
                  key={scale}
                  className={`btnItem ${this.state.mapScale === scale && 'active'}`}
                  onClick={() => {
                    this.setState({mapScale: scale});
                  }}
                >{title.toLowerCase()}</button>);
              })}
            </div>
          </div>
          <div className="col-xs-4">
            <div className="btnList">
              <h4 className="title">{i18n.start}</h4>
              <div className="startGame"
                onClick={() => {
                  this.props.onQuickStart({...this.state});
                }}
              >
                <img src={earthImage}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  backButton() {
    if (!this.state.selection) {
      return null;
    }

    return (
      <button
        className="pull-left btnBack"
        onClick={() => {
          this.setState({selection: false});
        }}
        dangerouslySetInnerHTML={{__html: i18n.back}}
      >
      </button>
    );
  }

  render() {
    return (
      <div>
        {this.backButton()}
        <div className="">
          {`${i18n.welcome}${version}`}
        </div>
        <div>
          {this.topMenu()}
          {this.quickStartSelection()}
          {this.levelSelection()}
          {this.help()}
          {this.playerSelection()}
          {this.about()}
        </div>
      </div>
    );
  }
}

export default MainMenu;