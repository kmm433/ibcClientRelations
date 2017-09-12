import React from 'react';
import $ from 'jquery';
import { WithContext as ReactTags } from 'react-tag-input';
import CompleteMemberDetails from './CompleteMemberDetails.js';
import NotesPanel from './NotesPanel.js'

class MemberDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      suggestions: [],
      details: {},
      complete_details: null,
      fields: null,
      editable: false,
      notes: []
    }
    this.getCompleteDetails = this.getCompleteDetails.bind(this);
    this.getMembersGroups = this.getMembersGroups.bind(this);
    this.getAvailableGroups = this.getAvailableGroups.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.toggleArchive = this.toggleArchive.bind(this);
  }

  componentWillMount() {
    this.getMembersGroups();
    this.getAvailableGroups();
    this.getCompleteDetails();
    this.getNotes()
  }

  // Finds all the variable information pertaining to a user for display
  getCompleteDetails() {
    // Fetch the required fields for this chamber
    $.ajax({
      url: '/php/chamber_form.php',
      type: 'POST',
      dataType: 'json',
      data: {'chamber': this.props.chamber_id},
      success: response => {
        var fields = response;
        var ignoredResults = [];
        fields.forEach((field, i)=> {
          if(field['columnname'] === 'ignore' || field['displayname'] === 'Password')
            ignoredResults.push(i);
        });
        ignoredResults.forEach(field => {
          delete fields[field];
        });
        var expiryField = {
          DataID:"1",
          columnname:"expiry",
          displayname:"Membership Expiry Date",
          inputtype:"date",
          mandatory:"1",
          maximum:"",
          minimum:"",
          ordering:"1000000",
          tablename:"USER",
          value:this.props.expiry
        };
        fields.push(expiryField);
        this.setState({fields: fields});
        $.ajax({
          url: "/php/get_complete_details.php",
          type: 'POST',
          dataType: 'json',
          data: {
            'fields': JSON.stringify(fields),
            'member': this.props.member
          }, success: response => {
            // Match the values to their fields
            for (var value in response) {
              fields.forEach((field) => {
                if(field['displayname'] === value) {
                  field['value'] = response[value];
                }
              });
            }
            // Sort the fields by their ordering value
            fields.sort((a, b) => {
              return(a['ordering'] - b['ordering']);
            });
            this.setState({details: fields});
          }, error: response => {
            console.log('ERROR:', response);
          }
        });
      }
    });
  }

  // Fetches the groups that a member is in from the database
  getMembersGroups() {
    $.ajax({
      url: "/php/get_members_groups.php",
      type: 'POST',
      dataType: 'json',
      data: {
        'member': this.props.member
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

  // Fetches any notes left about a member
  getNotes() {
    $.ajax({
      url: "/php/get_notes.php",
      type: 'POST',
      dataType: 'json',
      data: {
        'member': this.props.member
      }, success: response => {
        this.setState({notes: response});
      }, error: response => {
        console.log('Failed to retrieve notes.', response);
      }
    });
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
        'member': this.props.member,
        'group': deleted
      },
      success: result => {
        this.setState({tags: tags});
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
          'member': this.props.member,
          'group': tag
        },
        success: result => {
          this.setState({tags: tags});
          this.getAvailableGroups()
        }
      });
    }
  }

  handleDrag(tag, currPos, newPos) {
    //Do nothing, function is required but there is no point to rearranging.
  }

  setEditMode(event) {
    this.setState({editable: !this.state.editable});
  }

  // This function will allow a chamber members archive status to be changed and
  // then refresh the list of members.
  toggleArchive() {
    var archived = 1;
    if (this.props.archived) {
      archived = 0;
    }
    $.ajax({
      url: '/php/set_archive_member.php',
      type: 'POST',
      dataType: 'json',
      data: {
        'member': this.props.member,
        'archive_status': archived
      },
      success: response => {
        this.props.getChamberMembers();
      },
      error: response => {
        console.log(response);
      }
    });
  }

  render() {
    const {tags, suggestions} = this.state
    return (
      <div className='member-details'>
        <div className='member-details-controls'>
          <h4>Options</h4>
          <input type='button' className='btn btn-primary' value='Hide Details' onClick={(e) => this.props.unselect(e)}/>
          <input type='button' className='btn btn-primary' value='Email User' />
          <input type='button' className='btn btn-primary' value='Edit Member Details' onClick={(e) => this.setEditMode(e)}/>
          { this.props.all || this.props.renewals ?
            <input type='button' className='btn btn-danger' value='Archive Member' onClick={(e) => this.toggleArchive(e)}/>
            : null
          }
          { this.props.archived ?
            <input type='button' className='btn btn-success' value='Unarchive Member' onClick={(e) => this.toggleArchive(e)}/>
            : null
          }
        </div>
        <div className='member-details-text'>
          <h4>Complete Details</h4>
          <div className='member-details-left'>
            <img src='img/default_profile_pic_small.png' />
          </div>
          <CompleteMemberDetails
            class_name='member-details-right'
            member={this.props.member}
            details={this.state.details}
            editable={this.state.editable}
            getCompleteDetails={this.getCompleteDetails}
            setEditMode={this.setEditMode}
            getNotes={this.getNotes}
          />
        </div>
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
          member={this.props.member}
          notes={this.state.notes}
          getNotes={this.getNotes}
        />
      </div>
    );
  }
};

export default MemberDetails;
