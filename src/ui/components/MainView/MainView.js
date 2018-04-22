import React from 'react';

class MainView extends React.Component {
  render() {
    return (
      <div className="col-xs-9 main">
        <div className="row">
          {this.props.canvasElm}
        </div>
      </div>
    );
  }
}

export default MainView;