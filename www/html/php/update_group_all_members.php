<?php
  include 'db_handler.php';
  $db = new DB_Handler();
  // Get the group ID for the all memebrs group
  $groupID = $db->getGroupID($_SESSION['chamber'], 'All Members');
  if (!$groupID) {
    // If the group doesn't exist already create it
    $groupID = $db->createGroup($_SESSION['chamber'], 'All Members');
  }
  $chamberMembers = $db->getChamberMembers($_SESSION['chamber']);
  forEach($chamberMembers as $member) {
    $inGroup = $db->checkIfMemberInGroup($member['UserID'], $groupID['groupID']);
    if (!$member['archived'] && !$inGroup) {
      // Add unarchived members to the group
      $addedToGroup = $db->addMemberToGroup($member['UserID'], $groupID['groupID']);
      echo 'Added ' . $member['firstname'] . ' to All Members: ' . json_encode($addedToGroup);
    }
    else if ($member['archived'] && $inGroup) {
      // Remove archived members from the group
      $removedFromGroup = $db->deleteMemberFromGroup($member['UserID'], $groupID['groupID']);
      echo 'Removed ' . $member['firstname'] . ' from All Members' . json_encode($removedFromGroup);
    }

  }
?>
