import FluxAction from 'flux-action';
import $ from 'jquery';

var Actions = FluxAction([
    'GetChamberList'
])

Actions.GetChamberList(){
    $.ajax({url: '/php/chamber_list.php', type: 'POST', dataType: 'json',
    success: response => {
      return ['chamberlist', response]
    }});
}
