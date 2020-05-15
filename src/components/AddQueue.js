import React, { useContext, useState } from 'react';
import { QueueContext } from './QueueContext';
import { ValidateForm, ValidateInput } from '../utils/validateForm'; 

import styled from 'styled-components'

const AddQueue = () => {
    const { queue, setQueue } = useContext(QueueContext)
    const [state, setState] = useState({
      queue: null,
      name: null,
      phoneNumber: null,
      queueExist: false,
      errors: {
          name: '',
          phoneNumber: ''
      }
    })

    function handleSubmit (e) {
        e.preventDefault()
        if(ValidateForm(state.errors)) {
          let date = new Date()
          const addQueue = queue.enqueue(queue.getLastId(), state.name, +state.phoneNumber, date)

          if (addQueue) {
            setQueue(queue)
            setState({
              ...state,
              queueExist: false
            })
          } else {
            setState({
              ...state,
              queueExist: true
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
          <AddQueueForm>
            <div className="wrapper">
              <div className="form-wrapper">
                <h2>Create Queue</h2>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="name">
                    <label 
                      htmlFor="name">
                      Name
                    </label>
                    <input 
                      type='text' 
                      name='name' 
                      onChange={handleChange} 
                      noValidate 
                    />
                    {errors.name.length > 0 
                    && (<span className="error">{errors.name}</span>)}
                  </div>
                  <div className="phoneNumber">
                      <label 
                        htmlFor="phoneNumber">
                        Phone number
                      </label>
                      <input 
                        type='number' 
                        name='phoneNumber' 
                        onChange={handleChange} 
                        noValidate 
                      />
                      {errors.phoneNumber.length > 0 
                      && (<span className="error">{errors.phoneNumber}</span>)}
                  </div>
                  <div className="info">
                    {state.queueExist === true ? "Queue with name and phone exist already exist" : ""}
                  </div>
                  <button className="submit-button">Create</button>
                </form>
              </div>
            </div>
          </AddQueueForm>
      );
}

export default AddQueue

const AddQueueForm = styled.div`
  .wrapper {
    height: 97vh;
    display: flex;
    flex-direction: column;
  }
  
  .form-wrapper {
    display: flex;
    flex-direction: column;
    width: 280px;
    max-width: 80%;
    min-width: 100px;
    min-height: 400px;
    padding: 20px 40px;
    border-radius: 6px;
    box-shadow: 0px 8px 36px #d6d1d5;
    background-color: #fefefe;
  }
    
  .form-wrapper > h2 {
    display: flex;
    justify-content: center;
    font-family: "Segoe UI", "Ubuntu", "Roboto", "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 2em;
    font-weight: lighter;
    margin-top: 0.25em;
    color: #222;
  }

  form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .info {
    padding-bottom: 1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  label {
    margin-bottom: 0.5em;
    color: #444;
    font-weight: lighter;
  }

  input {
    padding: 10px 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #d6d1d5;
  }

  input::placeholder {
    font-size: 1.2em;
    font-weight: lighter;
    color: #bbb;
  }

  .submit-button {
    font-size: 12px;
    text-align: center;
    width: 100%;
    cursor: pointer;
    padding: 	0.5em;
    border-radius: 4px;
    background-color: #22223B;
    color: #fefefe;
  }

  .submit-button:hover {
    background-color: #4A4E69;
    color: #fefefe;
  }

  input.error {
    border: 1px solid #EADAE4;
  }

  .error {
    color:#db2269;
    font-size: 0.625em;
    display: relative;
  }

  .name {
    margin-right: 1%;
  }

  .name,
  .phoneNumber {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  .name,
  .phoneNumber {
    width: 100%;
  }

  .submit {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
`