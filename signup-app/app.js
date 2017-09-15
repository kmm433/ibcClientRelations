import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Main from './components/SignupParent.js';

ReactDOM.render((
  <BrowserRouter>
    <Main />
  </BrowserRouter>
), document.getElementById('signup-app'))
