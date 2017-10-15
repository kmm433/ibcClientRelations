import React from 'react';
import $ from 'jquery';
import {FormGroup, Checkbox, Form, Col, HelpBlock, Button, ControlLabel, ButtonToolbar, DropdownButton, MenuItem, Table} from 'react-bootstrap';
import Validator from './SignupValidator.js';
import Payment from './Payment/Paypal';
import Address from './Address/Address.js';
import GoogleAddress from './Address/GoogleAddress.js';

class PaymentMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        value: "Select...",
        index: "unselected"
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.displayMembershipOptions = this.displayMembershipOptions.bind(this);
    this.displayAmount = this.displayAmount.bind(this);

  }

  handleSelect(evt){
      console.log("not getting here")
      this.setState({
          value: this.props.list[evt].name,
          index: evt
      })
      this.props.save(evt);
  }

  displayMembershipOptions(){
      return(
          <Table striped bordered condensed hover>
            <thead>
                <tr>
                  <th> Membership </th>
                  <th> About </th>
                  <th> Amount </th>
                </tr>
            </thead>
            <tbody>
               {this.props.list.map((item, i) =>
                    <tr key = {this.props.list[i].membershipID}>
                        <td>{this.props.list[i].name}</td>
                        <td>{this.props.list[i].info}</td>
                        <td>{this.props.list[i].amount}</td>
                </tr>)}
            </tbody>
        </Table>
      )
  }

  displayAmount(){
      var i = this.state.index;
      console.log("What the shit:", i, this.props.list[i].amount)
      return(
          <ControlLabel>
              The total amount to be paid is:{'  '} {this.props.list[i].amount}
          </ControlLabel>
      )
  }

  render() {

      var array = [];
      for (var i=0; i < this.props.list.length; i++)
        array.push(this.props.list[i].name)

    return (
        <div>
            {this.displayMembershipOptions()}
            <Col sm={3}>
                <ControlLabel>
                    Membership Type {<a id="asterisk">*</a>}
                </ControlLabel>
            </Col>
            <Col sm={9}>
                <ButtonToolbar className="signup-dropdown">
                    <DropdownButton
                        id="dropdown-btn-menu"
                        bsStyle="success"
                        title={this.state.value}
                        onSelect={this.handleSelect}>
                        {array.map((item,index) =>
                            <MenuItem
                                key = {item}
                                eventKey={index}>{item}
                            </MenuItem>)}
                    </DropdownButton>
                    {this.state.index!== 'unselected' && this.displayAmount()}
                </ButtonToolbar>
            </Col>
        </div>
    );
  }
}

class SignupForm extends React.Component {

  constructor(props) {
      super(props);
      console.log("This is this rendering", this.props.list)

      this.state = ({
          safeSubmit: false,
          compareConfirm: "",
          errorMessage: "",
          storeAnswers: [],
          postal: 1,
          amount: "",
          error: "",
          pAddressReady: false,
          bAddressReady: false,
          membershipID: "",
          line1: "",
          line2: "",
          city: "",
          postcode: "",
          state: "",
          country: "",
          postalline1: "",
          postalline2: "",
          postalcity: "",
          postalpostcode: "",
          postalstate: "",
          postalcountry: ""
      });

      this.storeUserData = this.storeUserData.bind(this);
      this.checkReadyForSubmit = this.checkReadyForSubmit.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.storeAddress = this.storeAddress.bind(this);
      this.checkboxAddress = this.checkboxAddress.bind(this);
      this.checkbox = this.checkbox.bind(this);
      this.saveMembership = this.saveMembership.bind(this);
      this.checkAnswersReady = this.checkAnswersReady.bind(this);
      this.checkAddressReady = this.checkAddressReady.bind(this);
      this.checkBAddress = this.checkBAddress.bind(this);
      this.checkPAddress = this.checkPAddress.bind(this);
  }

  componentWillMount(){
      var temp = [];
      for(var i = 0; i < this.props.fields.length; i++){
          temp[i]= null;
      }
      this.setState({
          storeAnswers: temp
      })
      console.log("checkingarray",temp)
  }

    storeUserData(data, index){
        var temp = this.state.storeAnswers;
        temp[index] = data;
        this.setState({
            storeAnswers: temp
        })
        console.log("Is it ready?", temp)

    }
//store the address after it has been validated
    storeAddress(type, name, value){
        console.log(type, name, value)
        if(type === "Postal Address")
            name = "postal" + name
        console.log("type name value",type, name, value)
        this.setState({[name]: value})
    }

