import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from './Utils/GLTFLoader'
import {
  OrbitControls,
  Html,
  draco,
  useGLTF
} from '@react-three/drei'

import DiamondModel from './Assets/diamond.gltf'
import { DRACOLoader } from 'three-stdlib'

const Box = (props) => {
  // reference gives us access to mesh
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // subscribe component to render loop

  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'red' : 'blue'} />
    </mesh>
  )
}

const Diamond = () => {
  const gltf = useGLTF(DiamondModel)
  return <primitive object={gltf.scene} dispose={null} />
}

export default function CityScape() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Diamond />
        </Suspense>
      </Canvas>
    </>
  )
}
