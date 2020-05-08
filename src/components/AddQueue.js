import React, { useContext, useState } from 'react';
import { QueueContext } from './QueueContext';
import { ValidateForm, ValidateInput } from '../utils/validateForm'; 

const AddQueue = () => {
    const { queue, setQueue } = useContext(QueueContext)
    const [state, setState] = useState({
      queue: null,
      name: null,
      phoneNumber: null,
      queueAdded: false,
      errors: {
          name: '',
          phoneNumber: ''
      }
    })

    function handleSubmit (e) {
        e.preventDefault()
        if(ValidateForm(state.errors)) {
          const addQueue = queue.enqueue(queue.getLastId(), state.name, +state.phoneNumber)
          if (addQueue) {
            setQueue(queue)
            setState({
              ...state,
              queueAdded: false
            })
          } else {
            setState({
              ...state,
              queueAdded: true
            })
          }
        } else {
          alert('Invalid Form')
        }
    }

    function handleChange (e) {
        e.preventDefault()
        const { name, value } = e.target;
        let queue = state.queue;
        let errors = state.errors;

        errors = ValidateInput(name, value, state.errors)

        setState({
          ...state,
          queue, 
          errors, 
          [name]: value
        });
      }

      const { errors } = state
      return (
          <div>
            <h2>Add Queue</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name">Name</label>
                <input type='text' name='name' onChange={handleChange} noValidate />
                {errors.name.length > 0 && <span>{errors.name}</span>}
              </div>
              <div>
                <label htmlFor="phoneNumber">phoneNumber</label>
                <input type='number' name='phoneNumber' onChange={handleChange} noValidate />
                {errors.phoneNumber.length > 0 && <span>{errors.phoneNumber}</span>}
              </div>
              <div>
                <span>{state.queueAdded === true ? "queue exist" : ""}</span>
              </div>
              <div>
                <button>Create</button>
              </div>
            </form>
          </div>
      );
}

export default AddQueue