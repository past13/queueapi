import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import StatusQueue from './components/StatusQueue';
import QueueList from './components/QueueList';
import AddQueue from './components/AddQueue';
import Queue from './queueApp/queue';
import { QueueContext } from './components/QueueContext';
import './App.css';

function App() {
  const [ queue, setQueue ] = useState(new Queue())

  return (
    <Router>
      <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Add Queue</Link>
          </li>
          <li>
            <Link to="/callqueue/">Call Queue</Link>
          </li>
          <li>
            <Link to="/queuelist/">Queue List</Link>
          </li>
        </ul>
      </nav>
      </div>
    <div className="App">
      <QueueContext.Provider value={{ queue, setQueue }}>
          <Route path="/" exact component={AddQueue} />
          <Route path="/callqueue/" component={StatusQueue} />
          <Route path="/queuelist/" component={QueueList} />
      </QueueContext.Provider>
    </div>
    </Router>
  );
}

export default App;
