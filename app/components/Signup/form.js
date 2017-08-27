import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class Form extends React.Component {

  constructor(props) {
      super(props);
      console.log("loading")

      this.state = {
          chamber: 3,
          displayname: [],
          columnname: [],
          inputtype: []
        };

    }

    //ajax request to retrieve the fields on the sign up form that correspond to the chamber selected
    componentWillMount() {

        var test = this.state.chamber;

      $.ajax({url: '/php/chamber_form.php', type: 'POST',
          dataType: 'json', async: false,
          data: {
              'test': this.state.chamber
          },
      success: response => {

        var temp1=[];
        var temp2=[];
        var temp3=[];

        for(var i=0; i<response.length; i++){
            temp1[i] = response[i].displayname;
            temp2[i] = response[i].columnname;
            temp3[i] = response[i].inputtype;
        }
        this.setState({
            displayname: temp1,
            columnname: temp2,
            inputtype: temp3
        })
      }});
    }


  render() {
    return (

        <table id='member-list' className='rounded-table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Business</th>
              <th>Membership Expiry</th>
            </tr>
          </thead>
        </table>

    );
  }
}
export default Form;
