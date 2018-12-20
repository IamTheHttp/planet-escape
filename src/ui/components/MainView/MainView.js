import React from 'react';

class MainView extends React.Component {
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
  render() {
    return (
      <div
        className="main"
        ref={(el) => {
          if (el) {
            this.el = el;
          }
        }}
      >
        {this.props.canvasElm}
      </div>
    );
  }
}

export default MainView;