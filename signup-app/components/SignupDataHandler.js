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
        console.log("rendering chamber: ", this.props.chamberID)
        this.getFields(this.props.chamberID);
        this.getPaymentDetails(this.props.chamberID);
        this.getPaymentType(this.props.chamberID);
        this.getClientToken(this.props.chamberID);
        this.getApprovalSettings(this.props.chamberID);
    }

    componentWillReceiveProps(nextProps){
        console.log("rendering the next chamber: ", nextProps.chamberID)
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
                console.log("initially getting clientID: ", response)
               this.setState({clientToken: response});
            },
            error: response => {
              console.log("get paypal ID",response)
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
              console.log("the chamber searching for: ", response)
          },
          error: (xhr, status, err) => {
              console.log("error",xhr, status, err)
              alert("An error occured")
          }
      });
    }

    getApprovalSettings(data){
        console.log("fetching approval for: data")
        $.ajax({url: '/php/get_approval_settings.php', type: 'POST',
            dataType: 'json',
            data: {'chamber': data},
            success: response => {
                console.log("getting here")
                console.log(response)
                this.setState({
                    requireApproval: response
                });
                console.log("the chamber searching for: ", response)
            },
            error: (xhr, status, err) => {
                console.log("error",xhr, status, err)
                alert("An error occured")
            }
        });
    }



    sendData(answers, address, postal, membershipID){
        var data = [];
        var tablename = [];
        var columnname = [];

        console.log("lines",address.line1, postal.line1)
        //postal.line1 === null && postal = null;

        for(var i=0; i<this.state.signupFields.length; i++){
            data[i]= this.state.signupFields[i].DataID;
            tablename[i]= this.state.signupFields[i].tablename;
            columnname[i]= this.state.signupFields[i].columnname;
        }
        console.log("Did you get answers?", answers, data, tablename, columnname)
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
                'requireApproval': this.state.requireApproval
            },
            success: response => {
                console.log("success",response)
                //send back up if requires approval, the amount to be paid and the UserID
                this.props.handleFinish(this.state.requireApproval, this.state.paymentFields[membershipID].amount, response, this.state.clientToken)

            },
            error: (xhr, status, err) => {
                console.log("error",xhr, status, err)
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
