import i18n from 'ui/i18n';

import React from 'react';
import './mainMenu.scss';
import Help from './Help';
import {version} from '../../../../package.json';
import earthImage from 'assets/player1.png';
import alienImage from 'assets/player2.png';
import {
  TINY,
  MEDIUM,
  SMALL,
  LARGE,
  EASY,
  CHALLENGING,
  HARD
} from 'gameEngine/constants';

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

class MainMenu extends React.Component {
  constructor(props) {
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
      <div className="menuButtons">
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
          this.setState({selection: 'tutorial'});
        }}>
          {i18n.tutorial}
        </button>
        <button className="btnItem" onClick={() => {
          this.setState({selection: 'help'});
        }}>
          {i18n.help}
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
      <div className="about col-xs-offset-3 col-xs-6">Created by Patrick Tolosa</div>
    );
  }

  tutorial() {
    if (this.state.selection !== 'tutorial') {
      return null;
    }
    return (
      <div className="tutorial col-xs-offset-3 col-xs-6">Coming soon</div>
    );
  }

  help() {
    if (this.state.selection !== 'help') {
      return null;
    }
    return (
      <Help></Help>
    );
  }

  levelSelection() {
    if (this.state.selection !== 'campaign') {
      return null;
    }

    // lets gets an array

    let levels = [];
    Object.keys(this.props.levels).forEach((levelKey) => {
      let levelData = {...this.props.levels[levelKey]};
      levelData.key = levelKey;

      if (levelData.order >= 0) {
        levels.push(levelData);
      }
    });

    levels.sort((a, b) => {
      return a.order - b.order;
    });

    return (
      <div className="campaignScreen">
        {levels.map((level) => {
          return (
            <div
              className="level"
              key={level.key}
              onClick={() => {
                this.props.onLevelSelect(level);
              }}
            >
              <div className="level-image">
                <img src={earthImage}/>
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

  quickStartSelection() {
    if (this.state.selection !== 'quickStart') {
      return null;
    }

    return (
      <div>
        <div className="row">
          <div className="difficultySelector col-xs-4">
            <div className="menuButtons">
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
            <div className="menuButtons">
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
            <div className="startGame"
                 onClick={() => {
                   this.props.onQuickStart(this.state);
                 }}
            >
              <img src={earthImage}/>
              <h3 className="title">{i18n.start}</h3>
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
        className="pull-right btnBack"
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
      <div className="splashMenu">
        <div className="menuHeader">
          {`${i18n.welcome}${version}`}
          {this.backButton()}
        </div>
        <div>
          {this.topMenu()}
          {this.quickStartSelection()}
          {this.levelSelection()}
          {this.help()}
          {this.tutorial()}
          {this.about()}
        </div>
      </div>
    );
  }
}

export default MainMenu;