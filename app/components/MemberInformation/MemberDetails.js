import React from 'react';
import $ from 'jquery';
import { WithContext as ReactTags } from 'react-tag-input';
import CompleteMemberDetails from './CompleteMemberDetails.js';

class MemberDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      suggestions: [],
      static_details: {},
      complete_details: null,
      fields: null,
      editable: false
    }
    this.getCompleteDetails = this.getCompleteDetails.bind(this);
    this.getMembersGroups = this.getMembersGroups.bind(this);
    this.getAvailableGroups = this.getAvailableGroups.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
  }

  componentWillMount() {
    this.getMembersGroups();
    this.getAvailableGroups();
    this.getCompleteDetails();
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
          if(field['columnname'] === 'ignore')
            ignoredResults.push(i);
        });
        ignoredResults.forEach(field => {
          delete fields[field];
        });
        this.setState({fields: fields});
        console.log(fields);
        // Request each fields value from the appropriate table
        var queryParameters = [];
        fields.forEach((field) => {
          queryParameters.push([field['columnname'], field['tablename']]);
        });
        $.ajax({
          url: "/php/get_complete_details.php",
          type: 'POST',
          dataType: 'json',
          data: {
            'fields': JSON.stringify(fields),
            'member': this.props.member
          }, success: response => {
            this.setState({static_details: response});
          }, error: response => {
            console.log('ERROR:', response);
          }
        });
      }
    });

    /*$.ajax({
      url: "/php/get_complete_details.php",
      type: 'POST',
      dataType: 'json',
      data: {
        'member': this.props.member
      }, success: result => {
        var details = {
          'First Name': result[0],
          'Last Name': result[1],
          'Email': result[2],
          'Position': result[3],
          'User Type': result[4],
          'Member Since': result[5],
          'Membership Expires': result[6],
          'Business Name': result[7],
          'ABN': result[20],
          'ANZIC Code': result[17],
          'Number of Employees': result[18],
          'Company Established': result[19],
          'Address Line 1' : result[8],
          'Address Line 2' : result[9],
          'City' : result[10],
          'Postcode' : result[11],
          'State' : result[12],
          'Country' : result[13],
          'Business Phone' : result[14],
          'Phone' : result[15],
          'Mobile Phone' : result[16]
        };
        this.setState({static_details: details, complete_details: result});
      }
    });*/
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
    event.stopPropagation();
  }

  render() {
    const {tags, suggestions} = this.state
    return (
      <div className='member-details'>
        <div className='member-details-left'>
          <img src='img/default_profile_pic_small.png' />
        </div>
        <CompleteMemberDetails
          class_name='member-details-right'
          details={this.state.complete_details}
          static_details={this.state.static_details}
          editable={this.state.editable}
        />
        <div className='member-details-controls'>
          <input type='button' className='btn btn-success' value='Hide Details' onClick={(e) => this.props.unselect(e)}/>
          <input type='button' className='btn btn-success' value='Email User' />
          <input type='button' className='btn btn-success' value='Leave a Note'/>
          <input type='button' className='btn btn-success' value='Edit Member Details' onClick={(e) => this.setEditMode(e)}/>
          <input type='button' className='btn btn-danger' value='Delete Member'/>
        </div>
        <div className='member-details-groups'>
          <p>Manage groups:</p>
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
      </div>
    );
  }
};

export default MemberDetails;
