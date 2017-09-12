import React from 'react';
import $ from 'jquery';
import Note from './Note.js';

class NotesPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {users_note: ''};
    this.updateNote = this.updateNote.bind(this);
    this.handleSubmitNote = this.handleSubmitNote.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  // Updates the note that is being written by a user
  updateNote(event) {
    this.setState({users_note: event.target.value});
  }

  // Submits a user's note to the database.
  handleSubmitNote(event) {
    const note = this.state.users_note;
    if(note !== '') {
      $.ajax({
        url: "/php/add_note.php",
        type: 'POST',
        dataType: 'json',
        data: {
          'member': this.props.member,
          'note': note
        }, success: response => {
          this.setState({users_note: ''});
          this.props.getNotes();
        }, error: response => {
          console.log('ERROR:', response);
        }
      });
    }
  }

  // Renders each individaul note that is passed in via props.
  renderNotes() {
    const notes = this.props.notes;
    console.log('notes is: ', notes);
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
          onClick={(e) => this.handleSubmitNote(e)}
        />
      </div>
    );
  }
};

export default NotesPanel;
