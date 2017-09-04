import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var options = [];

const getOptions = (i) => (event) =>{
   options[i] = event.target.value
}


class Inputs extends React.Component {
    constructor(){
        super()

        this.state = {
            fieldName: "hi",
            optional: 1,
            type: "text",
            minimum: "",
            maximum: "",
            showAddLength: false,
            showAddMenu: false,
            menuName: "",
            menuOptions: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){

        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});


        if(event.target.value == "menu")
            this.setState({showAddMenu: true});
        else
            this.setState({showAddMenu: false});

    }

    handleClick(){
        this.setState({showAddLength: true});
        console.log(this.state.showAddLength)
    }

    handleSubmit(){
        $.ajax({url: '/php/insert_field.php', type: 'POST',
            dataType: 'json',
            data: {
                'displayname': this.state.fieldName,
                'inputtype': this.state.type,
                'mandatory': this.state.optional,
                'minimum': this.state.minimum,
                'maximum': this.state.maximum,
            },
        success: response => {
            console.log(response)
        },
        error: response => {
            console.log(response)
        }

    });
    }

    renderAddLength(){
        return(
            <div>
                <label>
                    Minimum length:
                    <input type="text" name = "minimum" value={this.state.minimum} onChange={this.handleChange}/>
                </label>
                <label>
                    Maximum length:
                    <input type="text"  name = "maximum" value={this.state.maximum} onChange={this.handleChange}/>
                </label>

            </div>

        )

    }

    renderAddMenu(){
        return(
            <div>
                <label>
                    What is the name of the menu to display to the user?
                    <input type="text"  name = "menuName" value={this.state.menuName} onChange={this.handleChange}/>
                </label>

                <label>
                    Option 1:
                    <input type="text"  name = "menuOption" value={this.state.menuOption} onChange={this.handleChange}/>
                </label>
            </div>
        )
    }


    render(){
        return(

            <div className= "signup-fields" >
                <label>
                    Field name to appear on form:
                    <input type="text" name = "fieldName" value={this.state.fieldName} onChange={this.handleChange}/>
                </label>
                <label>
                    Is this an optional field?
                    <select name = "optional" value={this.state.optional} onChange={this.handleChange}>
                        <option value ="1">Yes</option>
                        <option value="2">No</option>
                    </select>
                </label>
                <label>
                    What type of user input?
                    <select name="type" value={this.state.value} onChange={this.handleChange}>
                        <option value="text" >Text</option>
                        <option value ="number" >Number</option>
                        <option value="menu">Menu</option>
                    </select>
                </label>
                {this.state.showAddMenu ? this.renderAddMenu() : null}
                {console.log("testing menu",this.state.showAddMenu)}
                <label>
                    Is there a minimum or maximum length constraint on the user input?
                    <button id= "length-button" className = "btn" onClick={() => this.handleClick()}>Yes</button>
                </label>
                {this.state.showAddLength ? this.renderAddLength() : null}


                <button id= "submitform-button" className = "btn" onClick={() => this.handleSubmit()}>Add to Form</button>

            </div>
        )
    }

}
export default Inputs;
