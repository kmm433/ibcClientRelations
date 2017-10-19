import React from 'react';
import $ from 'jquery';
import * as GroupActions from '../../Actions/GroupActions.js';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      list_id: false,
      updated: false,
    };
    this.toggleHover = this.toggleHover.bind(this);
    this.updateChecked = this.updateChecked.bind(this);
    this.handleIDEdit = this.handleIDEdit.bind(this);
    this.submitMailListKey = this.submitMailListKey.bind(this);
    this.unregisterMailListID = this.unregisterMailListID.bind(this);
  }

  componentWillMount(props) {
    this.setState({
      list_id: this.props.email_ready,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list_id: nextProps.email_ready,
    });
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  updateChecked(event) {
    this.props.updateSelectedGroups(this.props.group_id, event.target.checked);
  }

  handleIDEdit(event) {
    this.setState({list_id: event.target.value});
    var identifier = this.props.group_id + '-confirmation';
    $('#'+this.props.group_id+'-unregister').fadeOut('slow', function() {
          $('#'+identifier).fadeIn('slow');
    });
  }

  submitMailListKey() {
    const listID = this.state.list_id;
    if (confirm('This will syncronize your mail list to this group. Doing so may delete members from the mail list. Do you wish to proceed?')) {
      GroupActions.updateMailListID(this.props.group_id, listID);
    }
  }

  unregisterMailListID() {
    GroupActions.unregisterMailListID(this.props.group_id);
    this.setState({list_id: ''});
  }

  render() {
    var hoverState;
    if (this.state.hover) {
      hoverState = {backgroundColor: '#E5E5E5'};
    } else {
      hoverState = {backgroundColor: '#FFFFFF'};
    }
    return(
      <div className='group' style={hoverState} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <div className='group-selected'>
          <input type='checkbox'
            defaultChecked={this.props.selected}
            onClick={e => this.updateChecked(e)}
          />
        </div>
        <div className='group-name'>{this.props.group_name}</div>
        <div className='group-size'>{this.props.group_size}</div>
        <div className='group-emailable'>
          {this.props.editable ?
            <div className='list-id-editor input-group'>
            <input className='listid-edit-form'
              type='text'
              value={this.state.list_id ? this.state.list_id : ''}
              onChange={e => this.handleIDEdit(e)}
            />
            <span className='input-group-btn'>
              <input id={this.props.group_id + '-confirmation'}
                className='btn btn-success listid-confirmation '
                type='button'
                value='Confirm'
                onClick={() => this.submitMailListKey()}
              />
            </span>
            <span className='input-group-btn'>
              <input id={this.props.group_id + '-unregister'}
                className='btn btn-danger listid-unregister'
                type='button'
                value='Unregister'
                onClick={() => this.unregisterMailListID()}
              />
            </span>
            </div>
            : this.props.email_ready
          }
        </div>
      </div>
    );
  }
};

export default Group;
