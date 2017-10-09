import $ from 'jquery';
import dispatcher from '../dispatcher.js';

export function fetchChambers(){
    $.ajax({url: '/php/chamber_list.php', type: 'POST', dataType: 'json',
    success: response => {
      console.log('Ajax call occured', response);
      this.setState({chamber_list: response})
    }});
}
