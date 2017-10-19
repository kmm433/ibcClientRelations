import React from 'react';
import {ButtonGroup, DropdownButton, Button, MenuItem} from 'react-bootstrap';

//dropdown for displaying a given list of options
class DropDown extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            display: ""
        }

        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({display: nextProps.default})
    }

    handleSelect(evt){
        this.props.selecting(evt);
    }

    render(){
        return(

            <ButtonGroup>
                <DropdownButton
                    id="dropdown-btn"
                    bsSize="xsmall"
                    title={this.state.display}
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
