import $ from 'jquery';
import React from 'react';
import ProfileHeading from './Profile/ProfileHeading';
import BusinessInformation from './Profile/BusinessInformation';
import ProfileActions from './Profile/ProfileActions';
import ProfileLogo from './Profile/ProfileLogo';
import SocialLinks from './Profile/SocialLinks';

class BusinessProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { business: {
      name: "Loading..."
    }};
    this.saveData = this.saveData.bind(this);
  }

  componentWillMount(){
    var businessId = this.props.match.params.businessId;

    // If we have a business ID, load that, otherwise it's our own profile
    var ajaxURL = "/php/get_Business.php";
    if (businessId) ajaxURL += "?id=" + businessId;

    $.ajax({ url: ajaxURL, success: this.saveData });
  }

  saveData(data) {
    var business = JSON.parse(data);
    this.setState({ business: business });
  }

  render(){
    var business = this.state.business;

    return(
      <div>
        <ProfileHeading text={business.name} messageURL={"/message"} />
        <BusinessInformation business={business} />
        <div>
          <ProfileLogo profileImage={""}/>
          <SocialLinks facebookURL={"http://facebook.com/blah"} twitterURL={""} linkedinURL={""}/>
        </div>
        <ProfileActions editDetails={"/editprofile"} />
      </div>
    );
  }
};

export default BusinessProfile;
