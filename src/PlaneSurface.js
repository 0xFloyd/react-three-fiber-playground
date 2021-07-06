import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Reflector,
  Stats,
  useTexture
} from '@react-three/drei'
import { Physics, useBox, useSphere } from '@react-three/cannon'
import { Player } from './Character'
import { Rig, Triangle } from './GlowingTriangles/GlowingTriangles'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

function Plane(props) {
  const [ref] = useBox(() => ({
    ...props
  }))
  const [floor, normal] = useTexture([
    '/SurfaceImperfections003_1K_var1.jpg',
    '/SurfaceImperfections003_1K_Normal.jpg'
  ])
  return (
    <mesh receiveShadow ref={ref}>
      <boxBufferGeometry {...props} />
      {/* <meshStandardMaterial /> */}
    </mesh>
  )
}

// function Cube(props) {
//   const [ref] = useBox(() => ({ mass: 1, ...props }))
//   return (
//     <mesh castShadow ref={ref}>
//       <boxGeometry />
//       <meshStandardMaterial color="orange" />
//     </mesh>
//   )
// }

function Ground() {
  const [floor, normal] = useTexture([
    '/SurfaceImperfections003_1K_var1.jpg',
    '/SurfaceImperfections003_1K_Normal.jpg'
  ])

  return (
    <Reflector
      position={[0, -0.5, 0]}
      resolution={512}
      args={[100, 100]}
      mirror={0.4}
      mixBlur={8}
      mixStrength={1}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      blur={[400, 100]}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[1, 1]}
          {...props}
        />
      )}
    </Reflector>
  )
}

export const PlaneSurface = () => {
  return (
    <>
      {/* dpr = device pixel ratio */}
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [-5, 5, 5], fov: 50 }}
        concurrent
        gl={{ alpha: false }}
      >
        {/* <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        /> */}
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 50, 100]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-20, 0, -10]} intensity={0.7} />
        <Physics debug={{ color: 'black', scale: 1 }}>
          <Player />
          <Ground />
          {/* <Cube position={[0, 0, 0]} /> */}
          <Plane args={[100, 1, 100]} position={[0, -1.01, 0]} />
          <Rig>
            {' '}
            <Triangle
              color="cyan"
              scale={0.009}
              position={[2, 0, -2]}
              rotation={[0, 0, Math.PI / 3]}
            />
          </Rig>
          <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
            <Bloom
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
          </EffectComposer>
        </Physics>
      </Canvas>
      {/* <Stats /> */}
    </>
  )
}
