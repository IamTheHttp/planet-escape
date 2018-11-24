import React from 'react';
import i18n from 'ui/i18n';
class Modal extends React.Component {
  render() {
    return (<div className="modal show">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {this.props.text}
            {this.props.children}
          </div>
          <div className="modal-body">
            <button onClick={this.props.onClick} className="btn btn-primary">{i18n.restart}</button>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Modal;