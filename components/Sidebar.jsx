export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
      <div key={note.id}>
          <div

              className={`title ${
                  note.id === props.currentNote.id ? "selected-note" : ""
              }`}
              onClick={() => props.setCurrentNoteId(note.id)}
          >
            {/* split the note at next line & first line is the title of note */}
              <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
              {/* delete button added to delete note */}
              <button
                    className="delete-btn"
                    // Your onClick event handler here
                    onClick={() => props.deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
          </div>
      </div>
  ))

  return (
      <section className="pane sidebar">
          <div className="sidebar--header">
              <h3>Notes</h3>
              <button className="new-note" onClick={props.newNote}>+</button>
          </div>
          {noteElements}
      </section>
  )
}
