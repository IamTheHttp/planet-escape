import React from 'react';
import i18n from 'ui/i18n';
import './Modal.scss';
import {ILevelData} from "../../../d.ts/interfaces";

interface IProps {
  gameWon: boolean;
  text: string;
  nextLevel:ILevelData
  onNextLevel: () => void;
  onRestart: () => void;
  backToMainMenu: () => void;
}

interface IState {

}


class Modal extends React.Component<IProps, IState> {
  render() {
    let cls = `endGame ${this.props.gameWon ? 'gameWon' : 'gameLost'}`;

    return (
      <div className={cls}>
        <div className="content bordered">
          <div className="stats pull-left">
            <span className="title">{this.props.text}</span>
            {this.props.children}
          </div>
          <div className="btnList pull-right">
            {
              this.props.nextLevel &&
              <button
                onClick={this.props.onNextLevel}
                className="btnItem nextLevel">{i18n.nextLevel}
              </button>
            }
            <button
              onClick={this.props.onRestart}
              className="btnItem restart">{i18n.restart}
            </button>
            <button
              onClick={this.props.backToMainMenu}
              className="btnItem mainMenu">{i18n.mainMenu}
            </button>
          </div>
        </div>
      </div>);
  }
}

export default Modal;