    //check all the data is filled out before payment
    checkReadyForSubmit(){
        console.log("cheching submit ready", this.checkAnswersReady(), this.checkAddressReady(), this.checkAnswersReady())
        if(this.checkAnswersReady() && this.checkAddressReady()){
            return true;
        }
        else{
            return false;
        }
    }

    //check if the postal address is required and if so is filled out
    //check if business address is filled out
    checkAddressReady(){
        console.log("checking both addresses", this.checkBAddress(), this.checkPAddress())
        if(this.state.postal===1 && this.checkBAddress() && this.checkPAddress()){
            console.log("yes 1")
            return true;
        }
        else if(this.state.postal===0 && this.checkBAddress()){
            console.log("Yes 2")
            return true;
        }
        else {
            return false;
        }
    }

    checkBAddress(){
        if(this.state.line1 === null || this.state.city === null || this.state.postcode === null || this.state.state === null || this.state.country === null){
            return false;
        }
        return true;
    }

    checkPAddress(){
        if(this.state.postalline1 === null || this.state.postalcity === null || this.state.postalpostcode === null || this.state.postalstate === null || this.state.postalcountry === null){
            return false;
        }
        return true;
    }


    checkAnswersReady(){
        for(var i=0; i<this.state.storeAnswers.length; i++){
            if(this.state.storeAnswers[i] === null && this.props.fields[i].mandatory === '1'){
                return false;
            }
        }
        return true;
    }
//check if all the fields are filled out before submitting
     handleSubmit(event){
         event.preventDefault();
         console.log("is address ready", this.checkBAddress(), this.checkReadyForSubmit())
         if(!this.checkReadyForSubmit()){
             console.log("Please fill out all required fields")
             this.setState({error: "Please fill out all required fields"})
             return
         }
         console.log(this.state.storeAnswers[0], this.state.storeAnswers[1])
         if(this.state.storeAnswers[0] !== this.state.storeAnswers[1]){
             console.log("getting here")
             this.setState({error: "Emails do not Match"})
             return
         }
         console.log(this.state.storeAnswers[2], this.state.storeAnswers[3])
         if(this.state.storeAnswers[2] !== this.state.storeAnswers[3]){
             console.log("getting here")
             this.setState({error: "Passwords do not Match"})
             return
         }

         var address = {
             line1: this.state.line1,
             line2: this.state.line2,
             city: this.state.city,
             postcode: this.state.postcode,
             state: this.state.state,
             country: this.state.country
         }
         var postal = {
             postalline1: this.state.postalline1,
             postalline2: this.state.postalline2,
             postalcity: this.state.postalcity,
             postalpostcode: this.state.postalpostcode,
             postalstate: this.state.postalstate,
             postalcountry: this.state.postalcountry
         }

         this.props.sendData(this.state.storeAnswers, address, postal);
     }

     checkboxAddress(checked){
         var check = (this.state.postal + 1)%2;
         this.setState({
             postal: check
         })
     }

     checkbox(){
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
     //save the memebership selected by the user and the amount
     saveMembership(i){
         console.log("the amount is:", i ,this.props.membershipList[i].amount)
         this.setState({
             membershipID: i,
             amount: this.props.membershipList[i].amount
         })
     }


  render() {
    return (
        <div id="signup-container" className="w3-row">
                <Form method='POST' className="w3-container w3-card-4 w3-light-grey" horizontal={true}>
                    <div id="signup-headings">Membership Form</div>
                    {this.props.fields.map((item, i) =>
                            <Validator
                                key = {i}
                                type = {this.props.fields[i].inputtype}
                                displayName = {this.props.fields[i].displayname}
                                minimum = {this.props.fields[i].minimum}
                                maximum = {this.props.fields[i].maximum}
                                mandatory = {this.props.fields[i].mandatory}
                                userAnswer = {this.storeUserData}
                                index = {i}/>
                            )}
                    <Address
                        save = {this.storeAddress}
                        name = "Business Address"
                        mandatory = {true}
                    />
                    {this.checkbox()}
                    {this.state.postal == 1 && <Address
                        save = {this.storeAddress}
                        name = "Postal Address"
                        mandatory = {false}
                    />}
                    {/*<PaymentMenu
                        list={this.props.membershipList}
                        type={this.props.membershipType}
                        save = {this.saveMembership}
                    />
                    <Payment
                        amount = {this.state.amount}
                        token={this.props.token}
                    />*/}
                    <button
                        id="signup-submitbtn"
                        className = "btn"
                        onClick={this.handleSubmit}>
                        Conitnue to Payment
                    </button>
                    <HelpBlock style={{'marginLeft': '45%', 'color': 'red'}}>{this.state.error}</HelpBlock>
                </Form>
        </div>
    );
  }
}
export default SignupForm;
