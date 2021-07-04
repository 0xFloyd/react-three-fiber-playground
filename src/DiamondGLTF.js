import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import DiamondModel from './Assets/diamond.gltf'

const Diamond = () => {
  const gltf = useGLTF(DiamondModel)
  return <primitive object={gltf.scene} dispose={null} />
}

export default function DiamondGLTF() {
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
