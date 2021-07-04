import CanvasOne from 'CanvasOne'
import DiamondGLTF from 'DiamondGLTF'
import { PlaneSurface } from 'PlaneSurface'
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
        <nav>
          <Link to="/diamondgltf">GLTF Model</Link>
        </nav>
        <nav>
          <Link to="/planesurface">Plane Surface</Link>
        </nav>
      </div>
      <Switch>
        <Route path="/planesurface">
          <PlaneSurface />
        </Route>
        <Route path="/diamondgltf">
          <DiamondGLTF />
        </Route>
        <Route path="/">
          <CanvasOne />
        </Route>
      </Switch>
    </Router>
  )
}

// "module": "commonjs",
// "target": "es6"

export default App
