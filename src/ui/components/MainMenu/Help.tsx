import React from 'react';
import earthImage from '../../../../src/assets/player1.png';
import alienImage from '../../../../src/assets/player2.png';

import i18n from 'ui/i18n';

interface IProps {
  levelHints: string[];
  onClick: () => void;
}

class Help extends React.Component<IProps> {
  renderHelp() {
    return (
      <div className="helpSection">
        <div>General help:</div>
        <ul>
          <li>Tap one of your planets <img className="inlineImage" src={earthImage}/> to select.
          </li>
          <li>Tap enemy planet <img className="inlineImage" src={alienImage}/> to attack.</li>
          <li>Double tap on one of your planets to selects all.</li>
        </ul>
      </div>
    );
  }

  renderLevelHelp() {
    if (this.props.levelHints) {
      return (
        <div>
          <div>Level hints:</div>
          <ul>
            {
              this.props.levelHints.map((item, i) => {
                return (<li className="hint" key={i}>{item}</li>);
              })
            }
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="showHelp centered md bordered">
        <div className="menuHeader">{i18n.gamePaused}</div>
        {this.renderHelp()}
        {this.renderLevelHelp()}
        <button className="btnItem" onClick={this.props.onClick}>
          {i18n.resumeGame}
        </button>
      </div>
    );
  }
}

export default Help;