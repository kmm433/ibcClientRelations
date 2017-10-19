import React from 'react';
import $ from 'jquery';
import {Form, Button, FormGroup, ControlLabel, Col, DropdownButton, ButtonGroup, MenuItem} from 'react-bootstrap';
import ActiveChamberTable from './ActiveChambers.js'

//Dropdown menu for selecting a chamber to disable
class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        display: "Please Select a Chamber",
        chamber: ""
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

  handleSelect(evt){
      this.setState({
          display: this.props.chamber_list[evt],
          chamber: evt
      })
  }
//handle submission of disabling a chamber, ask user to confirm they want
  handleSubmit(){
      if(confirm("Are you sure you want to disable this chamber?") === true){
          $.ajax({url: '/php/disable_chamber.php', type: 'POST',
              dataType: 'json',
              data: {'chamber': this.state.chamber},
          success: response => {
              var mess = this.state.display + " was successfully disabled";
              this.setState({display: "Please Select a Chamber"})
              this.props.message(mess);
          },
          error: (xhr, status, err) => {
              var mess = this.state.display + " an error occured, the chamber was no disabled";
              this.props.message(mess);
          }
          });
      }
      else {
          console.log("")
      }
  }
//render the buttons and menu for disabling a chamber
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
                        <Button bsStyle='danger' onClick={this.handleSubmit}>
                            Disable
                        </Button>
                        </ButtonGroup>
                </Col>
            </FormGroup>
        </div>
    );
  }
}

//component for disabling a chamber
class DisableChamber extends React.Component{

    constructor(){
        super()

        this.state = {
            loaded: false,
            loaded1: false,
            chamberList: "",
            chamber: "",
            successMessage: "",
            activeChambers: {
                chamber: [],
                parent: []
            }
        }

        this.getChamberList = this.getChamberList.bind(this);
        this.getSelectedChamber = this.getSelectedChamber.bind(this);
        this.wasDisabled = this.wasDisabled.bind(this);
        this.getActiveChambers = this.getActiveChambers.bind(this);
    }
    //when component mounts get the list of all chambers and the list of active chambers
    componentDidMount(){
        this.getChamberList();
        this.getActiveChambers();
    }

    wasDisabled(message){
        this.setState({successMessage: message});
        this.getChamberList();
        this.getActiveChambers();
    }
//get a list of all chambers
    getChamberList(){
        $.ajax({url: '/php/get_allchamber.php', type: 'POST',
            dataType: 'json',
            data: {
                'mode': 0
            },
        success: response => {
            this.setState({
                chamberList: response,
                loaded: true,
            });
        },
        error: response => {
            alert("An error occured, please refresh the page!")
        }
        });
    }
//get a list of all active chambers
    getActiveChambers(){
        $.ajax({url: '/php/get_chamber_parentlist.php', type: 'POST',
            dataType: 'json',
            data: {
                'mode': 0
            },
        success: response => {
            this.setState({
                activeChambers: response,
                loaded1: true
            })
        },
        error: response => {
            alert("An error occured, please refresh the page!")
        }
        });
    }
//get the value of a selected chamebr
    getSelectedChamber(value){
        this.setState({chamber: value})
    }

//show users the implications of disabling a chamber
    render(){
        return(
            <div className='w3-row' id="edit-signup">
                <Form
                    method='POST'
                    className="w3-container w3-card-4 w3-light-grey"
                    horizontal={true}
                    id = "AdminForm">

                    <div style={{'fontSize': 'xx-large', 'marginLeft': '3%', 'marginTop':'3%', 'paddingBottom': '0%'}}>
                        Disable a Chamber
                    </div>
                    <hr className = "signup-divider" style={{'paddingBotton': '0%'}}/>
                    <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                        Disabling the Chamber will archive all current members.
                    </div>
                    <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                        New members will no longer be able to join.
                    </div>
                    <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                        If this chamber is a parent chamber, the child chambers will become standalone chambers.
                    </div>
                    {this.state.loaded == true && <DropDown
                        save = {this.getSelectedChamber}
                        chamber_list={this.state.chamberList}
                        label="Select a Chamber:"
                        message={this.wasDisabled}
                    />}
                    <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                        {this.state.successMessage}
                    </div>
                    <div style={{'fontSize': 'xx-large', 'marginLeft': '3%', 'marginTop':'3%', 'paddingBottom': '0%'}}>
                        Active Chambers
                    </div>
                    <hr className = "signup-divider" style={{'paddingBotton': '0%'}}/>
                    {this.state.loaded1 == true && <ActiveChamberTable
                        activeChambers={this.state.activeChambers}
                        chamber_list={this.state.chamberList}
                    />}
                </Form>
            </div>


        );
    }

}

export default DisableChamber;
