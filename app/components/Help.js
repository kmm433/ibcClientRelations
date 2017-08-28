import React from 'react';

class help extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    console.log("HELLO STEF");
    return(
      <div className="HelpPage">
        <div>
        <h1> Frequently Asked Questions </h1>
        </div>
          <br /> <br />
        <div>
          Question: How do i create a survey?
        </div>
          <br />
        <div>
          Answer: Only Illawarra Business chamber is able to create a survey. These are then approved by the chambers for their members to answer
        </div>
          <br /> <br />
        <div>
          Question:
        </div>
          <br />
        <div>
          Answer:
        </div>
          <br /> <br />
        <div>
          Question:
        </div>
          <br />
        <div>
          Answer:
        </div>
          <br /> <br />
        <div>
          Question: How do i create a survey?
        </div>
        <br />
        <div>
          Answer:
      </div>
    </div>
    );

}
};
export default help;
