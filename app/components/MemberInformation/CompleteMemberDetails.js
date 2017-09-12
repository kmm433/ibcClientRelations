import React from 'react';
import Detail from './Detail.js'

class CompleteMemberDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: null
    };
    this.renderDetails = this.renderDetails.bind(this);
    this.updateDetail = this.updateDetail.bind(this);
  }

  // Update the state fo the details
  componentWillReceiveProps(nextProps) {
    const details = nextProps.details;
    var detailsArray = [];
    if (details) {
      for (var detail in details) {
        detailsArray.push([details[detail]['displayname'], details[detail]]);
      }
      this.setState({details: detailsArray});
    }
  }

  // Allows a detail to update the value of a detail
  updateDetail(event, targetDetail) {
    var details = this.state.details;
    details.forEach((detail) => {
      if (detail[0] === targetDetail)
        detail[1]['value'] = event.target.value;
    });
    this.setState({details: details});
  }

  // Maps each state element to a display component
  renderDetails() {
    const currentDetails = this.state.details;
    if (currentDetails) {
      // Map to display components
      var renderDetails = null;
      renderDetails = currentDetails.map((detail, i) => {
        return(
          <Detail
          key={i}
          displayname={detail[0]}
          details={detail[1]}
          editable={this.props.editable}
          updateDetail={this.updateDetail}
          />
        );
      });
      return (<div>{renderDetails}</div>);
    }
    else
      return null;
  }

  render() {
    return (
      <div className={this.props.class_name}>
        {this.renderDetails()}
      </div>

    );
  }
};

export default CompleteMemberDetails;
