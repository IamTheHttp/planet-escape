import React from 'react';
import './sideMenu.css';
import PlanetListItem from 'ui/components/PlanetList/PlanetListItem';
class PlanetList extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(entityID) {
    this.props.onClick(entityID);
    this.setState({clickedEntity : entityID});
  }

  render() {
    let arr = [];
    for (let id in this.props.planets) {
      arr.push(<PlanetListItem
        key={id}
        isFocused={this.state.clickedEntity === id}
        planet={this.props.planets[id]}
        onClick={this.handleClick}
      >
      </PlanetListItem>);
    }

    return (
      <div className="sideMenu">
        {arr}
      </div>
    );
  }
}

export default PlanetList;