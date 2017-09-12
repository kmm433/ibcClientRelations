import React from 'react';

class Note extends React.Component {
  render() {
    return (
      <div className='panel panel-default note'>
        <div className='panel-heading'>
          <h5><b>{this.props.user}</b> on <i>{this.props.timestamp}</i></h5>
        </div>
        <div className='panel-body'>
          <p>{this.props.note}</p>
        </div>
      </div>
    );
  }
};

export default Note;
