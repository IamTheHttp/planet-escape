import './minimap.scss';
import React from 'react';
import {ILevelData} from "../../../d.ts/interfaces";




interface IProps {
  currentLevelData: ILevelData;
  canvasReactElement: HTMLCanvasElement;
}

interface IState {
  isOpen: boolean;
}

class Minimap extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
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