import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { RectAreaLightUniformsLib } from '../Utils/RectAreaLightUniformsLib'
import earthImg from '../Assets/earth.jpg'
import bumpImg from '../Assets/bump.jpg'

RectAreaLightUniformsLib.init()

const Earth = () => {
  const [texture, bump] = useLoader(THREE.TextureLoader, [
    earthImg,
    bumpImg
  ])

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} />
        <meshStandardMaterial
          attach="material"
          map={texture}
          bumpMap={bump}
          bumpScale={0.05}
        />
      </mesh>
    </group>
  )
}
export default Earth
