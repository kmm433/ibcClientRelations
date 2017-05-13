import React from 'react';

class Notice extends React.Component {
  render(){
    return(
      <div className="notice">
        <div className="notice-title">
          <h2>{this.props.title}</h2>
        </div>
        <div className="notice-content">
          <p>{this.props.message}</p>
        </div>
      </div>
    );
  }
};

export default Notice;
