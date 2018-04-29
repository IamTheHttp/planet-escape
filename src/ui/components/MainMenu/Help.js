import React from 'react';
import earthImage from 'assets/player1.png';
import alienImage from 'assets/player2.png';
class Help extends React.Component {
  render() {
    // TODO Add tiny images to this section that represent
    return (
      <div className="helpSection col-xs-offset-3 col-xs-6">
        <div>Hints:</div>
        <ul>
          <li>Tap one of your planets <img className="inlineImage" src={earthImage}/> to select</li>
          <li>Tap enemy planet <img className="inlineImage" src={alienImage}/> to attack</li>
          <li>Double tap on one of your planets to selects all.</li>
        </ul>
      </div>
    );
  }
}

export default Help;