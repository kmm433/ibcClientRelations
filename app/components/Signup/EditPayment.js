import React from 'react';
import {Table, Button, ButtonGroup} from 'react-bootstrap';
import PaymentType from './PaymentType.js'

class EditPayment extends React.Component {
    constructor(props){
        super(props);

        var array = []
        for(var i; i< this.props.paymentFields.length; i++){
            array.push(false);
        }

        this.state = ({
            newMembershipType: "",
            newInfo: "",
            newAmount: "",
            membershipID: ""
        })

        this.renderTable = this.renderTable.bind(this);
        this.renderEditField = this.renderEditField.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.renderAddField = this.renderAddField.bind(this);
        this.renderSubmitDisabled = this.renderSubmitDisabled.bind(this);
        this.renderSubmitEnabled = this.renderSubmitEnabled.bind(this);
        this.checkSubmitReady = this.checkSubmitReady.bind(this);
        this.editBtn = this.editBtn.bind(this);
        this.handleEnable = this.handleEnable.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.updateParentPaymentType = this.updateParentPaymentType.bind(this);
        this.outputDisabled = this.outputDisabled.bind(this);

    }
//when the membership info is updated, fill the state with the new memberships recieved from parent
    componentWillReceiveProps(nextProps){
        var i = nextProps.paymentIndex;
        nextProps.editPayment &&
        this.setState({
            newMembershipType: nextProps.paymentFields[i].name,
            newInfo: nextProps.paymentFields[i].info,
            newAmount: nextProps.paymentFields[i].amount,
            membershipID: nextProps.paymentFields[i].membershipID
        })
        }
//send the selected payment type and expiry date to the parent
    updateParentPaymentType(paymentType, expiry){
        this.props.updatePaymentType(paymentType, expiry);
    }

//store the user input values
    handleChange(event){
        var name = event.target.name;
        var value = event.target.value;;
        this.setState({
            [name]: value
        })
    }

//if something is disabled display in red
    outputDisabled(){
        return(
            <text style={{'fontStyle': 'italic', 'color': 'red', 'padding': '2%'}}>Disabled</text>
        )
    }

    //this table displays all the membership payment info for the chamber
    renderTable(){
        return (
            <div>
                <Table striped condensed hover>
                  <thead>
                      <tr id="edit-signup-table">
                        <th> Membership Type </th>
                        <th> Additional Info </th>
                        <th> Payment Amount </th>
                        <th> Edit </th>
                      </tr>
                  </thead>
                  <tbody>
                     {this.props.paymentFields.map((item, i) =>
                          <tr key = {this.props.paymentFields[i].name}>
                            <td>{this.props.paymentFields[i].disabled==='1' && this.outputDisabled()}
                                {this.props.paymentFields[i].name}</td>
                            <td>{this.props.paymentFields[i].info}</td>
                            <td>${this.props.paymentFields[i].amount}</td>
                            <td> {this.editBtn(i)}</td>
                      </tr>)}
                      {this.props.editPayment ? this.renderEditField() : this.renderAddField()}
                  </tbody>
              </Table>
          </div>
        );
    }

