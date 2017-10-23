import React from 'react';
import $ from 'jquery';
import FieldTable from './EditSignupTable.js';
import EditPayment from './EditPayment.js';
import AddClientID from './PaypalID.js'
import ApproveUser from './Approve.js'
import UploadLogo from './UploadLogo.js'
import DatePicker from 'react-datepicker';                          /* https://github.com/Hacker0x01/react-datepicker */
import moment from 'moment';
import {Col} from 'react-bootstrap';
import Payment from './Paypal';
import 'react-datepicker/dist/react-datepicker.css';

class EditSignup extends React.Component{

    constructor(){
        super()

        this.state = {
            data1loaded: false,
            data2loaded: false,
            data3loaded: false,
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
             edit: false,
             editPayment: false,
             paymentIndex: "",
             currentIndex: "",
             paymentType: "",
             expiry: "",
             clientID: null,
             approval: "",
             live: ""
        }

        this.renderPage = this.renderPage.bind(this);
        this.sendData = this.sendData.bind(this);
        this.sendFieldtoDisable = this.sendFieldtoDisable.bind(this);
        this.sendFieldtoEnable = this.sendFieldtoEnable.bind(this);
        this.updateEdit = this.updateEdit.bind(this);
        this.sendUpdatedField = this.sendUpdatedField.bind(this);
        this.editFalse = this.editFalse.bind(this);
        this.updatePayment = this.updatePayment.bind(this);
        this.getClientID = this.getClientID.bind(this);
        this.removeClientID = this.removeClientID.bind(this);
        this.addClientID = this.addClientID.bind(this);
        this.sendMembershipData = this.sendMembershipData.bind(this);
        this.sendMembershiptoEnable = this.sendMembershiptoEnable.bind(this);
        this.sendMembershiptoDisable = this.sendMembershiptoDisable.bind(this);
        this.sendUpdatedMembership = this.sendUpdatedMembership.bind(this);
        this.editPaymentFalse = this.editPaymentFalse.bind(this);
        this.updatePaymentEdit = this.updatePaymentEdit.bind(this);
        this.getApproval = this.getApproval.bind(this);
        this.updateApproval = this.updateApproval.bind(this);
        this.checkifLive = this.checkifLive.bind(this);
        this.renderTestPayment = this.renderTestPayment.bind(this);

    }

    componentWillMount(){
        this.getFields();
        this.getPaymentDetails();
        this.getPaymentType();
        this.getClientID();
        this.getApproval();
        this.checkifLive();

    }

    //Retrieve all of the fields that are on the sign up form corresponding to the chamber who is logged in
    getFields(){

      $.ajax({url: '/php/chamber_form.php', type: 'POST',
          dataType: 'json',

      success: response => {
         this.setState({
             data1loaded: true,
             signupFields: response
         });
    }});
    }

    getPaymentDetails(){
        $.ajax({url: '/php/get_membership_payments.php', type: 'POST',
            dataType: 'json',

        success: response => {
           this.setState({
               data2loaded: true,
               paymentFields: response
           });
      }});
    }
//retrieve the payment type of the chamber (annual or prorata)
    getPaymentType(){
        $.ajax({url: '/php/get_membership_type.php', type: 'POST',
            dataType: 'json',

        success: response => {
           this.setState({
               data3loaded: true,
               paymentType: response[0].type,
               expiry: response[0].expiry_date
           });
      }});
    }

//update the payment type (annual or prorata)
//display the expiry in text format for user readabiltiy but store in format compatible to store in database
    updatePayment(type, expiry){
        var message;
        if(type === 'ProRata'){
            message = "New members and renewing members will now expire on " + moment(expiry).format("LL");
            expiry = expiry.format("YYYY-MM-DD HH:MM:SS")
        }
        else{
            expiry = null;
            message = "New members and renewing members will now expire a year from their sign up date.";
        }
        if(confirm(message)){
            $.ajax({url: '/php/update_membership_type.php', type: 'POST',
                dataType: 'json',
                data: {
                    'type': type,
                    'expiry': expiry
                },
                success: response => {
                   this.setState({
                       paymentType: response[0].type,
                       expiry: response[0].expiry_date
                   });
                   this.getPaymentType();
                },
                error: response => {
                    alert("An error occured: ", response)
                }
              });
        }
        else{
            alert("An error occured, please refresh the page")
        }
    }

