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
            edit: false,
            newMembershipType: "",
            newInfo: "",
            newAmount: ""
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


    }

    updateParentPaymentType(paymentType, expiry){
        this.props.updatePaymentType(paymentType, expiry);

    }

    handleChange(event){
        console.log(event.target.value)
        var name = event.target.name;
        var value = event.target.value;;
        this.setState({
            [name]: value
        })
    }

    renderTable(){
        return (
                <Table striped bordered condensed hover>
                  <thead>
                      <tr>
                        <th> Membership Type </th>
                        <th> Additional Info </th>
                        <th> Payment Amount </th>
                        <th> Edit </th>
                      </tr>
                  </thead>
                  <tbody>
                     {this.props.paymentFields.map((item, i) =>
                          <tr key = {this.props.paymentFields[i].name}>
                            <td>{this.props.paymentFields[i].disabled==='1' ? this.outputDisabled() : ""}
                                {this.props.paymentFields[i].name}</td>
                            <td>{this.props.paymentFields[i].info}</td>
                            <td>${this.props.paymentFields[i].amount}</td>
                            <td> {this.editBtn(i)}</td>
                      </tr>)}
                      {this.props.edit ? this.renderEditField() : this.renderAddField()}
                  </tbody>
              </Table>
        );
    }

    renderEditField(){
        var i = this.props.currentIndex;
        console.log(i)

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
        //this.props.sendUpdatedField(this.state.Membership, this.state.newOptional, this.state.newType, this.state.newMin, this.state.newMax);

        this.setState({
            newMembershipType: "",
            newInfo: "",
            newAmount: ""
        })
    }

    handleCancel(event){
        console.log("Updating:")
        this.setState({
            newMembershipType: "",
            newInfo: "",
            newAmount: ""
        })
    }

    handleEdit(event){
        var index = event.target.name;
        //this.props.updateEdit(index)
    }

    handleRemove(event){
        var index = event.target.name;
        console.log("removing", event.target.name);
        //this.props.disableField(this.props.signupFields[index].displayname);
    }

    handleEnable(event){
        var index = event.target.name;
        console.log("editing")
        //this.props.enableField(this.props.signupFields[index].displayname);
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
        this.setState({
            newMembershipType: "",
            newInfo: "",
            newAmount: ""
        })
    }

    render(){
        return(
            <div className="container">
                <PaymentType
                    paymentType={this.props.paymentType}
                    expiry={this.props.expiry}
                    updatePaymentType={this.updateParentPaymentType}/>
                {this.renderTable()}
            </div>

        )
    }
}

export default EditPayment;
