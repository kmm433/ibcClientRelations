import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Form, Button, FormGroup, ControlLabel, Col, DropdownButton, ButtonGroup, MenuItem, Checkbox, HelpBlock} from 'react-bootstrap';
import AddExecutive from './AddExecutive'

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
      console.log(evt)
  }


  handleSubmit(){
      console.log("selected chamber", this.state.chamber)
      if(confirm("Are you sure you want to enable this chamber?") === true){

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
                    <ControlLabel style={{'paddingTop': '2%'}}>
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
            error: "",
            chamberList: "",
            chamber: null,
            successMessage: "",
            btnDisplay: "",
            addExec: 0,
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
    //get the new chamber list of disabled chambers
    wasEnabled(message){
        this.setState({successMessage: message});
        this.getChamberList();
    }

    //ajax call to get the list of disabled chambers from the database
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
    //get the value of the selected chamber from the dropdown menu
    getSelectedChamber(value){
        console.log(value)
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
         if(this.state.chamber == null){
             this.setState({error: "Please Select a Chamber"})
             return false;
         }
         else if(this.state.email !== this.state.confirmemail){
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
                 console.log(response)
                 ReactDOM.findDOMNode(this.refs.form).submit();
             },
             error: response => {
                 console.log(response)
                 alert(response)
             }
             });
         }
         else{
             console.log("not ready")
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
                            message={this.wasDisabled}
                        />}
                        <div style={{'fontSize': 'medium', 'marginLeft': '3%'}}>
                            {this.state.successMessage}
                        </div>
                        {this.checkbox()}
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
