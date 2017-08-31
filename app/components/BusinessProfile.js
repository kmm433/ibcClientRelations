import React from 'react';
import ProfileHeading from './Profile/ProfileHeading';
import BusinessInformation from './Profile/BusinessInformation';
import ProfileActions from './Profile/ProfileActions';
import ProfileLogo from './Profile/ProfileLogo';
import SocialLinks from './Profile/SocialLinks';

class BusinessProfile extends React.Component {
  render(){
    var url = "http://fetlife.com/";
    var editDetails = "http://google.com";
    var fbURL = "http://fb.com";
    var twtURL = "http://twitter.com";
    var liURL = "http://linkdin.com";
    var profileImg = "https://media3.giphy.com/media/Rt23MIHkCJwdy/200_s.gif";
    var business = {
      id: 185,
      name: "Kiama Florist",
      owner: "Mary Smith",
      phone:"0223844293472",
      address:"13 Fuckoff Lane",
      website:"http://mail.morrissey.com",
      chamber:"THE DUNGEON",
      description:"SOMEONE KILL ME PLEASE",
    }


    return(
      <div>
        <ProfileHeading text={business.name} messageURL={url} />
        <BusinessInformation business={business} />
        <div>
          <ProfileLogo profileImage={profileImg}/>
          <SocialLinks facebookURL={fbURL} twitterURL={twtURL} linkedinURL={liURL}/>
        </div>
        <ProfileActions editDetails={editDetails} />
      </div>
    );
  }
};

export default BusinessProfile;
