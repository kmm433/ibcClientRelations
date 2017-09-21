import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';
import {ButtonGroup, DropdownButton, Button, MenuItem} from 'react-bootstrap';


class ChamberDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(evt){
      this.props.sendChamber(evt);
  }

  render() {
    return (
        <div>
            <ButtonGroup className="signup-dropdown">
                <DropdownButton
                    id="dropdown-btn-menu"
                    bsStyle="success"
                    title={this.props.selectedChamber ? this.props.selectedChamber : "Please Select a Chamber"}
                    onSelect={this.handleSelect}>
                    {Object.keys(this.props.chamber_list).map((item,index) =>
                        <MenuItem key = {index}
                            eventKey={item}>{this.props.chamber_list[item]}
                        </MenuItem>)}
                </DropdownButton>
                </ButtonGroup>
        </div>
    );
  }
}

export default ChamberDropdown;
