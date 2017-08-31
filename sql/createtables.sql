CREATE TABLE USER(
email varchar(255) NOT NULL,
password char(72) NOT NULL,
firstname varchar(35), 
lastname varchar(35), 
type tinyint(1) NOT NULL,
businessID int(11) ,  
chamberID int(11),
date_joined date,
  PRIMARY KEY(email)
);

CREATE TABLE BUSINESS(
businessID int(11) NOT NULL AUTO_INCREMENT,
Expiry date NOT NULL, /**/
firstname varchar(35) NOT NULL, 
lastname varchar(35) NOT NULL,
Established date NOT NULL,
chamberID int(11) NOT NULL,
location int(11) NOT NULL,
postal int(11) NOT NULL,
ABN int(11),  
  PRIMARY KEY(businessID)
);

CREATE TABLE CHAMBER(
chamberID int(11) NOT NULL AUTO_INCREMENT,
location int(11) NOT NULL,
postal int(11) NOT NULL,
Established date NOT NULL,
ABN int(11), 
chamber int(11) unsigned,
  PRIMARY KEY(chamberID)
);

CREATE TABLE ADDRESS(
addressID int(11) NOT NULL AUTO_INCREMENT,
line1 varchar(255) NOT NULL,
line2 varchar(255),
street varchar(255),
city varchar(50) NOT NULL,
postcode int(4) unsigned NOT NULL,
state varchar(20) NOT NULL,
country varchar(50),
  PRIMARY KEY(addressID)
);

CREATE TABLE WEBSITE(
websiteID int(11) NOT NULL AUTO_INCREMENT,
businessID int(11) NOT NULL,
url varchar(255) NOT NULL,
type varchar(50),
  PRIMARY KEY(websiteID)
);

CREATE TABLE PAYMENT(
paymentID int(11) NOT NULL AUTO_INCREMENT,
chamberID int(11) NOT NULL,
businessID int(11) NOT NULL,
amount decimal(13,4) NOT NULL,
paymentdate datetime NOT NULL,
  PRIMARY KEY(paymentID)
);

CREATE TABLE EVENT(
eventID int(11) NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
eventdate date NOT NULL,
start time NOT NULL,
end time NOT NULL,
shortdesc varchar(255) NOT NULL,
longdesc varchar(1000),
ticketURL varchar(2083),
  PRIMARY KEY(eventID)
);

CREATE TABLE MESSAGE(
messageID int(11) NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
priority tinyint(1) NOT NULL,
shortdesc varchar(255) NOT NULL,
fullmessage varchar(1000),
  PRIMARY KEY(messageID)
);

CREATE TABLE GROUP(
groupID int(11) NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
  PRIMARY KEY(groupID)
);

CREATE TABLE GROUPMEMBERS(
groupID int(11) NOT NULL,
email varchar(255) NOT NULL,
  PRIMARY KEY(groupID)
);

CREATE TABLE SURVEY(
surveyID int(11) NOT NULL AUTO_INCREMENT,
createdate date NOT NULL,
  PRIMARY KEY(surveyID)
);

CREATE TABLE SURVEYQUESTION(
surveyID int(11) NOT NULL,
questionNo int(11) NOT NULL,
question varchar(255) NOT NULL,
  PRIMARY KEY(surveyID, questionNo)
);

CREATE TABLE SURVEYANSWER(
surveyID int(11) NOT NULL,
questionNo int(11) NOT NULL,
answer varchar(255) NOT NULL,
  PRIMARY KEY(surveyID, questionNo)
);
