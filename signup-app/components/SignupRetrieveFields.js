import React from 'react';
import $ from 'jquery';
import Fields from './AdditionalFields.js';
import {Form, Col} from 'react-bootstrap';
import SignupForm from './SignupMiddle.js'

var signupFields: [{
     displayname: [],
     columnname: [],
     inputtype: [],
     tablename: []
 }];

class Middle extends React.Component {

  constructor(props) {
      super(props);

      //get the chamberID of the selected chamber from parent
      this.state = {
          chamber: props.chamberID,
          testing: ""
        }
        console.log("chamber id", props.chamberID)
}

    //ajax request to retrieve the fields on the sign up form that correspond to the chamber selected
    componentWillMount() {
        console.log("Making anothe ")
        this.getFields();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            chamber: nextProps.chamberID
        })
        this.getFields();
    }


    getFields(){
      $.ajax({url: '/php/chamber_form.php', async: false, type: 'POST',
          dataType: 'json',
          data: {'chamber': this.state.chamber},
          success: response => {
              signupFields = response;
              console.log("the chamber searching for: ", response)
          }
      });
    }

  render() {
      console.log("signupfields", signupFields)
    return (
        <SignupForm list={signupFields} chamberName={this.state.chamber}/>

    );
  }
}
export default Middle;
