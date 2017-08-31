import React from 'react';

class SocialLinks extends React.Component {
  render(){
    return(
      <table>
        <tr>
          <td>
            <button onClick={ () => location.href = this.props.fbURL }>
            FB
          </button>
          </td>
          <td>
            <button onClick={ () => location.href = this.props.twtURL }>
            Twitter
          </button>
          </td>
          <td>
            <button onClick={ () => location.href = this.props.liURL }>
            LinkedIn
          </button>
          </td>
        </tr>
      </table>
    );
  }
};

export default SocialLinks;