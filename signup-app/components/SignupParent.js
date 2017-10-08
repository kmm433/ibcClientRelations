import React from 'react';
import Logo from './LogoHeader.js'
import ChamberDropdown from './SignupDropdown.js';
import SignupData from './SignupData.js';
import $ from 'jquery';
import {ButtonToolbar, Button} from 'react-bootstrap';
import Actions from './test.js';

class Main extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          chamber_list: [],
          chamber: "Please Select a Chamber",
          selected: false
        };

        this.getChamber = this.getChamber.bind(this);
    }

    /*ajax call to get list of chambers to display*/
    componentWillMount() {


      $.ajax({url: '/php/chamber_list.php', type: 'POST', dataType: 'json',
      success: response => {
        console.log('Ajax call occured', response);
        this.setState({chamber_list: response})
      }});
      var chamberlist = Actions.GetChamberList();
      console.log("flux",chamberlist)
    }

    getChamber(newChamber){
        console.log("Is this updating?", newChamber)
        this.setState({
            chamber: newChamber,
            selected: true
        })
    }


  render() {
    return(
      <div className="establish-fonts">
          <div className="w3-panel w3-blue">
              <Logo/>
          </div>
          <ButtonToolbar>
              <Button style={{'marginLeft': '3%'}}>
                     <a href="/signin.php">Back to Login</a>
             </Button>
              <ChamberDropdown
                  selectedChamber={this.state.chamber_list[this.state.chamber]}
                  chamber_list={this.state.chamber_list}
                  sendChamber={this.getChamber}/>
          </ButtonToolbar>
          {this.state.selected && <SignupData chamberID={this.state.chamber}/>}
      </div>
    )
  }
}

export default Main;
