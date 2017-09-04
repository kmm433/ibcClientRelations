import React from 'react';

class NewChamber extends React.Component{

constructor(){
    super()

    this.state = {
        line1: "",
        line2: "",
        city: "",
        postcode: "",
        state: "",
        country: ""
    }
    this.handleChange = this.handleChange.bind(this);
}

handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});

}

render(){
    return(
        <div>
            <label>
                Line 1:
                <input type="text" name="line1" name="line1" value={this.state.line1} onChange={this.handleChange}/>
            </label>
            <label>
                Line 2:
                <input type="text" name="line2" value={this.state.confirmemail} onChange={this.handleChange}/>
            </label>
            <label>
                City:
                <input type="text" name="city" value={this.state.city} onChange={this.handleChange}/>
            </label>
            <label>
                Postcode:
                <input type="number" name="postcode" value={this.state.postcode} onChange={this.handleChange}/>
            </label>
            <label>
                State/Territory:
                <select name="state" value={this.state.state} onChange={this.handleChange}>
                    <option value="NSW" >NSW</option>
                    <option value ="VIC" >VIC</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">NT</option>
                    <option value="TAS">TAS</option>
                    <option value="SA">SA</option>
                </select>
            </label>
            <label>
                Country:
                <input type="text" name="country" value={this.state.country} onChange={this.handleChange}/>
            </label>
        </div>
    );
}

}

export default NewChamber;
