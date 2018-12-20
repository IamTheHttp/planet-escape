import React from 'react';
import i18n from 'ui/i18n';
import './Modal.scss';

class Modal extends React.Component {
  render() {
    return (<div className="modal show endModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <span className={this.props.gameWon ? 'gameWon' : 'gameLost'}>{this.props.text}</span>
            {this.props.children}
          </div>
          <div className="modal-body">
            <button onClick={this.props.onClick} className="btn btn-primary restart">{i18n.restart}</button>
            {
              this.props.nextLevel &&
              <button onClick={this.props.onNextLevel} className="btn btn-primary nextLevel">{i18n.nextLevel}</button>
            }
            <button onClick={this.props.backToMainMenu} className="btn btn-primary mainMenu">{i18n.mainMenu}</button>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Modal;