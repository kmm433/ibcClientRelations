import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Main from './components/SignupRoute.js';

ReactDOM.render((
  <BrowserRouter>
    <Main />
  </BrowserRouter>
), document.getElementById('signup-app'))
