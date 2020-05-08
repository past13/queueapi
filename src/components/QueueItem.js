import React from 'react';

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

export default QueueItem
