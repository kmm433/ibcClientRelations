import React from 'react';

class ProfileLogo extends React.Component {
  render(){
    return(
      <div>
        <button onClick={ () => location.href = this.props.profileImg }>
          Profile Logo
        </button>

      </div>
    );
  }
};

export default ProfileLogo;
