import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Inputs from './AddSignupField';

var checked = null;


class Form extends React.Component {

  constructor(props) {
      super(props);
      console.log("loading")

      this.state = {
          chamber: 666,
          displayname: [],
          columnname: [],
          inputtype: [],
          checked: false,
          disabled: false,
          showAddField: false
        };

        this.renderAppearonForm = this.renderAppearonForm.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    //ajax request to retrieve the fields on the sign up form that correspond to the chamber selected
    componentWillMount() {
        this.getFields();
    }

    getFields(){
        var test = this.state.chamber;

      $.ajax({url: '/php/chamber_form.php', type: 'POST',
          dataType: 'json',
          data: {
              'test': this.state.chamber
          },
      success: response => {

        var temp1=[], temp2=[], temp3=[], temp4=[], temp5=[], temp6=[];


        for(var i=0; i<response.length; i++){
            temp1[i] = response[i].displayname;
            temp2[i] = response[i].columnname;
            temp3[i] = response[i].inputtype;
            temp4[i] = response[i].minimum;
            temp5[i] = response[i].maximum;
            temp6[i] = response[i].mandatory;
        }

        console.log("what's this",temp6)

        this.setState({
            displayname: temp1,
            columnname: temp2,
            inputtype: temp3,
            minimum: temp4,
            maximum: temp5,
            disabled: temp6
        })
      }});
    }

    renderAppearonForm(){
        return(
            this.state.displayname.map((item, i) =>
                <tr key = {item}>
                    <td>{item}</td>
                {console.log(this.state.disabled[i])}
                    {(this.state.disabled[i]=='1') ? this.disabledInput() : this.notdisabledInput()}
                    <td>{this.state.inputtype[i]}</td>
                    <td id="editsignup-value">{this.state.minimum[i]}</td>
                    <td id="editsignup-value">{this.state.maximum[i]}</td>
                </tr>
                )

        );
    }

    disabledInput(){
        console.log("Here")
        return(
            <td><input id="signup-checkbox"
                type="checkbox"
                defaultChecked="false" disabled/></td>
        )

    }

    notdisabledInput(){
        console.log("Here too")
        return(
            <td><input id="signup-checkbox"
                type="checkbox"
                defaultChecked="false"/></td>
        )
    }

    renderTable(){
        return (
            <div>
                <table id='edit-fields-table' className='rounded-table'>
                  <thead>
                      <tr>
                        <th> Name of Field </th>
                        <th> Optional </th>
                        <th> Type </th>
                        <th> Minimum Value </th>
                        <th> Maximum Value </th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.renderAppearonForm()}
                  </tbody>
                </table>

            </div>


        );

    }

    handleClick(){
        this.setState({showAddField: true});
        console.log(this.state.showAddField)
    }


  render() {
      return(
          <div>
              <div className="container">
                  {this.renderTable()}
              </div>
              <label id = "addfields-label">
                  Would you like to add a new field?
                  <button id="addfield-button" className = "btn" onClick={() => this.handleClick()}>Yes</button>
              </label>
              <div>
                  {this.state.showAddField ? <Inputs /> : null}
              </div>

          </div>
      );
  }
}
export default Form;