    //retrieve the clientID, if it doesnt exist then return null
    getClientID(){
        $.ajax({url: '/php/get_paypalID.php', type: 'POST',
            dataType: 'json',
            data: {
                'mode': 'RETRIEVE'
            },
            success: response => {
               this.setState({clientID: response});
            },
            error: response => {
              alert("An error occured, please refresh the page")
            }
          });
    }
//add a new client id
    addClientID(newID){
        console.log("The ID is: ", newID)
        $.ajax({url: '/php/get_paypalID.php', type: 'POST',
            dataType: 'json',
            data: {
                'mode': 'ADD',
                'id': newID
            },
            success: response => {
                this.checkifLive();
                this.setState({clientID: newID});
            },
            error: response => {
              alert("An error occured, please refresh the page!")
            }
          });
    }
    //removes a client ID
    removeClientID(){
        if(confirm("Are you sure you want to delete this?")){
            $.ajax({url: '/php/get_paypalID.php', type: 'POST',
                dataType: 'json',
                data: {
                    'mode': 'REMOVE'
                },
                success: response => {
                    this.checkifLive();
                    this.setState({clientID: null});
                },
                error: (xhr, status, err) => {
                  alert("An error occured, please refresh the page!")
                }
              });
        }
    }

    /**************For the Edit Sign up Forms****************/

    //inserts a new sign up field
    sendData(newDisplayname, newOptional, newType, newMin, newMax){
        $.ajax({url: '/php/insert_newsignup_field.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': newDisplayname,
                'optional': newOptional,
                'type': newType,
                'minimum': newMin,
                'maximum': newMax
            },
            success: response => {
                this.getFields();
            },
            error: response => {
                alert("An error occured, please refresh the page!")
            }
        });
    }
    //send a field that has been edited
    sendUpdatedField(newDisplayname, newOptional, newType, newMin, newMax){
        var optional=null;
        newOptional === true ? optional = '1' : optional = '0'
        this.setState({
            edit: false
        })
        $.ajax({url: '/php/update_signup_field.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': newDisplayname,
                'optional': optional,
                'type': newType,
                'minimum': newMin,
                'maximum': newMax,
                'DataID': this.state.signupFields[this.state.currentIndex].DataID
            },
            success: response => {
                this.checkifLive();
                this.getFields();
            },
            error: response => {
                alert("An error occured, please refresh the page!")
            }
        });
    }
    //disable a sign up field and then retrieve new list of fields to display
    sendFieldtoDisable(name){
        $.ajax({url: '/php/delete_signup_field.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': name
            },
            success: response => {
                this.getFields();
                this.checkifLive();
            },
            error: response => {
                alert("An error occured, please refresh the page!")
            }
        });
    }
    //enable a sign up field and then retrieve the new fields to display again
    sendFieldtoEnable(name){
        $.ajax({url: '/php/enable_signup_field.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': name
            },
            success: response => {
                this.getFields();
                this.checkifLive();
            },
            error: response => {
                alert("An error occured!")
            }
        });
    }

    //check if the chamber is live
    checkifLive(){
        $.ajax({url: '/php/chamber_live.php', type: 'POST',
            dataType: 'json',
            success: response => {
                this.setState({live: response})
            },
            error: response => {
                alert("An error occured, please refresh the page!")
            }
        });
    }

//update the edit if it is turned to true in the child component
    updateEdit(index){
        this.setState({
            edit: true,
            currentIndex: index
        })
    }

//if edit payment mode is turned on in the child then update the state for conditional rendering
    updatePaymentEdit(index){
        this.setState({
            editPayment: true,
            paymentIndex: index
        })
    }
    //if edit payment mode is turned off in the child then update the state for conditional rendering
    editPaymentFalse(){
        this.setState({
            editPayment: false
        })
    }

    editFalse(){
        this.setState({
            edit: false
        })
    }

    /**************For the Editing Membership Types****************/

    //inserts a new sign up field
    sendMembershipData(name, info, amount){
        $.ajax({url: '/php/insert_membership_field.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': name,
                'info': info,
                'amount': amount
            },
            success: response => {
                this.getPaymentDetails()
            },
            error: response => {
                alert("An error occured!")
            }
        });
    }
    //send a field that has been edited
    sendUpdatedMembership(id, name, info, amount){
        $.ajax({url: '/php/update_membership_field.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': name,
                'info': info,
                'amount': amount,
                'membershipID': id
            },
            success: response => {
                this.getPaymentDetails();
            },
            error: response => {
                alert("An error occured!")
            }
        });
    }
    //disable a sign up field and then retrieve new list of fields to display
    sendMembershiptoDisable(name){
        $.ajax({url: '/php/enable_membership_field.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': name,
                'able': 1
            },
            success: response => {
                this.getPaymentDetails();
            },
            error: response => {
                alert("An error occured!")
            }
        });
    }
    //enable a sign up field and then retrieve the new fields to display again
    sendMembershiptoEnable(name){
        $.ajax({url: '/php/enable_membership_field.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': name,
                'able': 0
            },
            success: response => {
                this.getPaymentDetails();
            },
            error: response => {
                alert("An error occured!")
            }
        });
    }

    /******************************/
