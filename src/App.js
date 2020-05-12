import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { QueueContext } from './components/QueueContext';
import Queue from './queueApp/queue';
import AddQueue from './components/AddQueue';
import StatusQueue from './components/StatusQueue';
import QueueList from './components/QueueList';

import styled from 'styled-components'

function App() {
  const [queue, setQueue] = useState(new Queue())

  return (
    <Router>
      <NavContainer>
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
      </NavContainer>
    <ContentContainer>
      <QueueContext.Provider value={{ queue, setQueue }}>
          <Route path="/" exact component={AddQueue} />
          <Route path="/callqueue/" component={StatusQueue} />
          <Route path="/queuelist/" component={QueueList} />
      </QueueContext.Provider>
    </ContentContainer>
    </Router>
  );
}

export default App;

const ContentContainer = styled.div`
  margin: 50px;
`

const NavContainer = styled.div`
  width: 200px;

  li {
    padding: 5px;
    margin: 5px;
    width: 120px;
    height: 20px;
    list-style-type: none;
    text-decoration-line: none;
    border: 2px solid darkgray;
    background-color: silver;
    border-radius: 5px;
  }

  li a {
    text-decoration: none;
  }

  li:hover {
    color: orange;
    background-color: grey;
  }
`

