import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Logo from './LogoSideBar.js'
import ChamberDropdown from './SignupDropdown.js';
import SignupForm from './SignupRetrieveFields.js'
import $ from 'jquery';

class Main extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          chamber_id: '',
          chamber_list: []
        };
    }

    /*ajax call to get list of chambers to display*/
    componentWillMount() {
      $.ajax({url: '/php/chamber_list.php', type: 'POST', dataType: 'json',
      success: response => {
        console.log('Ajax call occured', response);
        this.setState({chamber_list: response})
      }});
    }


  render() {
    return(
      <div className="establish-fonts">
          <div className="w3-panel w3-blue">
              <Logo/>
          </div>
          <ChamberDropdown chamber_list={this.state.chamber_list} />
      </div>
    )
  }
}

export default Main;
