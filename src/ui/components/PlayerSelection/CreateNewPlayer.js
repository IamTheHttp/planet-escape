import React from 'react';
import i18n from 'ui/i18n';
import playerService from 'services/PlayerService';
import './createNewPlayer.scss';

class CreateNewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue:''
    };
  }

  render() {
    let isInputValid = playerService.validateUsername(this.state.inputValue);

    return (
      <div className="splashMenu gamePaused createNewPlayer">
        <div className="menuHeader">
          {playerService.getRegisteredPlayers().length ? i18n.createNewUser : i18n.createPlayerIntro}
        </div>
        <div className="menuButtons">
          <input
            className="btnItem"
            type="text"
            placeholder={i18n.enterUsername}
            onChange={(event) => {
              this.setState({inputValue: event.target.value});
            }}
          >
          </input>
          <div className={isInputValid ? 'lenHelper' : 'tooShort lenHelper' }>
            {i18n.aFewMoreLetters}
          </div>
          <button className="btnItem" onClick={() => {
            if (isInputValid) {
              this.props.onSubmit(this.state.inputValue);
            }
          }}>
            {i18n.create}
          </button>
        </div>
      </div>
    );
  }
}

export default CreateNewUser;