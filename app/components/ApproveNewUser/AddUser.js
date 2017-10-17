import React from 'react';
import $ from 'jquery';
import {Form, Col} from 'react-bootstrap';
import SignupForm from '../../../signup-app/components/SignupFormChild.js'

class SignupData extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          loaded: false,
          loaded1: false,
          loaded3: false
      }

        this.getFields = this.getFields.bind(this);
}

    componentWillMount(){
        this.getFields(this.props.chamberID);
    }

    getFields(data){
      $.ajax({url: '/php/get_chambersignup.php', type: 'POST',
          dataType: 'json',
          data: {'addUser': true },
          success: response => {
              this.setState({
                  signupFields: response,
                  loaded: true
              });
              console.log("the chamber searching for: ", response)
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
                'chamber': this.props.chamberID,
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

    renderSignupForm(){
        console.log("Is this working")
        return(
            <SignupForm
                fields={this.state.signupFields}
                sendData={this.sendData}
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
