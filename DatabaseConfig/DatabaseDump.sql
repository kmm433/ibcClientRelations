-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: ibc-crm.cefmu4oqb0dd.ap-southeast-2.rds.amazonaws.com    Database: ibc_crm
-- ------------------------------------------------------
-- Server version	5.6.27-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ADDRESS`
--

DROP TABLE IF EXISTS `ADDRESS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ADDRESS` (
  `addressID` int(11) NOT NULL AUTO_INCREMENT,
  `line1` varchar(255) NOT NULL,
  `line2` varchar(255) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `postcode` int(4) unsigned NOT NULL,
  `state` varchar(20) NOT NULL,
  `country` varchar(50) DEFAULT 'Australia',
  `chamberId` int(11) DEFAULT NULL,
  PRIMARY KEY (`addressID`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `APPROVAL`
--

DROP TABLE IF EXISTS `APPROVAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `APPROVAL` (
  `chamberID` int(11) NOT NULL,
  `approval` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`chamberID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS`
--

DROP TABLE IF EXISTS `BUSINESS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS` (
  `businessID` int(11) NOT NULL AUTO_INCREMENT,
  `established` date DEFAULT NULL,
  `chamberID` int(11) NOT NULL,
  `addressid` int(11) DEFAULT NULL,
  `postal` int(11) DEFAULT NULL,
  `ABN` bigint(11) DEFAULT NULL,
  `businessname` varchar(45) NOT NULL,
  `businessphone` int(11) NOT NULL,
  `mobile` int(11) DEFAULT NULL,
  `anziccode` int(11) DEFAULT NULL,
  `numofemployees` int(11) DEFAULT NULL,
  `website` varchar(2083) DEFAULT NULL,
  PRIMARY KEY (`businessID`)
) ENGINE=InnoDB AUTO_INCREMENT=1070 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_222`
--

DROP TABLE IF EXISTS `BUSINESS_222`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_222` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_666`
--

DROP TABLE IF EXISTS `BUSINESS_666`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_666` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_669`
--

DROP TABLE IF EXISTS `BUSINESS_669`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_669` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_670`
--

DROP TABLE IF EXISTS `BUSINESS_670`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_670` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_671`
--

DROP TABLE IF EXISTS `BUSINESS_671`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_671` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_672`
--

DROP TABLE IF EXISTS `BUSINESS_672`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_672` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_673`
--

DROP TABLE IF EXISTS `BUSINESS_673`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_673` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_674`
--

DROP TABLE IF EXISTS `BUSINESS_674`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_674` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_675`
--

DROP TABLE IF EXISTS `BUSINESS_675`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_675` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_727`
--

DROP TABLE IF EXISTS `BUSINESS_727`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_727` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_728`
--

DROP TABLE IF EXISTS `BUSINESS_728`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_728` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_729`
--

DROP TABLE IF EXISTS `BUSINESS_729`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_729` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_730`
--

DROP TABLE IF EXISTS `BUSINESS_730`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_730` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BUSINESS_732`
--

DROP TABLE IF EXISTS `BUSINESS_732`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BUSINESS_732` (
  `DataID` int(11) NOT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `BUSINESSID` varchar(45) DEFAULT NULL,
  `answerID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CALLBACK_URIS`
--

DROP TABLE IF EXISTS `CALLBACK_URIS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CALLBACK_URIS` (
  `callback` varchar(255) NOT NULL DEFAULT '',
  `domain` varchar(255) DEFAULT NULL,
  `uri` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`callback`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CHAMBER`
--

DROP TABLE IF EXISTS `CHAMBER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CHAMBER` (
  `chamberID` int(11) NOT NULL AUTO_INCREMENT,
  `location` int(11) DEFAULT NULL,
  `postal` int(11) DEFAULT NULL,
  `established` date DEFAULT NULL,
  `ABN` bigint(11) DEFAULT NULL,
  `parent_id` int(11) unsigned DEFAULT NULL,
  `name` varchar(35) NOT NULL,
  `businessphone` int(11) DEFAULT NULL,
  `mobilephone` int(11) DEFAULT NULL,
  `anziccode` int(11) DEFAULT NULL,
  `website` varchar(2083) DEFAULT NULL,
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `chamberemail` varchar(255) DEFAULT NULL,
  `live` varchar(45) NOT NULL DEFAULT '0',
  PRIMARY KEY (`chamberID`)
) ENGINE=InnoDB AUTO_INCREMENT=734 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CHAMBERPAYPAL`
--

DROP TABLE IF EXISTS `CHAMBERPAYPAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CHAMBERPAYPAL` (
  `chamberid` int(11) NOT NULL,
  `paypal` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`chamberid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CHAMBER_API_KEYS`
--

DROP TABLE IF EXISTS `CHAMBER_API_KEYS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CHAMBER_API_KEYS` (
  `chamberID` int(11) NOT NULL,
  `mailchimp` varchar(255) DEFAULT NULL,
  `xero_key` varchar(255) DEFAULT NULL,
  `xero_secret` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`chamberID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CHAMBER_GROUPS_666`
--

DROP TABLE IF EXISTS `CHAMBER_GROUPS_666`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CHAMBER_GROUPS_666` (
  `groupID` int(11) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(255) NOT NULL,
  PRIMARY KEY (`groupID`),
  UNIQUE KEY `groupName` (`groupName`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GROUPMEMBERS`
--

DROP TABLE IF EXISTS `GROUPMEMBERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GROUPMEMBERS` (
  `groupID` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groupID_exists` (`groupID`),
  CONSTRAINT `groupID_exists` FOREIGN KEY (`groupID`) REFERENCES `GROUPS` (`groupID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `GROUPS`
--

DROP TABLE IF EXISTS `GROUPS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GROUPS` (
  `groupID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `chamberID` int(11) NOT NULL,
  `mailchimp_list_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`groupID`),
  UNIQUE KEY `unique_names_per_chamber` (`name`,`chamberID`),
  UNIQUE KEY `unique_list_id` (`mailchimp_list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LOGO`
--

DROP TABLE IF EXISTS `LOGO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LOGO` (
  `name` varchar(45) DEFAULT NULL,
  `logo` blob,
  `chamberID` varchar(45) NOT NULL,
  PRIMARY KEY (`chamberID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MANDATORYFIELD`
--

DROP TABLE IF EXISTS `MANDATORYFIELD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MANDATORYFIELD` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) NOT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` tinyint(4) NOT NULL,
  `tablename` varchar(45) NOT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`DataID`,`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MEMBERSHIPS`
--

DROP TABLE IF EXISTS `MEMBERSHIPS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MEMBERSHIPS` (
  `chamberID` int(11) NOT NULL,
  `membershipID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `info` varchar(100) DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL,
  `disabled` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`membershipID`),
  UNIQUE KEY `unique_index` (`chamberID`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MYEVENT`
--

DROP TABLE IF EXISTS `MYEVENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MYEVENT` (
  `EventID` int(11) NOT NULL AUTO_INCREMENT,
  `EventTitle` varchar(255) NOT NULL,
  `Event` varchar(5000) DEFAULT NULL,
  `EventDate` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `Location` varchar(255) NOT NULL,
  `EventURL` varchar(255) DEFAULT NULL,
  `DatePosted` datetime NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MYEVENTCANTGO`
--

DROP TABLE IF EXISTS `MYEVENTCANTGO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MYEVENTCANTGO` (
  `CantgoID` int(11) NOT NULL AUTO_INCREMENT,
  `EventID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`CantgoID`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MYEVENTGOING`
--

DROP TABLE IF EXISTS `MYEVENTGOING`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MYEVENTGOING` (
  `GoingID` int(11) NOT NULL AUTO_INCREMENT,
  `EventID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`GoingID`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MYEVENTHIDDEN`
--

DROP TABLE IF EXISTS `MYEVENTHIDDEN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MYEVENTHIDDEN` (
  `HiddenID` int(11) NOT NULL AUTO_INCREMENT,
  `EventID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`HiddenID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MYEVENTLOOKUP`
--

DROP TABLE IF EXISTS `MYEVENTLOOKUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MYEVENTLOOKUP` (
  `LookupID` int(11) NOT NULL AUTO_INCREMENT,
  `EventID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ChamberID` int(11) DEFAULT NULL,
  `BusinessID` int(11) DEFAULT NULL,
  `GroupID` int(11) DEFAULT NULL,
  `RelatedChamber` int(11) DEFAULT NULL,
  PRIMARY KEY (`LookupID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MYEVENTLOOKUPtemp`
--

DROP TABLE IF EXISTS `MYEVENTLOOKUPtemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MYEVENTLOOKUPtemp` (
  `LookupID` int(11) NOT NULL AUTO_INCREMENT,
  `EventID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ChamberID` int(11) DEFAULT NULL,
  `BusinessID` int(11) DEFAULT NULL,
  `GroupID` int(11) DEFAULT NULL,
  PRIMARY KEY (`LookupID`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MYEVENTtemp`
--

DROP TABLE IF EXISTS `MYEVENTtemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MYEVENTtemp` (
  `EventID` int(11) NOT NULL,
  `EventTitle` varchar(255) NOT NULL,
  `Event` varchar(5000) DEFAULT NULL,
  `EventDate` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `Location` varchar(255) NOT NULL,
  `EventURL` varchar(255) DEFAULT NULL,
  `DatePosted` datetime NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`EventID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `NOTES`
--

DROP TABLE IF EXISTS `NOTES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NOTES` (
  `noteID` int(11) NOT NULL AUTO_INCREMENT,
  `about` varchar(255) NOT NULL,
  `leftBy` varchar(255) NOT NULL,
  `ts` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `note` varchar(255) NOT NULL,
  PRIMARY KEY (`noteID`)
) ENGINE=InnoDB AUTO_INCREMENT=296 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `NOTIFICATION`
--

DROP TABLE IF EXISTS `NOTIFICATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NOTIFICATION` (
  `NotificationID` int(11) NOT NULL AUTO_INCREMENT,
  `NoticeTitle` varchar(200) NOT NULL,
  `Notice` varchar(4000) NOT NULL,
  `DatePosted` datetime NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`NotificationID`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=latin1 COMMENT='Stores the notifications that can be posted by a chamber to it’s, order by date';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `NOTIFICATIONLOOKUP`
--

DROP TABLE IF EXISTS `NOTIFICATIONLOOKUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NOTIFICATIONLOOKUP` (
  `LookupID` int(11) NOT NULL AUTO_INCREMENT,
  `NotificationID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ChamberID` int(11) DEFAULT NULL,
  `BusinessID` int(11) DEFAULT NULL,
  `GroupID` int(11) DEFAULT NULL,
  `RelatedChamber` int(11) DEFAULT NULL,
  PRIMARY KEY (`LookupID`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `NOTIFICATIONLOOKUPtemp`
--

DROP TABLE IF EXISTS `NOTIFICATIONLOOKUPtemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NOTIFICATIONLOOKUPtemp` (
  `LookupID` int(11) NOT NULL AUTO_INCREMENT,
  `NotificationID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ChamberID` int(11) DEFAULT NULL,
  `BusinessID` int(11) DEFAULT NULL,
  `GroupID` int(11) DEFAULT NULL,
  PRIMARY KEY (`LookupID`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `NOTIFICATIONtemp`
--

DROP TABLE IF EXISTS `NOTIFICATIONtemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NOTIFICATIONtemp` (
  `NotificationID` int(11) NOT NULL AUTO_INCREMENT,
  `NoticeTitle` varchar(200) NOT NULL,
  `Notice` varchar(4000) NOT NULL,
  `DatePosted` datetime NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`NotificationID`)
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_2`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_2` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_222`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_222`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_222` (
  `DataID` int(11) NOT NULL,
  `displayname` varchar(45) DEFAULT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) DEFAULT NULL,
  `mandatory` varchar(5) DEFAULT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) DEFAULT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_666`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_666`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_666` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_669`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_669`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_669` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_670`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_670`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_670` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_671`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_671`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_671` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_672`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_672`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_672` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_673`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_673`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_673` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_674`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_674`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_674` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_675`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_675`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_675` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_727`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_727`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_727` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_728`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_728`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_728` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_729`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_729`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_729` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_730`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_730`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_730` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `OPTIONALFIELDS_732`
--

DROP TABLE IF EXISTS `OPTIONALFIELDS_732`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OPTIONALFIELDS_732` (
  `DataID` int(11) NOT NULL AUTO_INCREMENT,
  `displayname` varchar(45) NOT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `inputtype` varchar(45) NOT NULL,
  `mandatory` varchar(5) NOT NULL,
  `tablename` varchar(45) DEFAULT NULL,
  `ordering` int(11) NOT NULL,
  `minimum` int(11) DEFAULT NULL,
  `maximum` int(11) DEFAULT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DataID`),
  UNIQUE KEY `displayname_UNIQUE` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PAYMENT`
--

DROP TABLE IF EXISTS `PAYMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PAYMENT` (
  `userID` int(11) NOT NULL,
  `paymentID` int(11) NOT NULL AUTO_INCREMENT,
  `membershipID` varchar(45) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `paymentdate` varchar(45) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`paymentID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PAYMENTTYPES`
--

DROP TABLE IF EXISTS `PAYMENTTYPES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PAYMENTTYPES` (
  `chamberid` int(11) NOT NULL,
  `type` enum('Prorata','Annual') NOT NULL,
  `expiry_date` date DEFAULT NULL,
  PRIMARY KEY (`chamberid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RESET_TOKENS`
--

DROP TABLE IF EXISTS `RESET_TOKENS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RESET_TOKENS` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `token` bigint(20) DEFAULT NULL,
  `expiry` datetime DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  UNIQUE KEY `unique_token` (`token`),
  KEY `fk_UserID` (`UserID`),
  CONSTRAINT `fk_UserID` FOREIGN KEY (`UserID`) REFERENCES `USER` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `STAT_NEWMEMBER`
--

DROP TABLE IF EXISTS `STAT_NEWMEMBER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STAT_NEWMEMBER` (
  `NewMemberID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `ChamberID` int(11) NOT NULL,
  `MemberDate` datetime NOT NULL,
  PRIMARY KEY (`NewMemberID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `STAT_RENEW`
--

DROP TABLE IF EXISTS `STAT_RENEW`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STAT_RENEW` (
  `RenewID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `ChamberID` int(11) NOT NULL,
  `RenewDate` datetime NOT NULL,
  PRIMARY KEY (`RenewID`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SURVEY`
--

DROP TABLE IF EXISTS `SURVEY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SURVEY` (
  `SurveyID` int(11) NOT NULL AUTO_INCREMENT,
  `SurveyTitle` varchar(255) DEFAULT NULL,
  `DatePosted` datetime NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`SurveyID`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SURVEYANSWER`
--

DROP TABLE IF EXISTS `SURVEYANSWER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SURVEYANSWER` (
  `AnswerID` int(11) NOT NULL AUTO_INCREMENT,
  `SurveyID` int(11) NOT NULL,
  `questionNo` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`AnswerID`)
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SURVEYLOOKUP`
--

DROP TABLE IF EXISTS `SURVEYLOOKUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SURVEYLOOKUP` (
  `LookupID` int(11) NOT NULL AUTO_INCREMENT,
  `SurveyID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ChamberID` int(11) DEFAULT NULL,
  `BusinessID` int(11) DEFAULT NULL,
  `GroupID` int(11) DEFAULT NULL,
  `RelatedChamber` int(11) DEFAULT NULL,
  PRIMARY KEY (`LookupID`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SURVEYLOOKUPtemp`
--

DROP TABLE IF EXISTS `SURVEYLOOKUPtemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SURVEYLOOKUPtemp` (
  `LookupID` int(11) NOT NULL AUTO_INCREMENT,
  `SurveyID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ChamberID` int(11) DEFAULT NULL,
  `BusinessID` int(11) DEFAULT NULL,
  `GroupID` int(11) DEFAULT NULL,
  PRIMARY KEY (`LookupID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SURVEYQUESTION`
--

DROP TABLE IF EXISTS `SURVEYQUESTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SURVEYQUESTION` (
  `SurveyID` int(11) NOT NULL COMMENT 'answerType:\n0 = Radio Buttons\n1 = Text box',
  `questionNo` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answerType` int(11) NOT NULL,
  PRIMARY KEY (`SurveyID`,`questionNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SURVEYRESULTS`
--

DROP TABLE IF EXISTS `SURVEYRESULTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SURVEYRESULTS` (
  `ResultID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) NOT NULL,
  `SurveyID` int(11) NOT NULL,
  `questionNo` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `AnswerID` int(11) NOT NULL,
  `answer` varchar(1000) NOT NULL,
  PRIMARY KEY (`ResultID`)
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SURVEYtemp`
--

DROP TABLE IF EXISTS `SURVEYtemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SURVEYtemp` (
  `SurveyID` int(11) NOT NULL AUTO_INCREMENT,
  `SurveyTitle` varchar(255) DEFAULT NULL,
  `DatePosted` datetime NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`SurveyID`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '2',
  `businessID` int(11) DEFAULT NULL,
  `chamberID` int(11) DEFAULT NULL,
  `date_joined` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `expiry` timestamp NULL DEFAULT NULL,
  `jobtitle` varchar(45) DEFAULT NULL,
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_businessID` (`businessID`),
  CONSTRAINT `fk_businessID` FOREIGN KEY (`businessID`) REFERENCES `BUSINESS` (`businessID`)
) ENGINE=InnoDB AUTO_INCREMENT=123670 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dropme`
--

DROP TABLE IF EXISTS `dropme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dropme` (
  `iddropme` int(11) NOT NULL,
  PRIMARY KEY (`iddropme`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'ibc_crm'
--
/*!50003 DROP FUNCTION IF EXISTS `insertEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` FUNCTION `insertEvent`(title varchar(255), content varchar(5000), sDate DATETIME, eDate DATETIME, location varchar(255), url varchar(255), userid int) RETURNS int(11)
BEGIN

/*
	Author: Hayden Lummis
    Date: 09/10/2017
    Purpose: To add a new event
    Use: 

*/

INSERT INTO MYEVENT (`EventTitle`, `Event`, `EventDate`, `endTime`, `Location`, `EventURL`, `DatePosted`,`UserID`) VALUES (title, content, sDate, eDate, location, url, now(),userid);

RETURN LAST_INSERT_ID();

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `insertNotification` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` FUNCTION `insertNotification`(title varchar(200), content varchar(4000), userid int) RETURNS int(11)
BEGIN
/*
	Author: Hayden Lummis
    Date: 04/10/2017
    Purpose: To add a new notification
    Use: 

*/

INSERT INTO NOTIFICATION (`NoticeTitle`, `Notice`, `DatePosted`, `UserID`) VALUES (title, content, NOW(), userid);

RETURN LAST_INSERT_ID();

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `insertSurvey` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` FUNCTION `insertSurvey`(title varchar(255), userid int) RETURNS int(11)
BEGIN

/*
	Author: Hayden Lummis
    Date: 10/10/2017
    Purpose: To add a new survey
    Use: sadasdasd

*/

INSERT INTO SURVEY (`SurveyTitle`, `DatePosted`, `UserID`) VALUES (title, NOW(), userid);

RETURN LAST_INSERT_ID();

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `disableChamber` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `disableChamber`(updatechamberID int)
BEGIN

UPDATE CHAMBER SET archived = 1 WHERE chamberID = updatechamberID;
UPDATE USER SET archived = 1 WHERE chamberID = updatechamberID;

SELECT @PID:=parent_id from CHAMBER where chamberID = updatechamberID;

	IF @PID IS NOT NULL THEN
		UPDATE CHAMBER SET parent_id = NULL WHERE chamberID = @PID;
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPconfirmUserEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPconfirmUserEvent`(thisevent int, user int)
BEGIN
/*
	Author: Hayden Lummis
    Date: 15/10/2017
    Purpose: This is used when a user is given a link to a event, it pulls up the title for the user whilst
    confirming that the user has permissions to see it
    
*/

select DISTINCT e.EventID, e.EventTitle, e.Event, e.EventDate, e.endTime, e.EventURL, e.DatePosted, e.Location from MYEVENTLOOKUP L
    left join MYEVENT e on e.EventID = L.EventID
	left join USER u on u.UserID = user
    where user not in (
			select UserID from MYEVENTHIDDEN where EventID = L.EventID
	) 
	AND 
	(user  = L.UserID or
	u.ChamberID = L.ChamberID or
	u.businessID = L.BusinessID or
	L.GroupID in (SELECT groupID FROM GROUPMEMBERS WHERE USERID = user))
    AND
    e.EventID = thisevent;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPconfirmUserSurvey` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPconfirmUserSurvey`(survey int, user int)
BEGIN
/*
	Author: Hayden Lummis
    Date: 15/10/2017
    Purpose: This is used when a user is given a link to a survey, it pulls up the title for the user whilst
    confirming that the user has permissions to see it
    
*/
	select DISTINCT s.SurveyID, s.SurveyTitle, s.DatePosted from SURVEYLOOKUP L
    left join SURVEY s on s.SurveyID = L.SurveyID
    left join USER u on u.UserID = user
    where user not in (
			select UserID from SURVEYRESULTS where SurveyID = L.SurveyID
	) 
	AND
	(user = L.UserID or
	u.ChamberID = L.ChamberID or
	u.businessID = L.BusinessID or
	L.GroupID in (SELECT groupID FROM GROUPMEMBERS WHERE USERID = user))
    AND
    s.SurveyID = survey;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPdeleteAllNotices` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPdeleteAllNotices`()
BEGIN

/* For Development Uses Only */

DELETE FROM NOTIFICATION;
DELETE FROM NOTIFICATIONLOOKUP;
DELETE FROM NOTIFICATIONtemp;
DELETE FROM NOTIFICATIONLOOKUPtemp;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetCompleteMemberDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetCompleteMemberDetails`(providedEmail varchar(255))
BEGIN
	SELECT USER.firstname, USER.lastname, USER.email, USER.jobtitle, 
		USER.type, USER.date_joined, USER.expiry, BUSINESS.businessname, 
        ADDRESS.line1, ADDRESS.line2, ADDRESS.city, ADDRESS.postcode, 
        ADDRESS.state, ADDRESS.country, 
		BUSINESS.businessphone, BUSINESS.phone, BUSINESS.mobile, 
		BUSINESS.anziccode, BUSINESS.numofemployees, BUSINESS.established, 
        BUSINESS.ABN 
		FROM USER 
			LEFT JOIN BUSINESS ON USER.businessID = BUSINESS.businessID
            LEFT JOIN ADDRESS ON BUSINESS.addressID = ADDRESS.addressID
        WHERE USER.email=providedEmail;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPGetDetail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPGetDetail`(detail varchar(255), specifiedTable varchar(255))
BEGIN
	SELECT detail FROM specifiedTable;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetEventCount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetEventCount`(thiseventID int)
BEGIN
/*
	Author: Hayden Lummis
    Date: 11/10/2017
    Purpose: To get a count of every member an event was offered to

*/

SELECT COUNT(*)
FROM
(
	SELECT u.UserID FROM USER u
	JOIN MYEVENTLOOKUP L ON L.BusinessID = u.businessID or L.ChamberID = u.chamberID
	WHERE L.EventID = thiseventID
	UNION
	SELECT g.UserID FROM GROUPMEMBERS g
	JOIN MYEVENTLOOKUP L ON L.GroupID = g.groupID
	WHERE L.EventID = thiseventID
) x;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetEvents` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetEvents`(userid int, chamberid int, businessid int)
BEGIN
/*
	Author: Hayden Lummis
    Date: 16/08/2017
    Purpose: To retieve all events corresponding to given user / chamber / business / group
    Use: CALL SPgetEvents(-1,-1,-1,-1); , replace -1 with given values
    
    TODO: Add support for groups

*/

	select DISTINCT e.EventID, e.EventTitle, e.Event, e.EventDate, e.endTime, e.EventURL, e.DatePosted, e.Location
    from MYEVENTLOOKUP L
    left join MYEVENT e on e.EventID = L.EventID
    where
		userid  = L.UserID or
        chamberid = L.ChamberID or
        businessid = L.BusinessID
	 order by e.DatePosted desc;
	

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetEventsNoticeBoard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetEventsNoticeBoard`(userid int, chamberid int, businessid int)
BEGIN
/*
	Author: Hayden Lummis
    Date: 03/09/2017
    Purpose: To retieve all events corresponding to given user / chamber / business / group without the hidden ones 
    for the noticeboard, different to other SPgetEvents that gets all events regardless if marked as hidden
    Use: CALL SPgetEventsNoticeBoard(-1,-1,-1,-1); , replace -1 with given values

*/

	select DISTINCT e.EventID, e.EventTitle, e.Event, e.EventDate, e.endTime, e.EventURL, e.DatePosted, e.Location
    from MYEVENTLOOKUP L
    left join MYEVENT e on e.EventID = L.EventID
    where userid not in (
			select UserID from MYEVENTHIDDEN where EventID = L.EventID
        ) 
        AND 
		(userid  = L.UserID or
        chamberid = L.ChamberID or
        businessid = L.BusinessID or
        L.GroupID in (SELECT groupID FROM GROUPMEMBERS WHERE USERID = userid))
		AND 
		e.DatePosted > DATE_SUB(now(), INTERVAL 6 MONTH);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetEventsNoticeBoardTEMP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetEventsNoticeBoardTEMP`(userid int, chamberid int, businessid int)
BEGIN
/*
	Author: Hayden Lummis
    Date: 09/10/2017
    Purpose: To retieve all events offered by a parent chamber to a child chamber ,corresponding to given
    user / chamber / business / group without the hidden ones  for the noticeboard, different to other SPgetEvents
    that gets all events regardless if marked as hidden
    Use: CALL SPgetEventsNoticeBoard(-1,-1,-1,-1); , replace -1 with given values

*/

	select DISTINCT e.EventID, e.EventTitle, e.Event, e.EventDate, e.endTime, e.EventURL, e.DatePosted, e.Location
    from MYEVENTLOOKUPtemp L
    left join MYEVENTtemp e on e.EventID = L.EventID
    where 
		(userid  = L.UserID or
        chamberid = L.ChamberID or
        businessid = L.BusinessID);
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetNotifications` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetNotifications`(userid int, chamberid int, businessid int)
BEGIN
/*
	Author: Hayden Lummis
    Date: 16/08/2017
    Purpose:  - To retieve all notifications corresponding to given user / chamber / business / group
					- Limit the results to the last 6 months
    Use: CALL SPgetNotifications(-1,-1,-1); , replace -1 with given values
    
    TODO: Add support for users in groups

*/

	select DISTINCT n.NotificationID, n.NoticeTitle, n.Notice, n.DatePosted
    from NOTIFICATIONLOOKUP L
    left join NOTIFICATION n on n.NotificationID = L.NotificationID
    where
		userid  = L.UserID or
        chamberid = L.ChamberID or
        businessid = L.BusinessID
        or L.GroupID in (SELECT groupID FROM GROUPMEMBERS WHERE USERID = userid)
	and 
		n.DatePosted > DATE_SUB(now(), INTERVAL 6 MONTH);
        
	

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetNotificationsTEMP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetNotificationsTEMP`(userid int, chamberid int, businessid int)
BEGIN
/*
	Author: Hayden Lummis
    Date: 07/10/2017
    Purpose: To retieve all notifications corresponding to given user / chamber / business / group passed down from a parent chamber
    Use: CALL SPgetNotificationsTEMP(-1,-1,-1); , replace -1 with given values

*/

	select DISTINCT n.NotificationID, n.NoticeTitle, n.Notice, n.DatePosted
    from NOTIFICATIONLOOKUPtemp L
    left join NOTIFICATIONtemp n on n.NotificationID = L.NotificationID
    where
		userid  = L.UserID or
        chamberid = L.ChamberID or
        businessid = L.BusinessID;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetSurvey` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetSurvey`(userid int, chamberid int, businessid int)
BEGIN
/*
	Author: Hayden Lummis
    Date: 16/08/2017
    Purpose: To retieve all survey ID's corresponding to given user / chamber / business / group
    Use: CALL SPgetSurvey(-1,-1,-1,-1); , replace -1 with given values
    
*/
	select DISTINCT s.SurveyID, s.SurveyTitle, s.DatePosted
    from SURVEYLOOKUP L
    left join SURVEY s on s.SurveyID = L.SurveyID
    where userid not in (
			select UserID from SURVEYRESULTS where SurveyID = L.SurveyID
        ) 
        AND
		(userid  = L.UserID or
        chamberid = L.ChamberID or
        businessid = L.BusinessID or
        L.GroupID in (SELECT groupID FROM GROUPMEMBERS WHERE USERID = userid))
		AND 
		s.DatePosted > DATE_SUB(now(), INTERVAL 6 MONTH);
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetSurvey2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetSurvey2`(user int, chamber int, business int)
BEGIN

select DISTINCT s.SurveyID, s.SurveyTitle, s.DatePosted
    from SURVEYLOOKUP L
    left join SURVEY s on s.SurveyID = L.SurveyID
    where user not in (
			select UserID from SURVEYRESULTS where SurveyID = L.SurveyID
        ) 
        AND
		(user  = L.UserID or
        chamber = L.ChamberID or
        business = L.BusinessID or
        L.GroupID in (SELECT groupID FROM GROUPMEMBERS WHERE USERID = user))
		AND 
		s.DatePosted > DATE_SUB(now(), INTERVAL 6 MONTH);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetSurveyAnswers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetSurveyAnswers`(surveyid int)
BEGIN

/*
	Author: Hayden Lummis
    Date: 16/08/2017
    Purpose: To retieve answers associated with a question
    Use: CALL SPgetSurveyAnswers(QuestionNumber); 

*/

	select s.SurveyID, s.questionNo, s.answer, s.AnswerID
    from SURVEYANSWER s
    where
		s.SurveyID = surveyid; 


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetSurveyQuestion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetSurveyQuestion`(surveyid int)
BEGIN

/*
	Author: Hayden Lummis
    Date: 16/08/2017
    Purpose: To retieve questions associated with a survey
    Use: CALL SPgetSurveyQuestion(SurveyID); 

*/

	select *
    from SURVEYQUESTION
    where
		SurveyID = surveyid;
		

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPgetSurveyTEMP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPgetSurveyTEMP`(userid int, chamberid int, businessid int)
BEGIN

/*
	Author: Hayden Lummis
    Date: 10/10/2017
    Purpose: To retieve all survey ID's corresponding to given user / chamber / business / group passed down from a parent chamber
    to a child chamber
    Use: CALL SPgetSurveyTEMP(-1,-1,-1,-1); , replace -1 with given values
    
    TODO: Add support for groups

*/

	select DISTINCT s.SurveyID, s.SurveyTitle, s.DatePosted
    from SURVEYLOOKUPtemp L
    left join SURVEYtemp s on s.SurveyID = L.SurveyID
    where
		userid  = L.UserID or
        chamberid = L.ChamberID or
        businessid = L.BusinessID;
	

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPinsertNotification` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPinsertNotification`(title varchar(200), content varchar(4000), userid int, chamber int, business int)
BEGIN

/*
	Author: Hayden Lummis
    Date: 17/09/2017
    Purpose: To create a new notification
    Use: 

*/
INSERT INTO NOTIFICATION (`NoticeTitle`, `Notice`, `DatePosted`, `UserID`) VALUES (title, content, NOW(), userid);


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPinsertSurveyAnswers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPinsertSurveyAnswers`(userid int, surveyid int, questionno int, question varchar(255), answerid int,  answer varchar(255) )
BEGIN

/*
	Author: Hayden Lummis
    Date: 27/08/2017
    Purpose: To store users survey results
    Use: CALL SPinsertSurveyAnswers(surveyid,questionno,question,answerid,answer);

*/

INSERT INTO SURVEYRESULTS ( `SurveyID`, `UserID`, `questionNo`, `question`, `AnswerID`, `answer`) VALUES (surveyid, userid, questionno, question, answerid, answer);


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPrejectEventTmp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPrejectEventTmp`(thiseventID int, thischamber int)
BEGIN

/*
	Author: Hayden Lummis
    Date: 9/10/2017
    Purpose: To reject an event offered by a parent chamber to its child chambers
    If a user is rejecting the last tmp lookup to a event, delete the tmp event as well
    Use: CALL SPrejectEventTmp(EventID, ChamberID)

*/


SET @count = (SELECT COUNT(*) FROM MYEVENTLOOKUPtemp WHERE EventID = thiseventID);
IF @count = 1 then
	DELETE FROM `MYEVENTLOOKUPtemp` WHERE `EventID` = thiseventID AND `ChamberID` = thischamber;
    DELETE FROM `MYEVENTtemp` WHERE `EventID` = thiseventID;
ELSE
	DELETE FROM `MYEVENTLOOKUPtemp` WHERE `EventID` = thiseventID AND `ChamberID` = thischamber;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPrejectNotificationTmp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPrejectNotificationTmp`(thisnotifID int, thischamber int)
BEGIN

/*
	Author: Hayden Lummis
    Date: 8/10/2017
    Purpose: To reject a notification offered by a parent chamber to its child chambers
    If a user is rejecting the last tmp lookup to a notification, delete the tmp notification as well
    Use: CALL SPrejectNotificationTmp(NotificationID, ChamberID)

*/


SET @count = (SELECT COUNT(*) FROM NOTIFICATIONLOOKUPtemp WHERE NotificationID = thisnotifID);
IF @count = 1 then
	DELETE FROM NOTIFICATIONLOOKUPtemp WHERE ChamberID=thischamber AND NotificationID=thisnotifID;
    DELETE FROM NOTIFICATIONtemp WHERE NotificationID= thisnotifID;
ELSE
	DELETE FROM NOTIFICATIONLOOKUPtemp WHERE ChamberID=thischamber AND NotificationID=thisnotifID;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPrejectSurveyTmp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPrejectSurveyTmp`(thissurveyID int, thischamber int)
BEGIN

/*
	Author: Hayden Lummis
    Date: 10/10/2017
    Purpose: To reject an Survey offered by a parent chamber to its child chambers
    If a user is rejecting the last tmp lookup to a survey, delete the tmp survey as well
    Use: CALL SPrejectSurveyTmp(SurveyID, ChamberID)

*/


SET @count = (SELECT COUNT(*) FROM SURVEYLOOKUPtemp WHERE SurveyID = thissurveyID);
IF @count = 1 then
	DELETE FROM `SURVEYLOOKUPtemp` WHERE `SurveyID` = thissurveyID AND `ChamberID` = thischamber;
    DELETE FROM `SURVEYtemp` WHERE `SurveyID` = thissurveyID;
ELSE
	DELETE FROM `SURVEYLOOKUPtemp` WHERE `SurveyID` = thissurveyID AND `ChamberID` = thischamber;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPsetEventCantgo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPsetEventCantgo`(eventid int, userid int)
BEGIN

/*
	Author: Hayden Lummis
    Date: 03/09/2017
    Purpose: To mark an Event for a user as cant go, make sure its the only RSVP they have
    Use: CALL SPsetEventCantgo(EventID, UserID); 

*/

	INSERT INTO MYEVENTCANTGO (`EventID`, `UserID`) VALUES (eventid,userid);

    DELETE FROM MYEVENTGOING WHERE MYEVENTGOING.EventID = eventid AND MYEVENTGOING.UserID = userid;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPsetEventGoing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`ibc`@`%` PROCEDURE `SPsetEventGoing`(eventid int, userid int)
BEGIN

/*
	Author: Hayden Lummis
    Date: 03/09/2017
    Purpose: To mark an Event for a user as attending, make sure its the only RSVP they have
    Use: CALL SPsetEventGoing(EventID, UserID); 

*/
	
    INSERT INTO MYEVENTGOING (`EventID`, `UserID`) VALUES (eventid,userid);

	DELETE FROM MYEVENTCANTGO WHERE MYEVENTCANTGO.EventID = eventid AND MYEVENTCANTGO.UserID = userid;
    


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-19 17:37:12
