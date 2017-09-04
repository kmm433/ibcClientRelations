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
    console.log("testing")
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
                <input type="confirmemail" name="confirmemail" value={this.state.confirmemail} onChange={this.handleChange}/>
            </label>
            <label>
                Password:
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </label>
            <label>
                Confirm Password:
                <input type="confirmpassword" name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleChange}/>
            </label>
        </div>
    );
}

}

export default UserFields;
