import React from 'react';

class Help extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    console.log("HELLO STEF");
    return(
      <div className="notice">
        <div className="notice-title">
          <h2>Hello</h2>
        </div>
        <div className="notice-content">
          <p>asdasdas</p>
        </div>
      </div>
    );

}



};
export default Help;
