import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var optionsArray = []

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: undefined};
    console.log('1 ',optionsArray);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    /*componentDidMount(){
      $.ajax({
        url: '/php/chamber_list.php',
        type:'GET',
        async: false,
        dataType: "json",
        success : function(response){
          optionsArray= response;
          this.setState({data: response});
        }.bind(this),
        error: function(xhr, status, err){
          console.log('error')
        }.bind(this)
      });
      console.log('2', this.state.data)

    }*/

    componentWillMount(){
      $.ajax({
        url: '/php/chamber_list.php',
        type:'GET',
        dataType: "json",
        async: false,
        success : function(response){
          optionsArray=response;

        }.bind(this),
        error: function(xhr, status, err){
          console.log('error')
        }.bind(this)
      });
      console.log('2', optionsArray)


    }



  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Which Chamber ' + this.state.value);
    event.preventDefault();
  }

  render() {
    console.log('3', optionsArray)
    return (
      <div>
        {console.log('testing', optionsArray)}
        <ul>
          {optionsArray.map((item,index) =>
              <li key={index}>{item}</li>)}
        </ul>
      </div>

    );
  }
}

export default List;
