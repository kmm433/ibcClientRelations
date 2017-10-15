import React from 'react';
import Validator from '../../../signup-app/components/SignupValidator.js';
import {Form, FormGroup, Col, ControlLabel, Checkbox, ButtonGroup} from 'react-bootstrap';
import Address from '../../../signup-app/components/Address/Address.js';

class AdminForm extends React.Component {

  constructor(props) {
      super(props);
      console.log("This is this rendering", this.props.list)

      this.state = ({
          postal: 1,


      });

      this.storeUserData = this.storeUserData.bind(this);
      this.storeAddress = this.storeAddress.bind(this);

      this.checkboxAddress = this.checkboxAddress.bind(this);
      this.checkboxParent = this.checkboxParent.bind(this);
      this.checkbox1 = this.checkbox1.bind(this);
      this.checkbox2 = this.checkbox2.bind(this);

  }

    storeUserData(data, index){
        var array = ['email', 'confirmemail','password', 'confirmpassword', 'firstname', 'lastname', 'jobtitle'];
        var name = array[index];
        this.props.save([name], value)

    }
//store the address after it has been validated
    storeAddress(type, name, value){
        console.log(type, name, value)
        if(type === "Postal Address")
            name = "postal" + name
        console.log("type name value",type, name, value)
        this.props.save({[name]: value})
    }


     checkboxAddress(checked){
         var check = (this.state.postal + 1)%2;
         this.setState({
             postal: check
         })
     }

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

     checkboxParent(checked){
         var check = (this.state.showMenu + 1)%2;
         this.setState({
             showMenu: check
         })
     }

     checkbox2(){
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



  render() {

      var type = ['email', 'email','password', 'password', 'text', 'text','text'];
      var name = ['email', 'confirmemail','password', 'confirmpassword', 'firstname', 'lastname', 'jobtitle'];
      var displayName = ['Email', 'Confirm Email', 'Password', 'Confirm Password', 'First Name', 'Last Name', 'Job Title'];
      var min = [1, 1, 6, 6, 1, 1, 1];
      var max = [320, 320, 30, 30, 255, 255, 255];
      var mand = [1, 1, 1, 1, 1, 1, 0];

    return (
        <div>
                <div id="signup-headings">Create New Chamber</div>
                    <Validator
                            type = "text"
                            displayName = "name"
                            minimum = {1}
                            maximum = {255}
                            mandatory = {1}
                            userAnswer = {this.storeUserData}
                            index = {0}/>
                    {this.checkbox1()}
                    {name.map((item, i) =>
                            <Validator
                                key = {i}
                                type = {type[i]}
                                displayName = {displayName[i]}
                                minimum = {min[i]}
                                maximum = {max[i]}
                                mandatory = {mand[i]}
                                userAnswer = {this.storeUserData}
                                index = {i}/>
                            )}
                    <Address
                        save = {this.storeAddress}
                        name = "Business Address"
                        mandatory = {true}
                    />
                    {this.checkbox2()}
                    {this.state.postal == 1 && <Address
                        save = {this.storeAddress}
                        name = "Postal Address"
                        mandatory = {false}
                    />}
                </div>
    );
  }
}
export default AdminForm;
