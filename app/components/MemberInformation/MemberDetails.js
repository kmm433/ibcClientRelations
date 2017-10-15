import React from 'react';
import $ from 'jquery';
import { WithContext as ReactTags } from 'react-tag-input';
import * as MemberActions from '../../Actions/MemberActions.js';
import MemberStore from '../../Stores/MemberStore.js';
import CompleteMemberDetails from './CompleteMemberDetails.js';
import NotesPanel from './NotesPanel.js'

class MemberDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      suggestions: [],
      details: {},
      editable: false,
      notes: [],
    }
    this.updateValues = this.updateValues.bind(this);
    this.getMembersGroups = this.getMembersGroups.bind(this);
    this.getAvailableGroups = this.getAvailableGroups.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.toggleArchive = this.toggleArchive.bind(this);
    this.renderInvoice= this.renderInvoice.bind(this);
  }

  componentWillMount(props) {
    MemberStore.on('change', this.updateValues);
    MemberActions.fetchNotes(this.props.memberID);
    MemberActions.fetchCompleteDetails(this.props.chamber_id, this.props.expiry, this.props.memberID, false);
    this.getMembersGroups();
    this.getAvailableGroups();
  }

  componentWillUnmount() {
    MemberStore.removeListener('change', this.updateValues);
  }

  updateValues() {
    this.setState({
      notes: MemberStore.getNotes(),
      details: MemberStore.getCompleteDetails(),
    });
  }

  // Fetches the groups that a member is in from the database
  getMembersGroups() {
    $.ajax({
      url: "/php/get_members_groups.php",
      type: 'POST',
      dataType: 'json',
      data: {
        'memberID': this.props.memberID
      },
      success: result => {
        if (result !== '') {
          var results = result;
          var groupNames = [];
          results.forEach((item, i) => {
            groupNames.push({id:i, text:item['name']});
          });
          this.setState({tags: groupNames});
        }
    }});
  }

  // Fetches the available groups from the database to use as suggestions
  getAvailableGroups() {
    $.ajax({url: "/php/get_chamber_groups.php", success: result => {
      if (result !== '') {
        var results = JSON.parse(result);
        var groupNames = [];
        results.forEach((item) => {
          groupNames.push(item['name']);
        });
        this.setState({suggestions: groupNames});
      }
    }});
  }

  handleDelete(i) {
    let tags = this.state.tags;
    var deleted = tags[i]['text'];
    tags.splice(i, 1);

    $.ajax({
      url: "/php/delete_member_from_group.php",
      type: 'POST',
      dataType: 'json',
      data: {
        'memberID': this.props.memberID,
        'group': deleted
      },
      success: result => {
        this.setState({tags: tags});
      },
      error: result => {
        console.log(result);
      }
    });
  }

  // Check if a tag is already applied before adding it
  handleAddition(tag) {
    let tags = this.state.tags;
    var existing = false;
    tags.forEach((existingTag) => {
      if(existingTag['text'] === tag)
        existing = true;
    });
    if(!existing){
      tags.push({
        id: tags.length + 1,
        text: tag
      });
      $.ajax({
        url: "/php/add_member_to_group.php",
        type: 'POST',
        dataType: 'json',
        data: {
          'memberID': this.props.memberID,
          'group': tag
        },
        success: result => {
          this.setState({tags: tags});
          this.getAvailableGroups()
        },
        error: result => {
          console.log(result);
        }
      });
    }
  }

  handleDrag(tag, currPos, newPos) {
    //Do nothing, function is required but there is no point to rearranging.
  }

  setEditMode() {
    this.setState({editable: !this.state.editable});
  }

  // Checks if an expiry is upcoming or has occurred
  renderInvoice() {
    // Splice the datestring into a usable date object
    var warningWindow = new Date();
    var expiryString = this.props.expiry;
    var expiryDateComponents;
    var expiryDate = null;
    if (expiryString) {
      var date = expiryString.split(' ');
      expiryDateComponents = date[0].split('-');
      expiryDate = new Date(expiryDateComponents[0], parseInt(expiryDateComponents[1]) - 1, expiryDateComponents[2]);
    }
    // Check if in warning phase or already expired
    if(expiryDate && (expiryDate < warningWindow)) {
      return (
        <a className='btn btn-primary'
          href={'/php/xero_invoice.php?user_id=' + this.props.memberID}>
          Manage Invoices with Xero
        </a>
      );
    }
    else{
      warningWindow.setDate(warningWindow.getDate() + 14);
      if (expiryDate && (expiryDate < warningWindow)){
        return (
          <a className='btn btn-primary'
            href={'/php/xero_invoice.php?user_id=' + this.props.memberID}>
            Manage Invoices with Xero
          </a>
        );
      }
    }
    return null;
  }

  // This function will allow a chamber members archive status to be changed and
  // then refresh the list of members.
  toggleArchive() {
    console.log('Attempting to perform archive action.');
    var archived = 1;
    if (this.props.archived) {
      archived = 0;
    }
    $.ajax({
      url: '/php/set_archive_member.php',
      type: 'POST',
      dataType: 'json',
      data: {
        'memberID': this.props.memberID,
        'archive_status': archived
      },
      success: response => {
        this.props.getChamberMembers();
        this.props.unselect();
      },
      error: response => {
        console.log(response);
      }
    });
  }

  render() {
    const {tags, suggestions} = this.state;
    const invoiceButton = this.renderInvoice();
    return (
      <div className='member-details'>
        <div className='member-details-controls'>
          <div className='member-details-controls-buttons'>
            <input type='button' className='btn btn-primary' value='Return to List' onClick={(e) => this.props.unselect(e)}/>
            <a className='btn btn-primary' href={'mailto:'+this.props.member}>Email User</a>
            <input type='button' className='btn btn-primary' value='Edit Member Details' onClick={(e) => this.setEditMode(e)}/>
            { invoiceButton }
            { this.props.all || this.props.renewals ?
              <input type='button' className='btn btn-danger' value='Archive Member' onClick={(e) => this.toggleArchive(e)}/>
              : null
            }
            { this.props.archived ?
              <input type='button' className='btn btn-success' value='Unarchive Member' onClick={(e) => this.toggleArchive(e)}/>
              : null
            }
          </div>
        </div>
        <CompleteMemberDetails
          memberID={this.props.memberID}
          details={this.state.details}
          editable={this.state.editable}
          setEditMode={this.setEditMode}
        />
        <div className='member-details-groups'>
          <h4>Manage Groups</h4>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag}
            autocomplete={true}
            allowDeleteFromEmptyInput={false}
            placeholder={'Add to group'}
          />
        </div>
        <NotesPanel
          memberID={this.props.memberID}
          notes={this.state.notes}
        />
      </div>
    );
  }
};

export default MemberDetails;
