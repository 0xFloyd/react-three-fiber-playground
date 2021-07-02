import CanvasOne from 'CanvasOne'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div
        style={{
          display: 'block',
          position: 'fixed',
          width: '100%',
          height: '60px',
          top: '0px',
          backgroundColor: 'rgba(255, 0, 0, 0.3)'
        }}
      >
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </div>
      <Switch>
        <Route path="/">
          <CanvasOne />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
