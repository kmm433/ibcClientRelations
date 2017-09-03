import React from 'react';
import Collapsible from 'react-collapsible';

var App = React.createClass({

  render: function() {
    return(
      <div>
        <Collapsible trigger="Question: A">
          <p>ANSWER HERE.</p>
          <p>SECONDARY INFO!</p>
        </Collapsible>
        <Collapsible trigger="Question: B">
          <p>ANSWER HERE.</p>
          <p>SECONDARY INFO!</p>
        </Collapsible>
        <Collapsible trigger="Question: C">
          <p>ANSWER HERE.</p>
          <p>SECONDARY INFO!</p>
        </Collapsible>
        <Collapsible trigger="Question: D">
          <p>ANSWER HERE.</p>
          <p>SECONDARY INFO!</p>
        </Collapsible>
        <Collapsible trigger="Question: E">
          <p>ANSWER HERE.</p>
          <p>SECONDARY INFO!</p>
        </Collapsible>
        <Collapsible trigger="Question: F">
          <p>ANSWER HERE.</p>
          <p>SECONDARY INFO!</p>
        </Collapsible>
      </div>
    );
  }
});

export default App;