//get the approval settings of the chamber
    getApproval(){
        $.ajax({url: '/php/get_approval_settings.php', type: 'POST',
            dataType: 'json',
            success: response => {
                this.checkifLive();
                this.setState({approval: response})
            },
            error: response => {
                alert("An error occured!")
            }
        });
    }
//if the user changes the approval settings then update
    updateApproval(update){
        $.ajax({url: '/php/update_approval_settings.php', type: 'POST',
            dataType: 'json',
            data:{
                'approval': update
            },
            success: response => {
                this.checkifLive();
                this.getApproval();
            },
            error: response => {
                alert("An error occured!")
            }
        });
    }

    renderTestPayment(){
        console.log("The client token is: ", this.state.clientID)
        return(
            <div>
                <Col sm={6}>
                    <div>
                        Test yout Paypal is set up correctly by sending $0.01.
                    </div>
                </Col>
                    <Col sm={5}>
                        <Payment
                            amount = {0.01}
                            token = {this.state.clientID}/>
                    </Col>
            </div>
        )
    }


    renderPage(){
        return(
            <div className='w3-row' id="edit-signup">
                <div className="w3-container w3-card-4 w3-light-grey">
                    <h2 id="h2-editsignup">Edit Sign up Form</h2>
                    <hr className = "signup-divider" />
                    <div className="w3-container">
                        {this.state.live ? "This Chamber is currently LIVE" : "This Chamber is NOT currently LIVE"}<br/>
                        Users will only be able to access the online Sign up Form if you have:
                        <li>Filled out Membership Payments</li>
                        <li>Added your Paypal Client ID</li>
                        <li>If you dont have your Paypal Client ID ready you can still recieve new users if your Approval settings are Manual </li>
                        <li>If your Approval settings are set to Manual then you must manually approve them before they become a member</li>
                     </div>
                    <hr className = "signup-divider" />
                    <div className="w3-container">
                        <h3
                            id="h3-editsignup">
                            Fields currently on Sign up Form
                        </h3>
                        <FieldTable
                            sendNewFields = {this.sendData}
                            disableField={this.sendFieldtoDisable}
                            enableField={this.sendFieldtoEnable}
                            signupFields = {this.state.signupFields}
                            edit = {this.state.edit}
                            currentIndex = {this.state.currentIndex}
                            updateEdit = {this.updateEdit}
                            sendUpdatedField ={this.sendUpdatedField}
                            editFalse = {this.editFalse}/>
                    </div>
                    <div className="w3-container">
                        <h3
                            id="h3-editsignup">
                            Edit Membership Payments
                        </h3>
                        <hr className = "signup-divider" />
                        <EditPayment
                            paymentFields = {this.state.paymentFields}
                            paymentType={this.state.paymentType}
                            expiry={this.state.expiry}
                            updatePaymentType = {this.updatePayment}
                            addPaymentField = {this.sendMembershipData}
                            enableMembership = {this.sendMembershiptoEnable}
                            disableMembership = {this.sendMembershiptoDisable}
                            updateMembership = {this.sendUpdatedMembership}
                            paymentIndex = {this.state.paymentIndex}
                            updateEdit = {this.updatePaymentEdit}
                            editPaymentFalse = {this.editPaymentFalse}
                            editPayment = {this.state.editPayment}
                        />
                    </div>
                    <div className="w3-container">
                        <h3
                            id="h3-editsignup">
                            Add Paypal Client ID
                        </h3>
                        <hr className = "signup-divider" />
                        <AddClientID
                            token = {this.state.clientID}
                            remove = {this.removeClientID}
                            add = {this.addClientID}
                        />
                    </div>
                    <div className="w3-container" style={{'paddingTop': '4%'}}>
                        {this.state.clientID != null && this.renderTestPayment()}
                    </div>
                    <div className="w3-container">
                        <h3
                            style={{'paddingTop': '7%'}}
                            id="h3-editsignup">
                            Approve New Users
                        </h3>
                        <hr className = "signup-divider" />
                        <ApproveUser
                            approval={this.state.approval}
                            updateApproval={this.updateApproval}/>
                    </div>
                    </div>
            </div>
        )
    }


//only render this component if the user logged in is of type 1
    render(){
        return(
            <div>
                {this.props.user_type === '1' &&
                ((this.state.data1loaded && this.state.data2loaded && this.state.data3loaded) ? this.renderPage() : null)}
            </div>
        );
    }
}

export default EditSignup;
