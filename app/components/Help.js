import React from 'react';

class Help extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    console.log("HELLO STEF");
    return(
      <div className="notice">
        <div  className="notice-title">
      <div className="HelpPage">
        <h1> Frequently Asked Questions </h1>

<p>1. A question goes here</p>
<p>An answer goes in here</p>

        </div>
      </div>
    </div>
    );

}
};
export default Help;
