import React from 'react';
import {FormControl, FormGroup, HelpBlock} from 'react-bootstrap';

class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.renderValue = this.renderValue.bind(this);
  }

  // Render's either a view of the data or an editable field
  renderValue() {
    if (!this.props.editable) {
      if (this.props.details['value'])
        return this.props.details['value'];
      else
        return (<i>No Record</i>);
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
        <div className='member-detail'>
          {this.props.displayname}
        </div>
        <div className='member-detail-value'>
          {this.renderValue()}
        </div>
      </div>

    );
  }
};

export default Detail;
