import React from 'react';

class ProfileActions extends React.Component {

  render(){
    return(
      <div>
            { this.renderButton() }
      </div>
    );
  }
    renderButton(){
      if (!this.props.editDetails){
        return null;
      }
      return(
        <button onClick={() => location.href = this.props.editDetails}>
          Edit Page
        </button>
      );
  }
};

export default ProfileActions;
