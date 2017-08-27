import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Fields from './inputfields.js'


class Page extends React.Component {

  constructor(props) {
      super(props);

      //get the chamberID of the selected chamber from parent
      this.state = {
          chamber: props.listNameFromParent,
          displayname: [],
          columnname: [],
          inputtype: [],
          tablename: []
        };

    }

    //ajax request to retrieve the fields on the sign up form that correspond to the chamber selected
    componentWillMount() {
        this.getFields();
    }

    getFields(){

      $.ajax({url: '/php/chamber_form.php', type: 'POST',
          dataType: 'json',
          data: {
              'test': this.state.chamber
          },
      success: response => {
        var temp1=[], temp2=[], temp3=[], temp4=[];

        for(var i=0; i<response.length; i++){
            temp1[i] = response[i].displayname;
            temp2[i] = response[i].columnname;
            temp3[i] = response[i].inputtype;
            temp4[i] = response[i].tablename;
        }
        console.log("testing", temp4)
        this.setState({
            displayname: temp1, columnname: temp2, inputtype: temp3, tablename: temp4
        })
      }});
    }

  render() {
    return (
        <div>
            <Fields chamber= {this.props.listNameFromParent} displayname={this.state.displayname} columnname={this.state.columnname} inputtype={this.state.inputtype} tablename={this.state.tablename} />
        </div>

    );
  }
}
export default Page;
