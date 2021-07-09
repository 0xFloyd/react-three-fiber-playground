import * as THREE from 'three'
import React, { Suspense, useMemo, useRef, useState } from 'react'
import {
  Canvas,
  extend,
  useFrame,
  useLoader
} from '@react-three/fiber'
import {
  OrbitControls,
  useHelper,
  MeshDistortMaterial,
  Sphere
} from '@react-three/drei'
import { RectAreaLightUniformsLib } from './RectAreaLightUniformsLib'
import earthImg from '../Assets/earth.jpg'
import bumpImg from '../Assets/bump.jpg'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

extend({ OrbitControls })

RectAreaLightUniformsLib.init()

const Earth = () => {
  const ref = useRef()
  const [texture, bump] = useLoader(THREE.TextureLoader, [
    earthImg,
    bumpImg
  ])
  //   useFrame(({ clock }) => (ref.current.rotation.y += 0.01))
  useFrame(({ clock }) => {
    ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.8
    ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.8
    ref.current.rotation.y += 0.01
  })

  return (
    <group>
      <mesh ref={ref} position={[0, 5, 5]}>
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

function Plane(props) {
  return (
    <mesh>
      <boxBufferGeometry {...props} />
      <meshStandardMaterial
        attach="material"
        roughness={0.1}
        metalness={0}
        color="#808080"
      />
    </mesh>
  )
}

function SpotLight() {
  const spotLightRef = useRef()

  useHelper(spotLightRef, THREE.SpotLightHelper, 'cyan')

  return (
    <spotLight
      ref={spotLightRef}
      intensity={0.2}
      position={[5, 5, 5]}
    />
  )
}
function MyRectAreaLight(props) {
  const rectLightRef = useRef()

  // const rectLightHelper = new THREE.RectAreaLightHelper( rectLightRef );
  // How does this work?
  useHelper(rectLightRef, RectAreaLightHelper, props)
  return <rectAreaLight ref={rectLightRef} {...props} />
}

export default function StarterCanvas() {
  return (
    <Canvas
      className="canvas-black-background"
      camera={{ position: [0, 10, 10], fov: 50 }}
    >
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
      />
      <ambientLight intensity={1} />
      {/* <SpotLight /> */}
      <rectAreaLight
        intensity={3}
        position={[-3, 0, 0]}
        width={3}
        color="#ff0000"
      />
      <rectAreaLight
        intensity={3}
        position={[0, 0, 0]}
        width={3}
        color="#00ff00"
      />

      {/* <MyRectAreaLight
        intensity={5}
        position={[-4, 0, 0]}
        height={3}
        width={3}
        color="#ff0000"
      /> */}

      <Plane args={[10, 0.01, 10]} position={[0, -0.01, 0]} />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <Sphere visible position={[3, 3, 0]} args={[1, 16, 200]}>
        <MeshDistortMaterial
          color="#00A38D"
          attach="material"
          distort={0.5} // Strength, 0 disables the effect (default=1)
          speed={2} // Speed (default=1)
          roughness={0}
        />
      </Sphere>
      <gridHelper
        position={[0, -0.5, 0]}
        args={[20, 40, 'blue', 'hotpink']}
      />
    </Canvas>
  )
}
