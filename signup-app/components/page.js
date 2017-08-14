import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DynamicForm from "react-dynamic-form";

var fieldsArray = {}

class Page extends React.Component {

  constructor(props) {
      super(props);
      console.log(props.listNameFromParent)
      console.log("helooooooooo")
      this.state = {
          chamber: props.listNameFromParent
        };
    }

    componentWillMount() {
        var test = this.state.chamber;
        console.log('test',test)
      $.ajax({url: '/php/chamber_form.php', type: 'POST',
          dataType: 'json', async: false,
          data: {
              'test': this.state.chamber
          },
      success: response => {
        console.log('the response',response)
        fieldsArray = response;
        console.log('the array',fieldsArray)

      }});
    }

    handleChange(event) {
        console.log(event.target.value)
    }

  render() {
    return (
    <div>

        <label>
            {Object.keys(fieldsArray).map((item,index) =>
                <label> {fieldsArray[item]}:
                    <input type="text" key = {index} name={fieldsArray[item]} value={fieldsArray[item]}
                        onChange={this.handleChange.bind(this)}/>
                </label>)}
          </label>

          <input type="submit" value="Submit" />


    </div>
    );
  }
}
export default Page;
