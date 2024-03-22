import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import Split from "react-split"
import './App.css'
import { addDoc, onSnapshot } from "firebase/firestore"
import { notesCollection } from "../firebase"

function App() {
  // notes as state is  localStorage or an empty array in order to avoid getting null when the app first loads)
  // lazily initialize 'notes' state as function so it doesnt reach into lacalStorage on every single re-render of the App component.
  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(
      (notes[0]?.id) || ""
  )

  // we want this useEffect to run every time the notes array changes
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
      // Sync up our local notes array with the snapshot data
      const notesArr = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }))
      setNotes(notesArr)
    })
    return unsubscribe
  }, [notes])

  async function createNewNote() {
      const newNote = {
          body: "# Type your markdown note's title here"
      }
      const newNoteRef = await addDoc(notesCollection, newNote)
      setCurrentNoteId(newNoteRef.id)
  }


  function updateNote(text) {
    // Put the most recently-modified note to the top
      setNotes(oldNotes => {
        const newArray = []
        for (let i = 0; i < oldNotes.length; i++) {
          const oldNote = oldNotes[i]
          if (oldNote.id === currentNoteId) {
            //  put the updated note to the top beginning of the new array
            newArray.unshift({ ...oldNote, body: text })
          } else {
            //  push the old note to the end of the new array
            newArray.push(oldNote)
          }
        }
        return newArray
      })
  }

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter((note) => note.id !== noteId ))
  }


  function findCurrentNote() {
      return notes.find(note => {
          return note.id === currentNoteId
      }) || notes[0]
  }

  return (
    <main>
        {
          notes.length > 0
          ?
          <Split
              sizes={[30, 70]}
              direction="horizontal"
              className="split"
          >
              <Sidebar
                  notes={notes}
                  currentNote={findCurrentNote()}
                  setCurrentNoteId={setCurrentNoteId}
                  newNote={createNewNote}
                  deleteNote={deleteNote}
              />
              {
                  currentNoteId &&
                  notes.length > 0 &&
                  <Editor
                      currentNote={findCurrentNote()}
                      updateNote={updateNote}
                  />
              }
          </Split>
          :
          <div className="no-notes">
              <h1>You have no notes</h1>
              <button
                  className="first-note"
                  onClick={createNewNote}
              >
                  Create one now
              </button>
          </div>
        }
        </main>
  )
}

export default App
