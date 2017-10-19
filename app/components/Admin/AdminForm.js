import React from 'react';
import Validator from '../../../signup-app/components/SignupValidator.js';
import {Form, FormGroup, Col, ControlLabel, Checkbox, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import Address from '../../../signup-app/components/Address/Address.js';

//drop down for the admin form to select who the parent chamber is (if one exists)
class ChamberDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        display: "Select..."
    }
    this.handleSelect = this.handleSelect.bind(this);
  }
//update the title of the button to display the currently selected chamber
  handleSelect(evt){
      this.setState({display: this.props.chamber_list[evt]});
      this.props.sendChamber(evt);
  }

  render() {
    return (
        <div>
            <Col sm={3}>
                <ControlLabel>
                    Select Parent Chamber:
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
                                    eventKey={item}>
                                    {this.props.chamber_list[item]}
                                </MenuItem>)}
                        </DropdownButton>
                        </ButtonGroup>
                </Col>
        </div>
    );
  }
}

//render the admin form to be filled out to create a new chamber
class AdminForm extends React.Component {

  constructor(props) {
      super(props);

      this.state = ({
          postal: 1,
          showMenu: 0,


      });

      this.storeUserData = this.storeUserData.bind(this);
      this.storeAddress = this.storeAddress.bind(this);
      this.saveParent = this.saveParent.bind(this);
      this.checkboxAddress = this.checkboxAddress.bind(this);
      this.checkboxParent = this.checkboxParent.bind(this);
      this.checkbox1 = this.checkbox1.bind(this);
      this.checkbox2 = this.checkbox2.bind(this);
      this.storeName = this.storeName.bind(this);

  }
//stores the new user data
    storeUserData(value, index){
        var array = ['email', 'confirmemail','password', 'confirmpassword', 'firstname', 'lastname', 'jobtitle', 'businessphone', 'mobilephone', 'chamberemail', 'anziccode','abn', 'website'];
        var name = array[index];
        this.props.save([name], value)

    }
    //stores the name of the new chamber
    storeName(value, index){
        this.props.save('name', value)
    }

    storeAddress(type, value, index){
        var array = ['line1', 'line2', 'city','state', 'postcode', 'country'];
        var savename = array[index];
        if(type === "Postal Address")
            value= "postal" + value
        this.props.save(value, index);
    }

    saveParent(value){
        this.props.save("parentID", value)
    }
//if the check box is checked or not conditionally render postal address form
     checkboxAddress(checked){
         var check = (this.state.postal + 1)%2;
         this.setState({
             postal: check
         })
         this.props.changePostal(check)
     }
//checkbox for rendering postal address
     checkbox1(){
         return(
             <FormGroup>
             <Col sm={3}>
                <ControlLabel>
                    Same as postal address? {'  '}
                 </ControlLabel>
             </Col>
                 <Col sm={9}>
                     <Checkbox
                         onClick={e => this.checkboxAddress(e.target.checked)}
                     />
                 </Col>
             </FormGroup>
         )

     }
//storing the result of a checkbox
     checkboxParent(checked){
         var check = (this.state.showMenu + 1)%2;
         this.setState({
             showMenu: check
         })
     }

//checkbox for rendering the parent chamber menu
     checkbox2(){
         return(
             <FormGroup>
             <Col sm={5}>
                <ControlLabel>
                     Is this chamber a branch of a Parent Chamber? {'  '}
                 </ControlLabel>
             </Col>
                 <Col sm={7}>
                     <Checkbox
                         onClick={e => this.checkboxParent(e.target.checked)}
                     />
                 </Col>
             </FormGroup>
         )

     }

  render() {

      var type = ['email', 'email','password', 'password', 'text', 'text','text', 'number','number', 'email', 'number', 'number', 'text'];
      var name = ['email', 'confirmemail','password', 'confirmpassword', 'firstname', 'lastname', 'jobtitle', 'businessphone', 'mobilephone', 'chamberemail', 'anziccode','abn', 'website'];
      var displayName = ['Email', 'Confirm Email', 'Password', 'Confirm Password', 'First Name', 'Last Name', 'Job Title', 'Business Phone', 'Mobile Phone', 'Chamber Email', 'Anzic Code', 'ABN', 'Website'];
      var min = [1, 1, 6, 6, 1, 1, 1, 8, 8, 1, 5, 11, 1];
      var max = [320, 320, 30, 30, 255, 255, 255, 11, 11, 320, 5, 11, 3000];
      var mand = [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0];

    return (
        <div>
                <div id="signup-headings">Create New Chamber</div>
                <hr className = "signup-divider" />
                    <Validator
                            type = "text"
                            displayName = "Chamber Name"
                            minimum = {1}
                            maximum = {255}
                            mandatory = {1}
                            value=""
                            userAnswer = {this.storeName}
                            index = {0}/>
                        {this.checkbox2()}
                    {name.map((item, i) =>
                            <Validator
                                key = {i}
                                type = {type[i]}
                                displayName = {displayName[i]}
                                minimum = {min[i]}
                                value=""
                                maximum = {max[i]}
                                mandatory = {mand[i]}
                                userAnswer = {this.storeUserData}
                                index = {i}/>
                            )}
                    <Address
                        save = {this.storeAddress}
                        name = "Business Address"
                    />
                {this.checkbox1()}
                    {this.state.postal == 1 && <Address
                        save = {this.storeAddress}
                        name = "Postal Address"
                    />}
                </div>
    );
  }
}
export default AdminForm;
