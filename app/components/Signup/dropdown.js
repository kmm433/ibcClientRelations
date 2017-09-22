import React from 'react';
import {ButtonGroup, DropdownButton, Button, MenuItem} from 'react-bootstrap';

class DropDown extends React.Component {
    constructor(props){
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(evt){
        console.log(evt);
        var type = evt;
        this.props.selecting(type);
    }

    render(){
        return(
            <ButtonGroup>
                <DropdownButton
                    id="dropdown-btn"
                    bsSize="xsmall"
                    title={this.props.default}
                    onSelect={this.handleSelect}>
                {this.props.typeOptions.map((item,index) =>
                <MenuItem
                    key = {index}
                    eventKey={item}>
                    {item}
                </MenuItem>)}
                </DropdownButton>
              </ButtonGroup>
        )
    }
}

export default DropDown;
