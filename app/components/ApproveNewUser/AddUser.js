import React from 'react';
import $ from 'jquery';
import {Form, Col} from 'react-bootstrap';
import SignupForm from '../../../signup-app/components/SignupFormChild.js'

class AddUser extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          loaded: false,
          loaded1: false,
          loaded3: false,
          signupFields: [{
               displayname: [],
               columnname: [],
               inputtype: [],
               tablename: [],
               minimum: [],
               maximum: [],
               mandatory: [],
               disabled: [],
               DataID: []
           }],
           paymentFields: [{
               name: [],
               info: [],
               amount: [],
               expirytype: [],
               expirydate: [],
               disabled: []
           }],
           paymentType: "",
      }

        this.getFields = this.getFields.bind(this);
        this.sendData = this.sendData.bind(this);
        this.renderSignupForm = this.renderSignupForm.bind(this);
        this.getPaymentDetails(this.props.chamberID);
        this.getPaymentType(this.props.chamberID);
}

componentWillMount(){
    console.log("Here")
    this.getFields();
}

    getFields(){
        console.log("is this even working")

      $.ajax({url: '/php/get_chambersignup.php', type: 'POST',
          dataType: 'json',
          success: response => {
              console.log(response)
              this.setState({
                  signupFields: response,
                  loaded: true
              });
          },
          error: (xhr, status, err) => {
              console.log("error",xhr, status, err)
          }
      });
    }

    sendData(answers, address, postal){
        var data = [];
        var tablename = [];
        var columnname = [];


        for(var i=0; i<this.state.signupFields.length; i++){
            data[i]= this.state.signupFields[i].DataID;
            tablename[i]= this.state.signupFields[i].tablename;
            columnname[i]= this.state.signupFields[i].columnname;
        }

        console.log("Did you get answers?", answers, data, tablename, columnname)
        $.ajax({url: '/php/insert_user_data.php', type: 'POST',
            dataType: 'json',
            data: {
                'answers': answers,
                'DataID': data,
                'tablename': tablename,
                'columnname': columnname,
                'address': address,
                'postal': address
            },
            success: response => {
                console.log("success",response)
            },
            error: (xhr, status, err) => {
                console.log("error",xhr, status, err)
            }
        });
    }

    getPaymentDetails(chamber){
        $.ajax({url: '/php/get_membership_payments.php', type: 'POST',
            dataType: 'json',
            data: {
                'chamber': chamber
            },
        success: response => {
            console.log(response)
           this.setState({
               paymentFields: response,
               loaded1: true
           });
       },
       error: response => {
           console.log(response)
       }
        })
        }

        getPaymentType(chamber){
            $.ajax({url: '/php/get_membership_type.php', type: 'POST',
                dataType: 'json',
                data: {
                    'chamber': chamber
                },
            success: response => {
                console.log("membership types: ", response[0].type, response[0].expiry_date)
               this.setState({
                   paymentType: response[0].type,
                   expiry: response[0].expiry_date,
                   loaded2: true
               });
          },
          error: response => {
              console.log(response)
          }
        });
        }

        renderSignupForm(){
            console.log("Is this working")
            return(
                <SignupForm
                    fields={this.state.signupFields}
                    sendData={this.sendData}
                    membershipList={this.state.paymentFields}
                    membershipType={this.state.paymentType}
                    expiry={this.props.expiry}
                    requireApproval = {this.state.requireApproval}
                />
            )
        }

  render() {
    return (
        <div className='main-component w3-row'>
                {console.log("whats this", this.state.loaded)}
                {(this.state.loaded == true) ? this.renderSignupForm() : null}
        </div>

    );
  }
}
export default AddUser;
