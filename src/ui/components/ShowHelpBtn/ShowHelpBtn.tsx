import React from 'react';
import i18n from 'ui/i18n';

interface IProps {
  onClick: () => void;
}
class ShowHelpBtn extends React.Component<IProps> {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className="inGameBtn"
        type="button"
      >
        <span className="">{i18n.inGameHelp}</span>
      </button>
    );
  }
}

export default ShowHelpBtn;