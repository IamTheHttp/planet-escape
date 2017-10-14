import React from 'react';
import './mainMenu.scss';

// TODO - we'll obviously won't use these hard coded strings..
let options = ['start', 'help - TODO', 'about - TODO', 'exit - TODO'];
class MainMenu extends React.Component {
  render() {
    return (<div className="modal show mainMenuModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {'Welcome to Planet Escape'}
          </div>
          <div className="modal-body">
            <ul>
              {options.map((item, index) => {
                return (<li
                  key={index}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.props.onClick(item);
                    }}
                  >
                    {item.toUpperCase()}
                  </button>
                </li>);
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default MainMenu;