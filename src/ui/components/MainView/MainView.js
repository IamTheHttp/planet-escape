import './mainView.scss';
import React from 'react';

class MainView extends React.Component {
  constructor(props) {
    super();

    this.state = {
      showLevelHints: props.showLevelHints
    };
  }

  componentWillReceiveProps(props) {
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