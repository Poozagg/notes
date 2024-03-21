import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import Split from "react-split"
import {nanoid} from "nanoid"
import './App.css'

function App() {
  // notes as state is  localStorage or an empty array in order to avoid getting null when the app first loads)
  // lazily initialize 'notes' state as function so it doesnt reach into lacalStorage on every single re-render of the App component.
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
    )
  const [currentNoteId, setCurrentNoteId] = useState(
      (notes[0] && notes[0].id) || ""
  )

  // we want this useEffect to run every time the notes array changes
  useEffect(() => {
    // notes is the key & JSON is the value of the key
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function createNewNote() {
      const newNote = {
          id: nanoid(),
          body: "# Type your markdown note's title here"
      }
      setNotes(prevNotes => [newNote, ...prevNotes])
      setCurrentNoteId(newNote.id)
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

      // ---! This does not rearrange the notes !---
      // function updateNote(text) {
      //   setNotes(oldNotes => oldNotes.map(oldNote => {
      //       return oldNote.id === currentNoteId
      //           ? { ...oldNote, body: text }
      //           : oldNote
      //     }))
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
