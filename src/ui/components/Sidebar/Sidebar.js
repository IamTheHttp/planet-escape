import React from 'react';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="col-xs-3 sidebar hidden">
          {this.props.canvasElm}
      </div>
    );
  }
}

export default Sidebar;