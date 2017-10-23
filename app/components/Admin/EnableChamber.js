import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Form, Button, FormGroup, ControlLabel, Col, DropdownButton, ButtonGroup, MenuItem, Checkbox, HelpBlock} from 'react-bootstrap';
import AddExecutive from './AddExecutive'

//Dropdown menu shows all the disabled chambers to reactivate
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

//make sure the user wants to enable the chamber before submission
  handleSubmit(){
      if(confirm("Are you sure you want to enable this chamber?") === true){
          $.ajax({url: '/php/enable_chamber.php', type: 'POST',
              dataType: 'json',
              data: {'chamber': this.state.chamber},
          success: response => {
              var mess = this.state.display + " was successfully enabled";
              this.setState({display: "Please Select a Chamber"})
              this.props.message(mess, true);
          },
          error: (xhr, status, err) => {
              var mess = this.state.display + " an error occured, the chamber was not enabled";
              this.props.message(mess, false);
          }
          });
      }
  }

  render() {
    return (
        <div>
            <FormGroup>
            <Col sm={3}>
                    <ControlLabel style={{'paddingTop': '7%'}}>
                        {this.props.label}
                    </ControlLabel>
            </Col>
                <Col sm={9} style={{'paddingBottom': '5%'}}>
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
                        <Button bsStyle='success' onClick={this.handleSubmit}>
                            Enable
                        </Button>
                        </ButtonGroup>
                </Col>
            </FormGroup>
        </div>
    );
  }
}

//renders the enable chamber component
class EnableChamber extends React.Component{

    constructor(){
        super()

        this.state = {
            loaded: false,
            loaded1: false,
            error: "",
            chamberList: "",
            chamber: null,
            successMessage: "",
            execAsk: false, //if this is true then show the check box to give user option to add an exec account
            btnDisplay: "",
            addExec: 0, //if this is 1 then show the form to fill out to add exec
            email: null,
            confirmemail: null,
            password: null,
            confirmpassword: null,
            firstname: null,
            lastname: null,
            jobtitle: null
        }

        this.getChamberList = this.getChamberList.bind(this);
        this.getSelectedChamber = this.getSelectedChamber.bind(this);
        this.wasEnabled = this.wasEnabled.bind(this);
        this.getCheckedValue = this.getCheckedValue.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.checkReadySubmit = this.checkReadySubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    //before component mounts, get the chamber list
    componentWillMount(){
        this.getChamberList();
    }

    //display a message for if th chamber was successfull/unsuccessfully enabled
    //get the new chamber list of enabled chambers
    wasEnabled(message, success){
        this.setState({successMessage: message, execAsk: success});
        this.getChamberList();
    }

    //ajax call to get the list of enabled chambers from the database
    getChamberList(){
        $.ajax({url: '/php/get_allchamber.php', type: 'POST',
            dataType: 'json',
            data: {
                'mode': 1
            },
        success: response => {
            this.setState({
                chamberList: response,
                loaded: true
            });
        },
        error: response => {
            alert("An error occured, please refresh the page!")
        }
        });
    }
    //get the value of the selected chamber from the dropdown menu
    getSelectedChamber(value){
        this.setState({chamber: value})
    }
    //when the checkox is checked/unchecked update the state variable
     getCheckedValue(checked){
         var check = (this.state.addExec + 1)%2;
         this.setState({
             addExec: check
         })
     }

//when this checkbox is selected, a form to fill out log in details is rendered
     checkbox(){
         return(
             <FormGroup>
             <Col sm={6}>
                <ControlLabel style={{'paddingTop': '12%'}}>
                    Would you like to create a new Executive Account to Login? {'  '}
                 </ControlLabel>
             </Col>
                 <Col sm={6}>
                     <Checkbox
                         style = {{'paddingTop': '10%'}}
                         onClick={e => this.getCheckedValue(e.target.checked)}
                     />
                 </Col>
             </FormGroup>
         )

     }
     checkValid(){
         if(this.state.email !== this.state.confirmemail){
             this.setState({error: "Emails do not Match"})
             return false;
         }
         else if(this.state.password !== this.state.confirmpassword){
             this.setState({error: "Emails do not Match"})
             return false;
         }
         else{
             this.setState({error: ""})
             return true;
         }
     }
//check that there is a value submitted for each required field
     checkReadySubmit(){
         if(this.checkValid()){
             if(this.state.email == null ||
             this.state.confirmemail == null ||
             this.state.password == null ||
             this.state.confirmpassword == null ||
             this.state.firstname == null ||
             this.state.lastname == null){
                 return false
             }
             else {
                 return true;
             }
         }
         else{
             return false;
         }

     }

     saveData(name, value){
         this.setState({[name]: value})
     }

//if it is ready to submit, then send the data to the database
     handleSubmit(event){
         event.preventDefault();
         if(this.checkReadySubmit()){
             $.ajax({url: '/php/add_executive.php', type: 'POST',
                 dataType: 'json',
                 data: {
                     'chamber': this.state.chamber,
                     'email': this.state.email,
                     'password': this.state.password,
                     'firstname': this.state.firstname,
                     'lastname': this.state.lastname,
                     'jobtitle': this.state.jobtitle
                 },
             success: response => {
                 ReactDOM.findDOMNode(this.refs.form).submit();
             },
             error: (xhr, status, err) => {
                 alert("An error occured, please refresh the page!")
             }
             });
         }
     }

    render(){
        return(
            <div className='w3-row' id="edit-signup">
                <Form
                    method="POST"
                    className="w3-container w3-card-4 w3-light-grey"
                    ref = "form"
                    id = "AdminForm"
                    onSubmit={this.handleSubmit}>

                    <div style={{'fontSize': 'xx-large', 'marginLeft': '3%', 'marginTop':'3%', 'paddingBottom': '0%'}}>
                        Enable a Chamber
                    </div>
                    <hr className = "signup-divider" style={{'paddingBotton': '0%'}}/>
                    <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                        Enabling the Chamber will not allow members to sign up straight away.
                    </div>
                    <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                        You must go to the Edit Signup Form once logged in and finalise settings.
                    </div>
                    <hr className = "signup-divider" style={{'paddingBotton': '0%'}}/>
                    <div style={{'marginLeft': '5%', 'paddingTop': '2%'}}>
                        {this.state.loaded == true && <DropDown
                            save = {this.getSelectedChamber}
                            chamber_list={this.state.chamberList}
                            label="Select a Chamber:"
                            message={this.wasEnabled}
                        />}
                        <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                            {this.state.successMessage}
                        </div>
                        {this.state.execAsk && this.checkbox()}
                        {this.state.addExec == 1 &&
                            <div>
                                <AddExecutive
                                    chamber={this.state.chamber}
                                    save = {this.saveData}/>
                                <HelpBlock style={{'color': 'red', 'marginLeft': '26%'}}>{this.state.error}</HelpBlock>
                                <Button
                                    style={{'marginLeft': '40%'}}
                                    type="submit">
                                    Submit
                                </Button>
                            </div>}
                    </div>
                </Form>
            </div>


        );
    }

}

export default EnableChamber;
