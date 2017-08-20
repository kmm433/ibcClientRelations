import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var inputArray = [];

class Fields extends React.Component {

  constructor(props) {
      super(props);
      console.log("display",props.displayname)

      this.state = {
          input: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
     console.log(event.target.value)
    }

    handleSubmit(event){
        console.log(event.target.value)
        this.setState({input: event.target.value});

            $.ajax({url: '/php/insert_user_data.php', type: 'POST', dataType: 'json',
                data: {
                    'test': this.state.input
                },
            success: response => {
              console.log("success")
            }});

        console.log("submitted")
    }

    render(){
        return(
            <div>
            <label>
                <div>
                    {console.log("input", this.props.displayname)}
                        {this.props.displayname.map((item, i) =>
                            <label key ={item}>
                                {item}:
                                <input key ={item} type={this.props.inputype} name={this.props.columnname} onChange={this.handleChange} />
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

/*{Object.keys(this.state.displayname).map((item,i) =>
    <label> {this.state.displayname[i]} {console.log("test", item)}
        <input type={this.state.inputtype[i]} key = {this.state.displayname[i]} name={this.state.displayname[i]}
            onChange={this.handleChange}/>
    </label>)}*/
