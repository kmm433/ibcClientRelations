import React from 'react';
import $ from 'jquery';
import {Table, Button, ButtonGroup} from 'react-bootstrap';
import DropDown from './dropdown.js';

class FieldTable extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          newDisplayname: "",
          newOptional: "",
          newType: "",
          newMin: "",
          newMax: "",
          currentIndex: "",
          addfield: false
      }


      console.log("testing dataID", this.props.signupFields[0].DataID)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.renderAddField = this.renderAddField.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.selectType = this.selectType.bind(this);
        this.editBtn = this.editBtn.bind(this);
        this.disabledEditBtn = this.disabledEditBtn.bind(this);
        this.handleEnable = this.handleEnable.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.outputDisabled = this.outputDisabled.bind(this);

    }

    componentWillReceiveProps(nextProps){
        var i = nextProps.currentIndex;
        nextProps.edit &&
        this.setState({
            newDisplayname: nextProps.signupFields[i].displayname,
            newOptional: nextProps.signupFields[i].mandatory,
            newType: nextProps.signupFields[i].type,
            newMin: nextProps.signupFields[i].minimum,
            newMax: nextProps.signupFields[i].maximum
        })

        console.log("Receiving:", nextProps.signupFields[i].inputtype)
    }



    disabledInput(){
        return(
            <td><input id="signup-checkbox"
                type="checkbox"
                defaultChecked="false" disabled/></td>
        )

    }

    notdisabledInput(){
        return(
            <td><input id="signup-checkbox"
                type="checkbox"
                defaultChecked="false"/></td>
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
                {this.props.signupFields[i].disabled==='0' ?
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

    disabledEditBtn(){
        return(
            <ButtonGroup id="edit-btn">
                <Button
                    bsStyle="primary"
                    bsSize="small"
                    disabled>
                    Edit
                </Button>
                <Button
                    bsStyle="danger"
                    bsSize="small"
                    disabled>
                    Remove
                </Button>
            </ButtonGroup>
        )
    }

    outputDisabled(){
        return(
            <text style={{'fontStyle': 'italic', 'color': 'red', 'padding': '2%'}}>Disabled</text>
        )
    }


    renderTable(){
        const tables = ["BUSINESS", 'USER', "ignore"];

        return (
                <Table striped bordered condensed hover>
                  <thead>
                      <tr>
                        <th> Name of Field </th>
                        <th id="columnWidth"> Optional </th>
                        <th style={{'width': '20%'}}> Type </th>
                        <th id="columnWidth"> Minimum Value </th>
                        <th id="columnWidth"> Maximum Value </th>
                        <th id="columnWidth"> </th>
                      </tr>
                  </thead>
                  <tbody>
                     {this.props.signupFields.map((item, i) =>
                          <tr key = {this.props.signupFields[i].displayname}>
                              <td>{this.props.signupFields[i].disabled==='1' ? this.outputDisabled() : ""}
                                  {this.props.signupFields[i].displayname}</td>
                                  {tables.includes(this.props.signupFields[i].tablename)
                                  ? this.disabledInput() : this.notdisabledInput(i)}
                              <td>{this.props.signupFields[i].inputtype}</td>
                              <td id="editsignup-value">{this.props.signupFields[i].minimum}</td>
                              <td id="editsignup-value">{this.props.signupFields[i].maximum}</td>
                          <td> {tables.includes(this.props.signupFields[i].tablename)
                                  ? this.disabledEditBtn() : this.editBtn(i)}</td>
                      </tr>)}
                      {console.log("editing is:", this.props.edit)}
                      {this.props.edit ? this.renderEditField() : this.renderAddField()}
                  </tbody>
              </Table>
        );
    }

    renderAddField(){
        const typeOptions = ['email', 'password', 'text', 'number', 'menu'];

        return(
            <tr className = "edit-signup-input">
                <td><input
                    type = "text"
                    name = "newDisplayname"
                    value={this.state.newDisplayname}
                    onChange={this.handleChange}/></td>
                <td><input
                    type = "checkbox"
                    name = "newOptional"
                    value={this.state.newOptional}
                    onChange={this.handleChange}/></td>
                <td><DropDown
                    typeOptions={typeOptions}
                    selecting = {this.selectType}
                    default = {this.state.newType ? this.state.newType : "Choose Type"}/></td>
                <td><input
                    type = "number"
                    name = "newMin"
                    value={this.state.newMin}
                    onChange={this.handleChange}/></td>
                <td><input
                    type = "number"
                    name = "newMax"
                    value={this.state.newMax}
                    onChange={this.handleChange}/></td>
                <td><Button
                    bsSize="small"
                    bsStyle="primary"
                    onClick={this.handleSubmit}>{this.state.addfield ? "Add Another Field" : "Add New Field"}
                </Button></td>
            </tr>
        )
    }

    renderEditField(){
        const typeOptions = ['email', 'text', 'number', 'menu'];
        var i = this.props.currentIndex;
        console.log(i)
        console.log("What is the new type",this.state.newType)

        return(
            <tr className = "edit-signup-input">
                <td><input
                    type = "text"
                    name = "newDisplayname"
                    value={this.state.newDisplayname}
                    onChange={this.handleChange}/></td>
                <td><input
                    type = "checkbox"
                    name = "newOptional"
                    value={this.state.newOptional}
                    onChange={this.handleChange}/></td>
                <td><DropDown
                    typeOptions={typeOptions}
                    selecting = {this.selectType}
                    default={this.state.newType ? this.state.newType : "text"}/></td>
                <td><input
                    type = "number"
                    name = "newMin"
                    value={this.state.newMin}
                    onChange={this.handleChange}/></td>
                <td><input
                    type = "number"
                    name = "newMax"
                    value={this.state.newMax}
                    onChange={this.handleChange}/></td>
                <td><Button bsSize="small"
                    bsStyle="primary"
                    onClick={this.handleEditSubmit}>
                    Confirm Changes
                </Button></td>
            </tr>
        )
    }

    selectType(type){
        console.log("is this working", type)
        this.setState({
            newType: type
        })
    }

    handleChange(event){
        console.log(event.target.value)
        var name = event.target.name;
        var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(){
        this.props.sendNewFields(this.state.newDisplayname, this.state.newOptional, this.state.newType, this.state.newMin, this.state.newMax);

        this.setState({
            newDisplayname: "",
            newOptional: false,
            newType: "",
            newMin: "",
            newMax: ""
        })
    }

    handleEditSubmit(){
        console.log("Handling the index")
        this.props.sendUpdatedField(this.state.newDisplayname, this.state.newOptional, this.state.newType, this.state.newMin, this.state.newMax);

        this.setState({
            newDisplayname: "",
            newOptional: false,
            newType: "",
            newMin: "",
            newMax: ""
        })
    }

    handleRemove(event){
        var index = event.target.name;
        console.log("removing", event.target.name);
        this.props.disableField(this.props.signupFields[index].displayname);
    }

    handleEnable(event){
        var index = event.target.name;
        console.log("editing")
        this.props.enableField(this.props.signupFields[index].displayname);
    }

    handleEdit(event){
        var index = event.target.name;
        this.props.updateEdit(index)
    }


  render() {
      return(
          <div className="container">
              {this.renderTable()}
          </div>
      );
  }
}
export default FieldTable;
