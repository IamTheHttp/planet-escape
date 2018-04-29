import React from 'react';
import './mainMenu.scss';
import Help from './Help';
import {version} from '../../../../package.json';
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
      selection: '',
      mapSize: TINY,
      difficulty: EASY
    };
  }


  topMenu() {
    if (this.state.selection) {
      return null;
    }

    return (
      <div>
        <button className="btn btn-info" onClick={() => {
          this.setState({selection: 'quickStart'});
        }}>
          Quick start
        </button>
        <button className="btn btn-info" onClick={() => {
          this.setState({selection: 'tutorial'});
        }}>
          Tutorial
        </button>
        <button className="btn btn-info" onClick={() => {
          this.setState({selection: 'help'});
        }}>
          Help
        </button>
        <button className="btn btn-info" onClick={() => {
          this.setState({selection: 'about'});
        }}>
          About
        </button>
      </div>
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
          <div className="difficultySelector col-xs-6">
            <h4>
              Select difficulty
            </h4>
            <div className="topDownBtnGroup">
              {difficulties.map((diff) => {
                return (<button
                  key={diff}
                  className={`btn btn-info ${this.state.difficulty === diff && 'active'}`}
                  onClick={() => {
                    this.setState({difficulty: diff});
                  }}
                >{diff.toLowerCase()}</button>);
              })}
            </div>
          </div>
          <div className="mapSizeSelector col-xs-6">
            <h4>
              Select map size
            </h4>
            <div className="topDownBtnGroup">
              {mapSizes.map((size) => {
                return (<button
                  key={size}
                  className={`btn btn-info ${this.state.mapSize === size && 'active'}`}
                  onClick={() => {
                    this.setState({mapSize: size});
                  }}
                >{size.toLowerCase()}</button>);
              })}
            </div>
          </div>
        </div>
        <div className="startGame">
          <button
            className={'btn btn-primary'}
            onClick={() => {
              this.props.onQuickStart(this.state);
            }}>
            Quick start
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="modal show mainMenuModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {`Welcome to Planet Escape (version ${version})`}
            </div>
            <div className="modal-body">
              <div className="topDownBtnGroup">
                {this.topMenu()}
                {this.quickStartSelection()}
                {this.help()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _render() {
    return (<div className="modal show mainMenuModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {`Welcome to Planet Escape (version ${version})`}
          </div>
          <div className="modal-body">
            <div>
              <div className="row">
                <div className="difficultySelector col-xs-6">
                  <h4>
                    Select difficulty
                  </h4>
                  <div className="topDownBtnGroup">
                    {difficulties.map((diff) => {
                      return (<button
                        key={diff}
                        className={`btn btn-info ${this.state.difficulty === diff && 'active'}`}
                        onClick={() => {
                          this.setState({difficulty: diff});
                        }}
                      >{diff.toLowerCase()}</button>);
                    })}
                  </div>
                </div>
                <div className="mapSizeSelector col-xs-6">
                  <h4>
                    Select map size
                  </h4>
                  <div className="topDownBtnGroup">
                    {mapSizes.map((size) => {
                      return (<button
                        key={size}
                        className={`btn btn-info ${this.state.mapSize === size && 'active'}`}
                        onClick={() => {
                          this.setState({mapSize: size});
                        }}
                      >{size.toLowerCase()}</button>);
                    })}
                  </div>
                </div>
              </div>
              <div className="startGame">
                <button
                  className={'btn btn-primary'}
                  onClick={() => {
                    this.props.onQuickStart(this.state);
                  }}>
                  Quick start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default MainMenu;