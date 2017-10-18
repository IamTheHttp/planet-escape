import React from 'react';
import './mainMenu.scss';

let options = ['start', 'help - TODO', 'about - TODO', 'exit - TODO'];
import {
  TINY,
  MEDIUM,
  SMALL,
  LARGE,
  EASY,
  CHALLENGING,
  HARD
} from 'gameEngine/constants';
class MainMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      easy:true,
      tiny:true,
      mapSize : TINY,
      difficulty : EASY
    };
  }
  render() {
    return (<div className="modal show mainMenuModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {'Welcome to Planet Escape'}
          </div>
          <div className="modal-body">
            <div>
              <div>
                <div className="difficultySelector">
                  <h4>
                    Select difficulty
                  </h4>
                  <div className="topDownBtnGroup">
                    <button
                      className={`btn btn-success ${this.state.easy && 'active'}`}
                      onClick={() => {
                        this.setState({easy:true, challenging:false, hard:false, difficulty : EASY});
                      }}
                    >{EASY.toLowerCase()}</button>
                    <button
                      className={`btn btn-warning ${this.state.challenging && 'active'}`}
                      onClick={() => {
                        this.setState({easy:false, challenging:true, hard:false, difficulty : CHALLENGING});
                      }}
                    >{CHALLENGING.toLowerCase()}</button>
                    <button
                      className={`btn btn-danger ${this.state.hard && 'active'}`}
                      onClick={() => {
                        this.setState({easy:false, challenging:false, hard:true, difficulty : HARD});
                      }}
                    >{HARD.toLowerCase()}</button>
                  </div>
                </div>
                <div className="mapSizeSelector">
                  <h4>
                    Select map size
                  </h4>
                  <div className="topDownBtnGroup">
                    <button
                      className={`btn btn-info ${this.state.tiny && 'active'}`}
                      onClick={() => {
                        this.setState({tiny:true, small:false, medium:false, large:false, mapSize:TINY});
                      }}
                    >{TINY.toLowerCase()}</button>
                    <button
                      className={`btn btn-info ${this.state.small && 'active'}`}
                      onClick={() => {
                        this.setState({tiny:false, small:true, medium:false, large:false, mapSize:SMALL});
                      }}
                    >{SMALL.toLowerCase()}</button>
                    <button
                      className={`btn btn-info ${this.state.medium && 'active'}`}
                      onClick={() => {
                        this.setState({tiny:false, small:false, medium:true, large:false, mapSize:MEDIUM});
                      }}
                    >{MEDIUM.toLowerCase()}</button>
                    <button
                      className={`btn btn-info ${this.state.large && 'active'}`}
                      onClick={() => {
                        this.setState({tiny:false, small:false, medium:false, large:true, mapSize:LARGE});
                      }}
                    >{LARGE.toLowerCase()}</button>
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