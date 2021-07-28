import React from 'react';
import i18n from 'ui/i18n';

class IProps {
  onClick: () => void;
}

class MainMenuBtn extends React.Component<IProps> {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className="inGameBtn"
        type="button"
      >
        <span className="">{i18n.menu}</span>
      </button>
    );
  }
}

export default MainMenuBtn;