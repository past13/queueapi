import React from 'react';

import styled from 'styled-components'

const QueueItem = ({queue}) => (
  <CurrentQueue>
    <div className="wrapper">
      <div className="column-data">
        <div>Date</div>
        <div>Name</div>
        <div>Phone number</div>
      </div>
      <div className="column-data">
        <div>{queue.date}</div>
        <div>{queue.name}</div>
        <div>{queue.phoneNumber}</div>
      </div>
    </div>
  </CurrentQueue>
)

export default QueueItem

const CurrentQueue = styled.div`
  .wrapper {
    display: grid;
    grid-template-columns: 120px 150px;

    .column-data div {
      padding-top: 2px;
      padding-bottom: 2px;
    }
  }
`
