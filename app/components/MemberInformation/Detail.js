import React from 'react';
import {FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import {isEmail, isNumeric, isLength} from 'validator';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error_message: '',
      valid_state: null,
    };
    this.getValidationState = this.getValidationState.bind(this);
    this.updateDetail = this.updateDetail.bind(this);
    this.renderValue = this.renderValue.bind(this);

    moment.locale('en-au');
  }

  // Validates the user input
  getValidationState(value) {
    var valid = 'success';
    if (this.props.details.columnname == 'email') {
      if(!isEmail(value)) {
        valid = 'error';
        this.setState({error_message: 'Invalid email address'});
      }
    }
    if (this.props.details.inputtype == 'number') {
      if(!isNumeric(value)) {
        valid = 'error';
        this.setState({error_message: 'Invalid value. Must be a number'});
      }
    }
    if (!isLength(value, {min:this.props.details.minimim, max:this.props.details.maximum})) {
      valid = 'error';
      this.setState({error_message: 'Invalid value. Length is not acceptable.'});
    }
    if (valid === 'success') {
      this.setState({error_message: ''});
    }
    this.setState({valid_state: valid});
  }

  updateDetail(event) {
    this.props.updateDetail(event.target.value, this.props.displayname);
    this.getValidationState(event.target.value);
  }

  updateDate(date) {
    this.props.updateDetail(date, this.props.displayname);
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
      if (this.props.details.inputtype !== 'date') {
        return (
          <FormGroup
            controlId={this.props.columname}
            validationState={this.state.valid_state}
          >
            <FormControl
              type='text'
              value={this.props.details['value']}
              onChange={e => this.updateDetail(e)}
              disabled={this.props.details['disabled']? true:null}
            />
            <HelpBlock>{this.state.error_message}</HelpBlock>
          </FormGroup>
        );
      }
      else {
        return (
          <DatePicker className='form-control'
            selected={this.props.details.value? moment(this.props.details.value): ''}
            onChange={this.updateDate}
            placeholderText='Date...'
          />
        );
      }
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
