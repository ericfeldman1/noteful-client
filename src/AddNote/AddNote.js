import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

// Create a new component AddNote that implements a form to capture 
// the name, content and folder for a new Note. Submit to the POST 
// /notes endpoint on the server. Add validation to ensure that 
// the name of the note is not left blank. The folder should be 
// selected from a list of existing folders. Ensure that errors are 
// properly handled. Add a button to the note list page to 
// invoke this new form.


class AddNote extends Component {

    static defaultProps = {
        history: {
          push: () => { }
        }
      }

      static contextType = ApiContext;
    
      submitForm = event => {
        event.preventDefault()

        const newNote = {
          name: event.target['name'].value,
          content: event.target['content'].value,
          folderId: event.target['folder-select'].value,
          modified: new Date(),
        }

        fetch(`${config.API_ENDPOINT}/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newNote),
        })

        .then(response => response.json())

        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folderId}`)
          })

          .catch(error => {
            console.error({ error })
          })
      }
    
      render() {
        const { folders=[] } = this.context
        return (
          <section className='AddNote'>
            <h2>Create a note</h2>
            <NotefulForm 
                onSubmit={event=>
                this.submitForm(event)}
                    >
            <p>
             <input
                 type="text"
                 name="name"
                 placeholder="name"
                 aria-label="note"
                        />
            </p>
            <p>
                <input
                    type="text"
                    name="content"
                    placeholder="content"
                    aria-label="content"
                    required
                />
            </p>  
            <p>
                <select 
                name='folder-select'
                aria-label="Folders">
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
            </p>
            <p>
                <input
                    type="submit"
                    name="submit"
                    placeholder="Submit"
                    aria-label="Note Submit Button"
                />
                    </p>
            </NotefulForm>
          </section>
        )
      }
    }

    export default AddNote


