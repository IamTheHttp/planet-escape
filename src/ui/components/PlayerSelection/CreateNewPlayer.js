import React from 'react';
import i18n from 'ui/i18n';
import playerService from 'services/PlayerService';

class CreateNewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      userName:''
    };
  }

  render() {
    return (
      <div className="splashMenu gamePaused">
        <div className="menuHeader">
          {i18n.createNewUser}
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
          <button className="btnItem" onClick={() => {
            if (playerService.validateUsername(this.state.inputValue)) {
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