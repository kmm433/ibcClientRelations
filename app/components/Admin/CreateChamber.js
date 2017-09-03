import React from 'react';
import Address from '../ReusableFields/EnterAddress';
import UserFields from '../ReusableFields/UserFields';

class NewChamber extends React.Component{

constructor(){
    super()

    this.state = {
        email: "",
        confirmemail: "",
        password: "",
        confirmpassword: "",
        firstname: "",
        lastname: "",
        abn: "",
        line1: "",
        line2: "",
        city: "",
        postcode: "",
        state: "",
        country: "",
        parentID: ""
    }
    this.myCallback = this.myCallback.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

/*function to send to child to get the chamber id of page to load*/
myCallback (name, value) {
     this.setState({[name]: value});
 }

handleSubmit(event){
    console.log(this.state.email)
}

renderMenu(){
    return(
        <select value={this.state.value} onChange={this.handleChange}>
            <option key = "select" value="nothing">Select your Chamber</option>)
          {Object.keys(optionsArray).map((item,index) =>
              <option key = {index} value={item}>{optionsArray[item]}</option>)}
        </select>
    )
}


render(){
    return(


        <div className= "signup-fields">
            <h1>ENTER DETAILS FOR NEW CHAMBER</h1>
            <h4>The following fields correspond to the Executive Account of the Chamber</h4>
            <UserFields callbackFromParent={this.myCallback} />
            <hr className = "admin-divider" />
            <Address />
            <label>
                ABN:
                <input type="number" name="abn" value={this.state.abn} onChange={this.handleChange}/>
            </label>

            <button id= "submitform-button" className = "btn" onClick={() => this.handleSubmit()}>Submit</button>
        </div>


    );
}

}

export default NewChamber;
