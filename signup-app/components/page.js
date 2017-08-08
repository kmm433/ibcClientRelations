import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Page extends React.Component {

  constructor(props) {
      super(props);
      console.log(props.listNameFromParent)
      this.state = {
          chamber: props.listNameFromParent
        };
    }

  render() {
    return (
      <div>
          <input type="text" name="title" value={this.state.chamber} />
      </div>
    );
  }
}
export default Page;
