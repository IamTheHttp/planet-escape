import React from 'react';
import './CookiePolicy.scss';

class CookiePolicy extends React.Component {
  constructor(props) {
    super();
    let cookieAccepted;

    this.cookieName = 'PE_AC';
    this.handleClick = this.handleClick.bind(this);

    if (document.cookie && document.cookie.indexOf) {
      cookieAccepted = document.cookie.indexOf(this.cookieName) >= 0;
    }

    this.state = {
      cookieAccepted
    };
  }

  handleClick() {
    document.cookie = 'PE_AC=1';
    this.setState({
      cookieAccepted:true
    });
  }

  render() {
    if (!this.state.cookieAccepted) {
      return (
        <div className="cookiePolicy">
          <div>This site uses cookies for the following reasons:</div>
          <div>Analytics - We track how players interact with the game</div>
          <div>Functional - We store your in-game progress on your device</div>
          <div>By playing you agree to allow the website to collect this information</div>
          <button
            className="btnItem"
            onClick={this.handleClick}
          >Got it</button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CookiePolicy;