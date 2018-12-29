import './minimap.scss';
import React from 'react';

class Minimap extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: true
    };
  }

  isHidden() {
    return this.props.currentLevelData && this.props.currentLevelData.mapScale === 0.5;
  }

  render() {
    let cls = '';
    if (this.isHidden()) {
      cls = 'hidden';
    }

    if (this.state.isOpen) {
      return (
        <div className={`minimapSection ${cls}`}>
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
        <div className={`minimapSection minimized ${cls}`}>
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