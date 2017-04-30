import React from 'react';
import './summaryBar.css';
class SummaryBar extends React.Component{

  render(){
    return(
      <div className="col-sm-12 summaryBar">
        <span>Population:</span><span>{this.props.totalPop.toFixed(0)}</span>&nbsp;
        <span>Income:</span><span>+{this.props.totalIncome.toFixed(0)}/mo</span>&nbsp;
        <span>gold:</span><span>{this.props.gold.toFixed(0)}</span>&nbsp;
      </div>
    )
  }
}

SummaryBar.defaultProps = {
  totalPop : 0,
  totalIncome : 0,
  gold:0
};

export default SummaryBar;