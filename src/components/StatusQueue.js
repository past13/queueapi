import React, { useContext, useState } from 'react';
import { QueueContext } from './QueueContext';
import QueueItem from './QueueItem'

import styled from 'styled-components'

const StatusQueue = () => {
    const { queue } = useContext(QueueContext)
    const [state, setState] = useState({
        name: '',
        phoneNumber: '',
        currentQueue: null,
        foundQueue: null
    })
  
    const nextQueue = () => {
        queue.dequeue()
        setState({
          ...state,
          currentQueue: queue.peek()
        }) 
    }

    const currentQueue = () => {
        setState({
          ...state,
          currentQueue: queue.peek()
        }) 
    }

    const handleChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value.trim()
      })
    }

    function getQueue(e) {
      e.preventDefault()

      let inputValue = {}

      if (state.name) {
        inputValue = { name: state.name }
      }    

      if (state.phoneNumber) {
        inputValue = { ...inputValue, phoneNumber: +state.phoneNumber }
      }  

      let result = []
      if (Object.entries(inputValue).length > 0) {
        result = queue.getQueue(inputValue)
      }

      if (result.length) {
        setState({
          ...state,
          foundQueue: result[0]
        })  
      } else {
        setState({
          ...state,
          foundQueue: null
        }) 
      }
    }
    
    return (
        <StatusQueueForm>
          <div className="form-wrapper">
              <div className="check-container">
                <div className="submit-button" onClick={currentQueue}>Current queue</div>
                <div className="submit-button" onClick={nextQueue}>Next queue</div>
              </div>
              <div>
                {state.currentQueue?.name? <QueueItem queue={state.currentQueue} /> : <div>no queue</div>}
              </div>
              <form className="search-form" onSubmit={getQueue} noValidate>
                  <div className="input-container">
                    <label htmlFor="name">Name</label>
                    <input className="name" type='text' name='name' onChange={handleChange} noValidate />
                  </div>
                  <div className="">
                    <label htmlFor="phoneNumber">Phone number</label>
                    <input className="phoneNumber" type='number' name='phoneNumber' onChange={handleChange} noValidate />
                  </div>
                  <div className="check-button">
                    <div className="submit-button" onClick={getQueue}>Get queue</div>
                  </div>
                  <div>{state.foundQueue?.name? <QueueItem queue={state.foundQueue} /> : 'nof found queue'}</div>
              </form>
          </div>
        </StatusQueueForm>
    )
}

export default StatusQueue;

const StatusQueueForm = styled.div`
  
  .form-wrapper {
    display: flex;
    flex-direction: column;
    width: 280px;
    max-width: 80%;
    min-width: 300px;
    min-height: 400px;
    padding: 20px 40px;
    border-radius: 6px;
    box-shadow: 0px 8px 36px #d6d1d5;
    background-color: #fefefe;
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
    width: 50%;
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
  
  button:hover {
    background-color: #4A4E69;
    color: #fefefe;
  }

  .name {
    margin-right: 1%;
  }

  .name,
  .phoneNumber {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 10px 0px 15px 0px;
  }

  .check-button {
    margin: 20px 0px 20px 0px;
  }

  .check-container {
    margin: 20px 0px 20px 0px;

    .submit-button {
      display: inline;
      margin-right: 10px;
      padding: 10px;
    }
  }

  .search-form {
    padding: 20px 0px 20px 0px;
  }
`