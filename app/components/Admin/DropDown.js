import React from 'react';
import {Form, FormGroup, Col, ControlLabel, Checkbox, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';


//this is a drop down menu for a list of chambers
//(depending on the array it is sent could be parents or active)
class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        display: "Please Select a Chamber",
        submitReady: false
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(evt){
      this.setState({
          display: this.props.chamber_list[evt]
      })
      this.props.save(evt);
  }

  render() {
    return (
        <div>
            <FormGroup>
            <Col sm={3}>
                    <ControlLabel>
                        {this.props.label}
                    </ControlLabel>
            </Col>
                <Col sm={9}>
                    <ButtonGroup className="signup-dropdown">
                        <DropdownButton
                            id="dropdown-btn-menu"
                            bsStyle="success"
                            title={this.state.display}
                            onSelect={this.handleSelect}>
                            {Object.keys(this.props.chamber_list).map((item,index) =>
                                <MenuItem
                                    key = {index}
                                    eventKey={item}>{this.props.chamber_list[item]}
                                </MenuItem>)}
                        </DropdownButton>
                        </ButtonGroup>
                </Col>
            </FormGroup>
        </div>
    );
  }
}

export default DropDown;
