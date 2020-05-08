import React, { useContext, useState } from 'react';
import { QueueContext } from './QueueContext';

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

      const inputValue = {
        name: state.name,
        phoneNumber: state.phoneNumber
      }

      const result = queue.getQueue(inputValue)
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

    const QueueItem = ({queue}) => (
        <div>
          <div>
            {queue.date}
          </div>
          <div>
            {queue.name}
          </div>
          <div>
            {queue.phoneNumber}
          </div>
        </div>
    )
    
    return (
        <div className="header">
          <div>
            <button onClick={currentQueue}>Get current queue</button>
            <button onClick={nextQueue}>Next queue</button>
            <div>{state.currentQueue?.name? <QueueItem queue={state.currentQueue} /> : 'no queue'}</div>
          </div>
          <div>
          <form onSubmit={getQueue} noValidate>
              <div>
                <label htmlFor="name">Name</label>
                <input type='text' name='name' onChange={handleChange} noValidate />
              </div>
              <div>
                <label htmlFor="phoneNumber">phoneNumber</label>
                <input type='number' name='phoneNumber' onChange={handleChange} noValidate />
              </div>
              <button>get existing queue</button>
              <div>{state.foundQueue?.name? <QueueItem queue={state.foundQueue} /> : 'no queue'}</div>
            </form>
          </div>
        </div>
    )
}

export default StatusQueue;