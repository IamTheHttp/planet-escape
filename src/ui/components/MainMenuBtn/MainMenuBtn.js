import React from 'react';
import i18n from 'ui/i18n';
class MainMenuBtn extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        id="backToMainMenu"
        type="button"
      >
        <span className="">{i18n.menu}</span>
      </button>
    );
  }
}

export default MainMenuBtn;