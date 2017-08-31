import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import matches from 'validator/lib/matches';

var inputArray = [];
var variable = "test";

 const getAnswers = (i) => (event) =>{
    inputArray[i] = event.target.value
}
const checkDuplicate = (e) => {
    console.log("sending", e)
    $.ajax({url: '/php/user_duplicate.php', type: 'POST', dataType: 'json',
        data: {
            'email': e,
        },
    success: response => {
            console.log("exists: ", response)
            return(response);
    }});
}


class Fields extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          errorEmail: "",
          errorPassword: "",
          email: "",
          password: "",
          input: [],
          answers: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        this.sendAnswers();
        console.log(inputArray)
    }

    sendAnswers() {
        console.log(this.props.columnname)
        console.log(inputArray)
        $.ajax({url: '/php/insert_user_data.php', type: 'POST', dataType: 'json',
            data: {
                'chamberID': this.props.chamber,
                'email': this.state.email,
                'password': this.state.password,
                'answers': inputArray,
                'column': this.props.columnname,
                'table': this.props.tablename
            },
        success: response => {
                console.log("successful", response)
        },
        error: response => {console.log("unsuccessful", response)}
    });
    }

    validateEmail(event) {
        var temp = event.target.value;
        this.setState({ email: event.target.value})
        if(!(isEmail(temp)))
            this.setState({errorEmail: "Invalid Email"});
        else {
            if((checkDuplicate(temp))==false)
                this.setState({ errorEmail: "That email is already assigned to a user"})

        }
    }
    validatePassword(event) {
        var temp = event.target.name;
        console.log("great", event.target.name)
        var options = {min:8, max: 16};
        if(!(isLength(event.target.value, options)))
            this.setState({errorPassword: "Password must be 8-16 characters"});
        else
            this.setState({password: event.target.value});

            console.log("password",this.state.password)
        if(event.target.name == 'confirmpassword' && !(event.target.value == this.state.password)){
            this.setState({errorPassword: "Password's do not match"});
        }
    }

    render(){
        return(
            <div>
            <label>
                <div>
                    <label> {this.state.errorEmail} </label>
                        <label className= "signup-fields">
                            Email:
                            <input key ="username" type="email" name="email" onBlur={this.validateEmail}/>
                        </label>
                        <label> {this.state.errorPassword} </label>
                        <label className= "signup-fields">
                            Password:
                            <input key ="pass" type="password" name="password" onBlur={this.validatePassword} />
                        </label>
                        <label className= "signup-fields">
                            Confirm Password:
                            <input key ="passconfirm" type="password" name="confirmpassword" onBlur={this.validatePassword} />
                        </label>

                        {this.props.displayname.map((item, i) =>
                            <label className= "signup-fields" key ={item}>
                                {item}:
                                <input key ={item} type={this.props.inputype} name={this.props.displayname} onChange={getAnswers(i)} />
                            </label>
                        )}
                    <input type="submit" value="Submit" onClick={this.handleSubmit}/>
                </div>
              </label>
      </div>

        )
    }
}
export default Fields;
