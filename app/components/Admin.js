import React from 'react';
import AdminMenu from './AdminMenu.js';
import ReactRouter from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';


//This component is responsibe for displaying the menu and the main item component.
class Admin extends React.Component {

  render() {
    return (
      <div>
        <AdminMenu/>
      </div>
    );
  }
};

export default Admin;
