import React from 'react';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="col-xs-3 sidebar">
        <div className="row">
          {this.props.canvasElm}
        </div>
      </div>
    );
  }
}

export default Sidebar;