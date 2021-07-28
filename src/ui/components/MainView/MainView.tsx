import './mainView.scss';
import React from 'react';
import CanvasAPI from "game-platform/types/lib/CanvasAPI/CanvasAPI";

interface IProps {
  levelHints: string[];
  showLevelHints: boolean;
  newWidthToHeight: number;
  widthToHeight:number;
  newWidth:number;
  newHeight:number;
  onLevelHintsApproved: () => void;
  canvasElm: HTMLCanvasElement;
  viewMapCanvasAPI: CanvasAPI;
};

interface IState {
  showLevelHints: boolean;
}

class MainView extends React.Component<IProps, IState> {
  private el?:HTMLElement;
  constructor(props: IProps) {
    super(props);

    this.state = {
      showLevelHints: props.showLevelHints
    };
  }

  componentWillReceiveProps(props: IProps) {
    let {newWidthToHeight, widthToHeight, newWidth, newHeight} = props;

    /* istanbul ignore next */
    if (this.el) {
      let gameArea = this.el;

      if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = `${newHeight}px`;
        gameArea.style.width = `${newWidth}px`;
      } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.height = `${newHeight}px`;
        gameArea.style.width = `${newWidth}px`;
      }

      gameArea.style.marginTop = `${(-newHeight / 2)}px`;
      gameArea.style.marginLeft = `${(-newWidth / 2)}px`;
    }
  }

  renderLevelHints() {
    if (this.state.showLevelHints) {
      return (
        <div className="hintsContainer bordered">
          <ul>
            {
              this.props.levelHints.map((item, i) => {
                return (<li key={i}>{item}</li>);
              })
            }
          </ul>
          <button className="btnItem"
            onClick={() => {
              this.setState({
                showLevelHints: false
              });
              this.props.onLevelHintsApproved();
            }}
          >Got it</button>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div
        className="canvasContainer"
        ref={(el) => {
          if (el) {
            this.el = el;
          }
        }}
      >
        {this.renderLevelHints()}
        {this.props.canvasElm}
      </div>
    );
  }
}

export default MainView;