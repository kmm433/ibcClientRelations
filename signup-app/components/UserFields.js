/*import React from 'react';
import $ from 'jquery';
import {isEmail} from 'validator';

class UserFields extends React.Component{

constructor(props){
    super(props)

    this.state = {
        valid: null,
        errorMessage: ""
    }

    this.checkValid = this.checkValid.bind(this);
    this.checkDuplicate = this.checkDuplicate.bind(this);
    this.renderEmailCheck = this.renderEmailCheck.bind(this);
    this.renderPasswordCheck = this.renderEmailCheck.bind(this);
    this.renderGeneralCheck = this.renderEmailCheck.bind(this);
    this.renderNumberCheck = this.renderEmailCheck.bind(this);
}

checkDuplicate(email) {
    var answer;
    $.ajax({url: '/php/user_duplicate.php', type: 'POST', async:false, dataType: 'json',
        data: {'email': email},
        success: response => {
            console.log("exists: ", email)
            if(response === '1' ){
                this.setState({
                    error: "Email already exisits",
                    valid: "error"
                })
            }
            else{
                this.setState({
                    error: "",
                    valid: "success",
                    email: email
                })
            }
        }
    });

}

renderEmailCheck(email){
    isEmail(email) ? this.checkDuplicate(email) :
    this.setState({
        error: "Invalid Email",
        valid: "error"
    })
}

renderPasswordCheck(){
    console.log("This is working")
}

renderGeneralCheck(){
    console.log("This is working")
}

renderNumberCheck(){
    console.log("This is working")
}

checkValid(data, type, emailerror){

    if(emailerror === "Email's do not match"){
        this.setState({
            error: "Email's do not match",
            valid: "error"
        })
    }
    else{
        type === "email" && this.renderEmailCheck(data)
        type === "password" && this.renderPasswordCheck(data)
        type === "text" && this.renderGeneralCheck()
        type === "number" && this.renderNumberCheck()
    }
}


render(){
    return(
        <div>
            <GetData
                displayName = {this.props.displayName}
                valid={this.state.valid}
                type={this.props.type}
                error={this.state.error}
                checkValid={this.checkValid}/>
        </div>
    );
}

}

export default UserFields;
*/
