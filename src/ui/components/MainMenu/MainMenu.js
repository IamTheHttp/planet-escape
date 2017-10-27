import React from 'react';
import './mainMenu.scss';
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
let diffs = [EASY, CHALLENGING, HARD];

class MainMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      mapSize : TINY,
      difficulty : EASY
    };
  }
  render() {
    return (<div className="modal show mainMenuModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {`Welcome to Planet Escape (version ${version})`}
          </div>
          <div className="modal-body">
            <div>
              <div>
                <div className="difficultySelector">
                  <h4>
                    Select difficulty
                  </h4>
                  <div className="topDownBtnGroup">
                    {diffs.map((diff) => {
                      return (<button
                        key={diff}
                        className={`btn btn-info ${this.state.difficulty === diff && 'active'}`}
                        onClick={() => {
                          this.setState({difficulty:diff});
                        }}
                      >{diff.toLowerCase()}</button>);
                    })}
                  </div>
                </div>
                <div className="mapSizeSelector">
                  <h4>
                    Select map size
                  </h4>
                  <div className="topDownBtnGroup">
                    {mapSizes.map((size) => {
                      return (<button
                        key={size}
                        className={`btn btn-info ${this.state.mapSize === size && 'active'}`}
                        onClick={() => {
                          this.setState({mapSize:size});
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
                    this.props.onStart(this.state);
                  }}>
                  Start
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