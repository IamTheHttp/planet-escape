import React from 'react';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: true
    };
  }
  render() {
    if (this.state.isOpen) {
      return (
        <div className="minimapSection">
          <button
            className="contractMinimap"
            onClick={() => {
              this.setState({isOpen : false});
            }}
          >
            <span className="glyphicon glyphicon-resize-small"></span>
          </button>
          {this.props.canvasReactElement}
        </div>
      );
    } else {
      return (
        <div className="minimapSection minimized">
          <button
            onClick={() => {
              this.setState({isOpen : true});
            }}
          >
            <span className="glyphicon glyphicon-resize-full"></span>
          </button>
        </div>
      );
    }
  }
}

export default Sidebar;