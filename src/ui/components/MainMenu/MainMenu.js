import i18n from 'ui/i18n';

import React from 'react';
import './mainMenu.scss';
import Help from './Help';
import {version} from '../../../../package.json';
import earthImage from 'assets/player1.png';
import {
  TINY,
  MEDIUM,
  SMALL,
  LARGE,
  EASY,
  CHALLENGING,
  HARD
} from 'gameEngine/constants';
let mapSizes = [TINY, SMALL, MEDIUM, LARGE];
let difficulties = [EASY, CHALLENGING, HARD];

class MainMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: false,
      mapSize: TINY,
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
          <div className="mapSizeSelector col-xs-4">
            <div className="menuButtons">
              <h4 className="title">
                {i18n.selectMapSize}
              </h4>
              {mapSizes.map((size) => {
                return (<button
                  key={size}
                  className={`btnItem ${this.state.mapSize === size && 'active'}`}
                  onClick={() => {
                    this.setState({mapSize: size});
                  }}
                >{size.toLowerCase()}</button>);
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
          {this.help()}
          {this.tutorial()}
          {this.about()}
        </div>
      </div>
    );
  }
}

export default MainMenu;