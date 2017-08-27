import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Link from 'react-router-dom';
import List from './menu.js';
import Page from './RetrieveFields.js';
import $ from 'jquery';

class Main extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          chamber_id: 'test',
          chamber_list: []
        };

      this.myCallback = this.myCallback.bind(this);
    }

    /*ajax call to get list of chambers to display*/
    componentWillMount() {
      $.ajax({url: '/php/chamber_list.php', type: 'POST', dataType: 'json',
      success: response => {
        this.setState({chamber_list: response})
      }});
    }

  /*function to send to child to get the chamber id of page to load*/
  myCallback (dataFromChild) {
       this.setState({ chamber_id: dataFromChild });
   }


  render() {
    return(
      <div>
        <Route exact={true} path='/' render={() => <List callbackFromParent={this.myCallback} chamber_list={this.state.chamber_list} />}/>
        <Route exact={true} path='/signup.php' render={() => <List callbackFromParent={this.myCallback} chamber_list={this.state.chamber_list}/>} />
        <Route path='/page' render={() => <Page listNameFromParent={this.state.chamber_id}/>}/>
      </div>
    )
  }
}

export default Main;
