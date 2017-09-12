import React from 'react';

class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.renderValue = this.renderValue.bind(this);
  }

  // Render's either a view of the data or an editable field
  renderValue() {
    if (!this.props.editable) {
      return (
        <p>
          {this.props.details['value'] ?
            this.props.details['value'] :
            <i>No Record</i>
          }
        </p>
      );
    }
    else {
      return (
        <input
          type='text'
          value={this.props.details['value']}
          onChange={(e) => this.props.updateDetail(e, this.props.displayname)}
        />
      );
    }
  }

  render() {
    return (
      <div className='detail'>
        <h5>{this.props.displayname}</h5>
        {this.renderValue()}
      </div>

    );
  }
};

export default Detail;
