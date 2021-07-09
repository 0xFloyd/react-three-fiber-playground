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
import StarterCanvas from 'Utils/StarterCanvas'
import { GlowingTriangles } from './GlowingTriangles/GlowingTriangles'
import ReflectionTest from './ReflectionTest'

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
        <nav style={{ display: 'inline-block', marginRight: '5px' }}>
          <Link to="/">Home</Link>
        </nav>
        <nav style={{ display: 'inline-block', marginRight: '5px' }}>
          <Link to="/startercanvas">Start Canvas</Link>
        </nav>
        <nav style={{ display: 'inline-block', marginRight: '5px' }}>
          <Link to="/diamondgltf">GLTF Model</Link>
        </nav>
        <nav style={{ display: 'inline-block', marginRight: '5px' }}>
          <Link to="/planesurface">Plane Surface</Link>
        </nav>
        <nav style={{ display: 'inline-block', marginRight: '5px' }}>
          <Link to="/reflectiontest">Reflection</Link>
        </nav>
        <nav style={{ display: 'inline-block', marginRight: '5px' }}>
          <Link to="/glowingtriangles">Glowing Triangle</Link>
        </nav>
      </div>
      <Switch>
        <Route path="/startercanvas">
          <StarterCanvas />
        </Route>
        <Route path="/glowingtriangles">
          <GlowingTriangles />
        </Route>
        <Route path="/reflectiontest">
          <ReflectionTest />
        </Route>
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
