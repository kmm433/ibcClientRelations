import React from 'react';
import $ from 'jquery';
import Fields from './AdditionalFields.js';
import {Form, Col} from 'react-bootstrap';

var signupFields: [{
     displayname: [],
     columnname: [],
     inputtype: [],
     tablename: []
 }];

 var inputArray = [];
 const getAnswers = (i) => (event) => {
    inputArray[i] = event.target.value
}


class SignupForm extends React.Component {

  constructor(props) {
      super(props);
      console.log("This is this rendering", this.props.list)

      this.state = ({
          safeSubmit: false
      });

      var storeAnswers = [];

      this.storeUserData = this.storeUserData.bind(this);
      this.renderEnableBtn = this.renderEnableBtn.bind(this);
      this.renderDisabledbtn = this.renderDisabledbtn.bind(this);
}

    componentWillReceiveProps(nextProps){
        signupFields=nextProps.list;
        console.log("Now its", signupFields)
    }

    storeUserData(data, index){
        storeAnswers[index] = data;
        console.log("Answers:", storeAnswers)
    }

     renderEnableBtn(){
         return(
             <button className = "btn">Submit</button>
         )
     }


     renderDisabledbtn(){
         return(
             <button className = "btn" disabled>Submit</button>
         )
     }

     checkIfConfirm(){


     }


  render() {
    return (
        <div className="w3-row">
            <div className="w3-col s10">
                <Form className="w3-container w3-card-4 w3-light-grey" horizontal={true}>
                    <div id="signup-headings">Membership Form</div>
                    {this.props.list.map((item, i) =>
                            <Fields key = {i}
                                    type = {this.props.list[i].inputtype}
                                    name = {this.props.list[i].displayname}
                                    mandatory = {this.props.list[i].mandatory}
                                    confirm = {this.checkIfConfirm(this.props.list[i].displayname)}
                                    userAnswer = {this.storeUserData}
                                    index = {i}/>
                            )}
                    {this.safeSubmit ? this.renderEnableBtn() : this.renderDisabledbtn()}
                </Form>
            </div>
        </div>
    );
  }
}
export default SignupForm;
