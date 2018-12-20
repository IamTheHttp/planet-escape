import React from 'react';
import i18n from 'ui/i18n';
import './Modal.scss';

class Modal extends React.Component {
  render() {
    return (
      <div className="endGame">
        <div className="content">
          <div className="stats pull-left">
            <span className={this.props.gameWon ? 'gameWon' : 'gameLost'}>{this.props.text}</span>
            {this.props.children}
          </div>
          <div className="menuButtons pull-right">
            <button
              onClick={this.props.onClick}
              className="btnItem restart">{i18n.restart}
            </button>
            {
              this.props.nextLevel &&
              <button
                onClick={this.props.onNextLevel}
                className="btnItem nextLevel">{i18n.nextLevel}
              </button>
            }
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