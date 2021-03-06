import React from 'react';
import $ from 'jquery';
import {Form, Col} from 'react-bootstrap';
import SignupForm from './SignupFormChild.js'

class SignupData extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          chamber: "",
          loaded: false,
          loaded1: false,
          loaded3: false,
          requireApproval: "",
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
               membershipID: [],
               name: [],
               info: [],
               amount: [],
               expirytype: [],
               expirydate: [],
               disabled: []
           }],
           paymentType: "",
           expiry: "",
           clientToken: ""
      }

        this.getFields = this.getFields.bind(this);
        this.sendData = this.sendData.bind(this);
        this.renderSignupForm = this.renderSignupForm.bind(this);
        this.getClientToken = this.getClientToken.bind(this);
        this.getApprovalSettings = this.getApprovalSettings.bind(this);
}

    componentWillMount(){
        this.getFields(this.props.chamberID);
        this.getPaymentDetails(this.props.chamberID);
        this.getPaymentType(this.props.chamberID);
        this.getClientToken(this.props.chamberID);
        this.getApprovalSettings(this.props.chamberID);
    }

    componentWillReceiveProps(nextProps){
        this.getFields(nextProps.chamberID);
        this.getPaymentDetails(nextProps.chamberID);
        this.getPaymentType(nextProps.chamberID);
        this.getClientToken(nextProps.chamberID);
        this.getApprovalSettings(this.props.chamberID);
    }

    getClientToken(){
        $.ajax({url: '/php/get_paypalID.php', type: 'POST',
            dataType: 'json',
            data: {
                'mode': 'RETRIEVE',
                'chamber': this.props.chamberID
            },
            success: response => {
               this.setState({clientToken: response});
            },
            error: response => {
              aler("An error occured!")
            }
          });
    }

    getFields(data){
      $.ajax({url: '/php/get_chambersignup.php', type: 'POST',
          dataType: 'json',
          data: {'chamber': data},
          success: response => {
              this.setState({
                  signupFields: response,
                  loaded: true
              });
          },
          error: (xhr, status, err) => {
              alert("An error occured")
          }
      });
    }

    getApprovalSettings(data){
        $.ajax({url: '/php/get_approval_settings.php', type: 'POST',
            dataType: 'json',
            data: {'chamber': data},
            success: response => {
                this.setState({
                    requireApproval: response
                });
            },
            error: (xhr, status, err) => {
                alert("An error occured")
            }
        });
    }



    sendData(answers, address, postal, membershipID, amount){
        var data = [];
        var tablename = [];
        var columnname = [];

        for(var i=0; i<this.state.signupFields.length; i++){
            data[i]= this.state.signupFields[i].DataID;
            tablename[i]= this.state.signupFields[i].tablename;
            columnname[i]= this.state.signupFields[i].columnname;
        }
        $.ajax({url: '/php/insert_user_data.php', type: 'POST',
            dataType: 'json',
            data: {
                'chamber': this.props.chamberID,
                'answers': answers,
                'DataID': data,
                'tablename': tablename,
                'columnname': columnname,
                'address': address,
                'postal': address,
                'membershipID': membershipID,
                'amount': amount,
                'requireApproval': this.state.requireApproval
            },
            success: response => {
                //send back up if requires approval, the amount to be paid and the UserID
                this.props.handleFinish(this.state.requireApproval, amount, response, this.state.clientToken, this.state.expiry)

            },
            error: (xhr, status, err) => {
                alert("An error occured, your membership signup what not successfull")
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
           this.setState({
               paymentFields: response,
               loaded1: true
           });
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

            var newExpiry;
            if(response[0].expiry_date == null){
                newExpiry = 'annual';
            }else{
                newExpiry = response[0].expiry_date;
            }
           this.setState({
               paymentType: response[0].type,
               expiry: newExpiry,
               loaded2: true
           });
      }
    });
    }

    renderSignupForm(){
        return(
            <SignupForm
                fields={this.state.signupFields}
                sendData={this.sendData}
                membershipList={this.state.paymentFields}
                membershipType={this.state.paymentType}
                expiry={this.props.expiry}
                token={this.state.clientToken}
                requireApproval = {this.state.requireApproval}
            />
        )
    }

  render() {
    return (
        <div>
            {(this.state.loaded) ? this.renderSignupForm() : null}
        </div>
    );
  }
}
export default SignupData;
