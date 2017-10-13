import React from 'react';
class Modal extends React.Component {
  render() {
    return (<div className="modal show">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {this.props.text}
          </div>
          <div className="modal-body">
            <button onClick={this.props.onClick} className="btn btn-primary">restart</button>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Modal;