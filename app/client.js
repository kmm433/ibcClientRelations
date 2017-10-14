import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout.js';
import Admin from './components/Admin.js'
import $ from 'jquery';

class App extends React.Component {

  constructor(props) {
    super(props);
    // Set the default user details
    this.state = {
      user_id: null,
      user_type: "",
      first_name: "",
      chamber_id: "",
    };
  }

  componentWillMount() {

    $.ajax({url: "/php/get_user_details.php", success: result => {
      var user_data = JSON.parse(result);
      this.setState({
        user_id: user_data.UserID,
        user_type: user_data.type,
        first_name: user_data.firstname,
        chamber_id: user_data.chamberID,
      });
    }});
  }

  render(){
    return(
        <BrowserRouter>
            <Layout
              user_id={this.state.user_id}
              user_type={this.state.user_type}
              first_name={this.state.first_name}
              chamber_id={this.state.chamber_id}
            />
        </BrowserRouter>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