    //if the user presses the edit field button, render input fields full of the corresponding field they selected
    renderEditField(){
        var i = this.props.paymentIndex;

        return(
            <tr className = "edit-signup-input">
                <td><input
                    type = "text"
                    name = "newMembershipType"
                    value={this.state.newMembershipType}
                    onChange={this.handleChange}/></td>
                <td><input
                    type = "text"
                    name = "newInfo"
                    value={this.state.newInfo}
                    onChange={this.handleChange}/></td>
                <td><input
                    type = "number"
                    name = "newAmount"
                    value={this.state.newAmount}
                    onChange={this.handleChange}/></td>
                <td>
                    <ButtonGroup>
                        <Button
                            bsSize="small"
                            bsStyle="primary"
                            onClick={this.handleEditSubmit}>
                            Confirm
                        </Button>
                            <Button
                                bsStyle="danger"
                                bsSize="small"
                                onClick={this.handleCancel}>
                                Cancel
                            </Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }

    //add a new field
    renderAddField(){
        return(
            <tr className = "edit-signup-input">
                <td><input
                    type = "text"
                    name = "newMembershipType"
                    value={this.state.newMembershipType}
                    onChange={this.handleChange}/></td>
                <td><input
                    type = "text"
                    name = "newInfo"
                    value={this.state.newInfo}
                    onChange={this.handleChange}/></td>
                <td><input
                    type = "number"
                    name = "newAmount"
                    value={this.state.newAmount}
                    onChange={this.handleChange}/></td>
                <td>
                    {this.checkSubmitReady() ? this.renderSubmitEnabled() : this.renderSubmitDisabled()}
                </td>
            </tr>
        )
    }

    editBtn(i){
        return(
            <ButtonGroup id="edit-btn">
                <Button
                    bsStyle="primary"
                    bsSize="small"
                    name={i}
                    onClick={this.handleEdit}>
                    Edit
                </Button>
                {this.props.paymentFields[i].disabled==='0' ?
                    <Button
                        bsStyle="danger"
                        bsSize="small"
                        name={i}
                        onClick={this.handleRemove}>
                        Remove
                    </Button>
                    :
                    <Button
                        bsStyle="success"
                        bsSize="small"
                        name={i}
                        onClick={this.handleEnable}>
                        Enable
                    </Button>}
            </ButtonGroup>
        )
    }

    handleEditSubmit(){
        console.log(this.state)
        console.log(this.state.newMembershipType, this.state.newInfo, this.state.newAmount)
        this.props.updateMembership(this.state.membershipID, this.state.newMembershipType, this.state.newInfo, this.state.newAmount)
        this.setState({
            newMembershipType: "",
            newInfo: "",
            newAmount: "",
            membershipID: ""
        })
    }

    handleCancel(event){
        console.log("Updating:")
        this.setState({
            newMembershipType: "",
            newInfo: "",
            newAmount: "",
            membershipID: ""
        })
        this.props.editPaymentFalse()
    }
    //if edit has been enabled then update the edit field
    handleEdit(event){
        console.log("index is: ", event.target.name)
        var index = event.target.name;
        this.props.updateEdit(index)
    }

    handleRemove(event){
        var i = event.target.name;
        console.log("removing", event.target.name);
        this.props.disableMembership(this.props.paymentFields[i].name);
    }

    handleEnable(event){
        var i = event.target.name;
        console.log("editing", event)
        this.props.enableMembership(this.props.paymentFields[i].name);
    }

    checkSubmitReady(){
        var ready = false;
        if(this.state.newMembershipType &&
        this.state.newInfo &&
        this.state.newAmount){
            ready = true;
        }
        return(ready)
    }

    renderSubmitDisabled(){
        return(
            <Button
                bsSize="small"
                bsStyle="primary"
                onClick={this.handleSubmit}
                disabled>
                {this.state.addfield ? "Add Another Field" : "Add New Field"}
            </Button>
        )
    }

    renderSubmitEnabled(){
        return(
            <Button
                bsSize="small"
                bsStyle="primary"
                onClick={this.handleSubmit}>
                {this.state.addfield ? "Add Another Field" : "Add New Field"}
            </Button>
        )
    }

    handleSubmit(){
        this.props.addPaymentField(this.state.newMembershipType, this.state.newInfo, this.state.newAmount)
        this.setState({
            newMembershipType: "",
            newInfo: "",
            newAmount: "",
            membershipID: ""
        })
    }

    render(){
        return(
            <div className="container">
                {this.renderTable()}
                <PaymentType
                    paymentType={this.props.paymentType}
                    expiry={this.props.expiry}
                    updatePaymentType={this.updateParentPaymentType}/>
            </div>

        )
    }
}

export default EditPayment;
