import React from 'react';

class UserFields extends React.Component{

constructor(props){
    super(props)

    console.log("USERTESTING")

    this.state = {
        email: "",
        confirmemail: "",
        password: "",
        confirmpassword: "",
        firstname: "",
        lastname: ""
    }

    this.handleChange = this.handleChange.bind(this);
}

handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});

    this.props.callbackFromParent(name, value);

}

render(){
    return(
        <div>
            <label>
                Email:
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
            </label>
            <label>
                Confirm Email:
                <input type="email" name="confirmemail" value={this.state.confirmemail} onChange={this.handleChange}/>
            </label>
            <label>
                Password:
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </label>
            <label>
                Confirm Password:
                <input type="password" name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleChange}/>
            </label>
            <label>
                First Name:
                <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
            </label>
            <label>
                Confirm Password:
                <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
            </label>
        </div>
    );
}

}

export default UserFields;
