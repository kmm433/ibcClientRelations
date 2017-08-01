import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout.js';

class App extends React.Component {
  render(){
    return(
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
