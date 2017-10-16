import React from 'react';
import $ from 'jquery';
import {Form, Button, FormGroup, ControlLabel, Col, DropdownButton, ButtonGroup, MenuItem} from 'react-bootstrap';

class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        display: "Please Select a Chamber",
        chamber: "",
        addexec: 0

    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.renderAddExec = this.renderAddExec.bind(this);
    this.showExec = this.showExec.bind(this);
  }

  handleSelect(evt){
      this.setState({
          display: this.props.chamber_list[evt],
          chamber: evt
      })
      console.log(evt)
  }
/*
  renderAddExec(){
      return(
          <FormGroup>
          <Col sm={6}>
                  <ControlLabel>
                      Would you like to add a New Executive Account?
                  </ControlLabel>
             </Col>
              <Col sm={6}>
                      <Button  onClick={this.showExec}>
                          Yes
                      </Button>
              </Col>
          </FormGroup>

      )
  }*/

  showExec(){
      var update = (this.state.addexec + 1)%2;
      thissetState({
          addexec: update
      })
  }

  handleSubmit(){
      console.log("selected chamber", this.state.chamber)
      if(confirm("Are you sure you want to disable this chamber?") === true){

          $.ajax({url: '/php/enable_chamber.php', type: 'POST',
              dataType: 'json',
              data: {'chamber': this.state.chamber},
          success: response => {
              console.log(response)
              var mess = this.state.display + " was successfully disabled";
              this.setState({display: "Please Select a Chamber"})
              this.props.message(mess);
          },
          error: (xhr, status, err) => {
              console.log("error",xhr.responseText, status, err)
              var mess = this.state.display + " an error occured, the chamber was no disabled";
              this.props.message(mess);
          }
          });
      }
      else {
          console.log("not")
      }
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


class EnableChamber extends React.Component{

    constructor(){
        super()

        this.state = {
            loaded: false,
            loaded1: false,
            chamberList: "",
            chamber: "",
            successMessage: "",
            btnDisplay: ""
        }

        this.getChamberList = this.getChamberList.bind(this);
        this.getSelectedChamber = this.getSelectedChamber.bind(this);
        this.wasEnabled = this.wasEnabled.bind(this);
    }
    componentWillMount(){
        this.getChamberList();
    }

    wasEnabled(message){
        this.setState({successMessage: message});
        this.getChamberList();
    }

    getChamberList(){
        console.log("Getting here?")
        $.ajax({url: '/php/get_allchamber.php', type: 'POST',
            dataType: 'json',
            data: {
                'mode': 1
            },
        success: response => {
            console.log("recieving",response)
            this.setState({
                chamberList: response,
                loaded: true
            });
        },
        error: response => {
            console.log(response)
        }
        });
    }

    getSelectedChamber(value){
        console.log(value)
        this.setState({chamber: value})
    }

    render(){
        return(
            <div className='w3-row' id="edit-signup">
                <Form
                    method='POST'
                    className="w3-container w3-card-4 w3-light-grey"
                    horizontal={true}
                    id = "AdminForm">

                    <div style={{'fontSize': 'xx-large', 'marginLeft': '3%', 'marginTop':'3%', 'paddingBottom': '0%'}}>
                        Enable a Chamber
                    </div>
                    <hr className = "signup-divider" style={{'paddingBotton': '0%'}}/>
                    <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                        Enabling the Chamber will archive all current members.
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
                    {/*this.renderAddExec()*/}
                    {/*this.state.addNewExecutive && <AddExecutive chamber={this.state.chamber}/>*/}
                </Form>
            </div>


        );
    }

}

export default EnableChamber;
