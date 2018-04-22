import React from 'react';

class MainMenuBtn extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        id="backToMainMenu"
        className="btn btn-default"
        type="button"
      >
        <span className="glyphicon glyphicon-menu-hamburger"></span>
      </button>
    );
  }
}

export default MainMenuBtn;