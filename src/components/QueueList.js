import React, { useContext, useState } from 'react';
import { QueueContext } from './QueueContext';

import styled from 'styled-components'

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
                <div className="queue-item" key={q.id}>
                    <div>{q.date}</div>
                    <div>{q.name}</div>
                    <div>{q.phoneNumber}</div>
                </div>
            )
        })
    }

    return (
        <QueueListContainer>
            <div className="form-wrapper">
                <div className="button-container">
                    <div className="submit-button" onClick={setSeedQueueList}>Set Seed queue list</div>
                    <div className="submit-button" onClick={getQueueList}>Get Queue list</div>
                    <div className="submit-button" onClick={clearQueue}>Clear queue</div>
                </div>
                <div className="queue-list">
                    {state.queueList? showQueueList() : []}
                </div>
                <div className="totalSize">{state.totalSize > 0 ? "Total queue: " + state.totalSize : ""}</div>
            </div>
        </QueueListContainer>
    )
}

export default QueueList;

const QueueListContainer = styled.div`
    .form-wrapper {
        display: flex;
        flex-direction: column;
        width: 280px;
        max-width: 90%;
        min-width: 340px;
        min-height: 400px;
        padding: 20px 40px;
        border-radius: 6px;
        box-shadow: 0px 8px 36px #d6d1d5;
        background-color: #fefefe;
    }

    .submit-button {
        margin-right: 10px;
        display: inline;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
        padding: 0.7em;
        border-radius: 4px;
        background-color: #22223B;
        color: #fefefe;
    }
    
    .submit-button:hover {
        background-color: #4A4E69;
        color: #fefefe;
    }

    .button-container {
        margin: 20px 0px 20px 0px;
    }

    .queue-item {
        padding: 5px;
        border: 1px solid grey;
        border-radius: 5px;
    }

    .queue-item div {
        margin: 5px 0px 5px 0px;
    }

    .queue-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
    }

    .totalSize {
        padding-top: 50px;
    }
`