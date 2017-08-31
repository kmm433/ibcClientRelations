import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';

var optionsArray = []

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chamber: 'shit'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //
  componentWillReceiveProps(nextProps) {
    optionsArray=nextProps.chamber_list;
  }

  //when the user changes the selected option from the drop down menu update the state
  handleChange(event) {
    var temp = event.target.value;
    this.setState({
      chamber: temp
    });
  }

  /*On submit call the function in the parent component and give it the selected chamber*/
  handleSubmit(event) {
    var temp = this.state.chamber;
    this.props.callbackFromParent(temp);
    event.preventDefault();
  }

  render() {
    return (
      <div >
        <form>
          <label>
            Which Chamber would you like to join?
            <select value={this.state.value} onChange={this.handleChange}>
                <option key = "select" value="nothing">Select your Chamber</option>)
              {Object.keys(optionsArray).map((item,index) =>
                  <option key = {index} value={item}>{optionsArray[item]}</option>)}
            </select>
          </label>
          <button onClick={this.handleSubmit}>
          <NavLink activeClassName='active-route' to='/page'>Submit</NavLink>
        </button>
        </form>
      </div>

    );
  }
}

export default List;
