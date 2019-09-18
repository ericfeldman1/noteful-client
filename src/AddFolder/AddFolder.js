import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

// Create a new component AddFolder that implements a form to 
// capture the name of a new folder from the user. This form should 
// submit the name of the new folder to the POST /folders endpoint 
// on the server. Ensure that any errors are properly handled. 
// Add a button to the navigation to invoke the new form.

class AddFolder extends Component {
    
    static defaultProps = {
        history: {
          push: () => { }
        }
      }

      static contextType = ApiContext;
    
      submitForm = event => {
        event.preventDefault()

        const folder = {
          name: event.target['folder'].value
        }

        fetch(`${config.API_ENDPOINT}/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(folder),
        })

          .then(response =>response.json())

          .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
          })

          .catch(error => {
            console.error({ error })
          })
      }
    
      render() {
        return (
          <section className='AddFolder'>
            <h2>Create a folder</h2>
            <NotefulForm 
            onSubmit={event=>
            this.submitForm(event)}
            >
              <p>
                <input
                    type="text"
                    name="folder"
                    placeholder="folder"
                    aria-label="folder"
                    required
                        />
                </p>    
                <p>
                `<input
                    type="submit"
                    name="submit"
                    value="Submit"
                    aria-label="Submit Button"
                />
             </p>
            </NotefulForm>
          </section>
        )
      }
    }

export default AddFolder