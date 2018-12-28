import './minimap.scss';
import React from 'react';

class Minimap extends React.Component {
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
            <div className="">-</div>
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
            <div className="">+</div>
          </button>
        </div>
      );
    }
  }
}

export default Minimap;