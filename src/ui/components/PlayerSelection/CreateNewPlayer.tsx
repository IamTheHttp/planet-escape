import React from 'react';
import i18n from 'ui/i18n';
import playerService from 'services/PlayerService';
import './createNewPlayer.scss';

interface IProps {
  onSubmit: (inputValue: string) => void;
}

interface IState {
  inputValue: string;
}

class createNewPlayer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      inputValue: ''
    };
  }

  submitForm() {
    let isInputValid = playerService.validateUsername(this.state.inputValue);
    if (isInputValid) {
      this.props.onSubmit(this.state.inputValue);
    }
  }

  render() {
    let isInputValid = playerService.validateUsername(this.state.inputValue);

    return (
      <div className="createNewPlayer centered md">
        <div className="menuHeader">
          {playerService.getRegisteredPlayers().length ? i18n.createNewPlayer : i18n.createPlayerIntro}
        </div>
        <div className="">
          <div className="inputSection">
            <input
              className="btnItem playerUserName"
              type="text"
              placeholder={i18n.enterUsername}
              onChange={(event) => {
                this.setState({inputValue: event.target.value});
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  this.submitForm();
                }
              }}
            >
            </input>
            <div className={isInputValid ? 'lenHelper' : 'tooShort lenHelper' }>
              {i18n.aFewMoreLetters}
            </div>
          </div>
          <div className="createPLayerSection">
            <button className="btnItem createPLayerBtn" onClick={this.submitForm}>
              {i18n.create}
            </button>
          </div>

        </div>
      </div>
    );
  }
}

export default createNewPlayer;