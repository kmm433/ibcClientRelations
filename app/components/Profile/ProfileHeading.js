import React from 'react';

class ProfileHeading extends React.Component {


  render(){
    return(
      <div>
        <h1> {this.props.text} </h1>
        { this.renderButton() }
      </div>
    );
  }

  renderButton() {
    if (!this.props.messageURL) {
      return null;
    }

    return(
       <button onClick={ () => location.href = this.props.messageURL }>
         Send Message
       </button>
    );
  }
};

export default ProfileHeading;
