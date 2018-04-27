import React from 'react';

class HintsList extends React.Component {
  render() {
    // TODO Add tiny images to this section that represent
    return (
      <div className="hintList">
        <h3>Hints:</h3>
        <ol>
          <li>Tap to select.</li>
          <li>Tap to attack.</li>
          <li>Double tap selects all.</li>
        </ol>
      </div>
    );
  }
}

export default HintsList;