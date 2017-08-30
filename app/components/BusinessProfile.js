import React from 'react';
import ProfileHeading from './Profile/ProfileHeading';
import BusinessInformation from './Profile/BusinessInformation';
import ProfileActions from './Profile/ProfileActions';
import ProfileLogo from './Profile/ProfileLogo';
import SocialLinks from './Profile/SocialLinks';

class BusinessProfile extends React.Component {
  render(){
    var url = "http://fetlife.com/";
    var business = {
      id: 185,
      name: "Kiama Florist",
      owner: "Mary Smith",
      phone:"0223844293472",
      address:".12 Fuckoff Lane",
      website:"http://mail.morrissey.com",
      chamber:"THE DUNGEON",
      description:"SOMEONE KILL ME PLEASE",
    }

    return(
      <div>
        <ProfileHeading text={business.name} messageURL={url} />
        <BusinessInformation business={business} />
        <div>
          <ProfileLogo />
          <SocialLinks />
        </div>
        <ProfileActions />
      </div>
    );
  }
};

export default BusinessProfile;
