import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';
import {ButtonGroup, DropdownButton, Button, MenuItem} from 'react-bootstrap';
import Middle from './SignupRetrieveFields.js';

var optionsArray = []

class ChamberDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        chamber: "",
        selected: 'Please Select a Chamber',
        renderForm: false

    };

    this.handleSelect = this.handleSelect.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    optionsArray=nextProps.chamber_list;
  }

  handleSelect(evt){
      this.setState({
          selected: optionsArray[evt],
          chamber: evt,
          renderForm: true
      });

  }

  render() {
    return (
        <div>
            <ButtonGroup className="signup-dropdown">
                <DropdownButton id="dropdown-btn-menu" bsStyle="success" title={this.state.selected} onSelect={this.handleSelect}>
                    {Object.keys(optionsArray).map((item,index) =>
                        <MenuItem key = {index} eventKey={item}>{optionsArray[item]}</MenuItem>)}
                </DropdownButton>
              </ButtonGroup>
              {console.log("The chamber selected from the dropdown",this.state.chamber)}
              {this.state.renderForm ? <Middle chamberID={this.state.chamber}/> : null}
        </div>
    );
  }
}

export default ChamberDropdown;
