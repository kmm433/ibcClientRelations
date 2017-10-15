import React from 'react';
import $ from 'jquery';
import Note from './Note.js';
import * as MemberActions from '../../Actions/MemberActions.js';

class NotesPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users_note: ''
    };
    this.updateNote = this.updateNote.bind(this);
    this.handleSubmitNote = this.handleSubmitNote.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  // Updates the note that is being written by a user
  updateNote(event) {
    this.setState({users_note: event.target.value});
  }

  // Submits a user's note to the database.
  handleSubmitNote() {
    MemberActions.submitNote(this.props.memberID, this.state.users_note);
    this.setState({
      users_note: '',
    });
  }

  // Renders each individaul note that is passed in via props.
  renderNotes() {
    const notes = this.props.notes;
    if (notes) {
      var noteElements = notes.map((note, i) => {
        return (
          <Note key={i}
            timestamp={note['ts']}
            user={note['firstname'] + ' ' + note['lastname']}
            note={note['note']}
          />
        );
      });
      return noteElements;
    }
    else
      return null;
  }

  render() {
    return (
      <div className='notes-panel'>
        <h4>Notes About This Member</h4>
        {this.renderNotes()}
        <textarea
          placeholder='Leave a new comment.'
          value={this.state.users_note}
          onChange={(e) => this.updateNote(e)}
        />
        <input
          type='button'
          className='btn btn-primary'
          value='Submit Note'
          onClick={this.handleSubmitNote}
        />
      </div>
    );
  }
};

export default NotesPanel;
