import React, { useContext, useState } from 'react';
import { QueueContext } from './QueueContext';

const QueueList = () => {
    const { queue } = useContext(QueueContext)
    const [state, setState] = useState({
        queueList: null,
        totalSize: 0
    })
    
    function getQueueList() {
        setState({
            queueList: Object.values(queue.getList()),
            totalSize: queue.size()
        })
    }

    function setSeedQueueList() {
        queue.seedQueueList()
    }

    function clearQueue() {
        queue.clear()
        setState({queueList: null})
    }

    function showQueueList() {
        return state.queueList.map( q => {
            return (
                <div key={q.id}>
                    <div>{q.date}</div>
                    <div>{q.name}</div>
                    <div>{q.phoneNumber}</div>
                </div>
            )
        })
    }

    return (
        <div>
            <button onClick={setSeedQueueList}>Set Seed queue list</button>
            <button onClick={getQueueList}>Get Queue list</button>
            <button onClick={clearQueue}>Clear queue</button>
            <div>
                {state.queueList? showQueueList() : []}
            </div>
            <div className="totalSize">{state.totalSize > 0 ? state.totalSize : ""}</div>
        </div>
    )
}

export default QueueList;