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
           }]
      }

        this.getFields = this.getFields.bind(this);
        this.sendData = this.sendData.bind(this);
}

    componentWillMount(){
        console.log("rendering chamber: ", this.props.chamberID)
        this.getFields(this.props.chamberID);
    }

    componentWillReceiveProps(nextProps){
        console.log("rendering the next chamber: ", nextProps.chamberID)
        this.getFields(nextProps.chamberID);
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
          }
      });
    }

    sendData(answers){
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
                'chamber': this.props.chamberID,
                'answers': answers,
                'DataID': data,
                'tablename': tablename,
                'columnname': columnname
            },
            success: response => {
                console.log("success",response)
            },
            error: (xhr, status, err) => {
                console.log("error",xhr, status, err)
            }
        });
    }

  render() {
    return (
        <div>
            {this.state.loaded ?
            <SignupForm
                fields={this.state.signupFields}
                sendData={this.sendData}/>
            : null}
        </div>
    );
  }
}
export default SignupData;
