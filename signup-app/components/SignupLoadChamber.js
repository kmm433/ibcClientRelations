import React from 'react';
import Logo from './LogoHeader.js'
import SignupData from './SignupDataHandler.js';
import $ from 'jquery';
import {ButtonToolbar, Button, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';

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
                        <MenuItem
                            key = {index}
                            eventKey={item}>{this.props.chamber_list[item]}
                        </MenuItem>)}
                </DropdownButton>
                </ButtonGroup>
        </div>
    );
  }
}

class Main extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          chamber_list: [],
          chamber: "Please Select a Chamber",
          selected: false
        };

        this.getChamber = this.getChamber.bind(this);
    }

    /*ajax call to get list of chambers to display*/
    componentWillMount() {
      $.ajax({url: '/php/chamber_list.php', type: 'POST', dataType: 'json',
      success: response => {
        console.log('Ajax call occured', response);
        this.setState({chamber_list: response})
      }});
    }

    getChamber(newChamber){
        console.log("Is this updating?", newChamber)
        this.setState({
            chamber: newChamber,
            selected: true
        })
    }


  render() {
    return(
      <div className="establish-fonts">
          <div className="w3-panel w3-blue">
              <Logo/>
          </div>
          <ButtonToolbar>
              <Button style={{'marginLeft': '3%'}}>
                     <a href="/signin.php">Back to Login</a>
             </Button>
              <ChamberDropdown
                  selectedChamber={this.state.chamber_list[this.state.chamber]}
                  chamber_list={this.state.chamber_list}
                  sendChamber={this.getChamber}/>
          </ButtonToolbar>
          {this.state.selected && <SignupData chamberID={this.state.chamber}/>}
      </div>
    )
  }
}

export default Main;
