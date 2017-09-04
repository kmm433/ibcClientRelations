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
      user_type: "",
      first_name: ""
    };
  }

  componentWillMount() {
    $.ajax({url: "/php/get_user_details.php", success: result => {
      var user_data = JSON.parse(result);
      this.setState({
        user_type: user_data.type,
        first_name: user_data.firstname
      });
    }});
  }

  render(){
    return(
        <BrowserRouter>
            <Layout user_type={this.state.user_type} first_name={this.state.first_name}/>
        </BrowserRouter>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
