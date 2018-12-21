import React from 'react';
import i18n from 'ui/i18n';
import CreateNewUser from './CreateNewPlayer';
import playerService from 'services/PlayerService';

class UserSelection extends React.Component {
  constructor() {
    super();
    this.state = {
      createUser: false
    };
  }

  render() {
    if (this.state.createUser) {
      return <CreateNewUser
        onSubmit={(userName) => {
          playerService.createPlayer(userName);
          playerService.selectPlayer(userName);
          this.setState({
            createUser: false
          });

          this.props.onPlayerSelect(playerService.getSelectedPlayer());
        }}
      ></CreateNewUser>;
    } else {
      return (
        <div className="splashMenu gamePaused">
          <div className="menuHeader">
            {i18n.selectUser}
          </div>
          <div className="menuButtons">
            <button className="btnItem createUserBtn" onClick={() => {
              this.setState({
                createUser: true
              });
            }}>
              {i18n.createNewUser}
            </button>
          </div>
        </div>
      );
    }
  }
}

export default UserSelection;