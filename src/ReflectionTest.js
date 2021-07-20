import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Reflector,
  Text,
  useTexture,
  useGLTF,
  Stats
} from '@react-three/drei'

import SurfaceOne from './Assets/SurfaceImperfections003_1K_var1.jpg'
import SurfaceTwo from './Assets/SurfaceImperfections003_1K_Normal.jpg'
import videoSrc from './Assets/drei.mp4'
import textFont from './Assets/Inter-Bold.woff'
import ReflectionTestOverlay from './ReflectionTestOverlay'
import { Physics } from '@react-three/cannon'
import { Rig, Triangle } from 'GlowingTriangles/GlowingTriangles'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

function VideoText({ clicked, ...props }) {
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: videoSrc,
      crossOrigin: 'Anonymous',
      loop: true
    })
  )
  useEffect(() => void (true && video.play()), [video, clicked])
  return (
    <Text
      font={textFont}
      fontSize={3}
      letterSpacing={-0.06}
      {...props}
    >
      drei
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Text>
  )
}

function Ground() {
  const [floor, normal] = useTexture([SurfaceOne, SurfaceTwo])
  return (
    <Reflector
      resolution={512}
      args={[10, 10]}
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

function Intro({ start, set }) {
  const [vec] = useState(() => new THREE.Vector3())
  useEffect(() => setTimeout(() => set(true), 500), [])
  return useFrame((state) => {
    if (start) {
      state.camera.position.lerp(vec.set(0, 3, 16), 0.05)
      state.camera.lookAt(0, 0, 0)
    }
  })
}

export default function ReflectionTest() {
  const [clicked, setClicked] = useState(true)
  const [ready, setReady] = useState(false)
  const store = { clicked, setClicked, ready, setReady }
  return (
    <>
      <Canvas
        Concurrent
        gl={{ alpha: false }}
        pixelRatio={[1, 1.5]}
        camera={{ position: [0, 3, 100], fov: 15 }}
      >
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 15, 20]} />
        <group position={[0, -1, 0]}>
          <VideoText {...store} position={[0, 1.3, -2]} />
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-20, 0, -10]} intensity={0.7} />
        <Intro start={ready && clicked} set={setReady} />

        <Suspense fallback={null}>
          <Physics debug={{ color: 'black', scale: 1 }}>
            <group position={[0, -1, 0]}>
              {/* <VideoText {...store} position={[0, 1.3, -2]} /> */}
              <Ground />
            </group>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 10, 0]} intensity={0.3} />
            <directionalLight
              position={[-20, 0, -10]}
              intensity={0.7}
            />
            <Intro start={ready && clicked} set={setReady} />
            <Rig>
              <Triangle
                color="cyan"
                scale={0.009}
                position={[0, -2, -1]}
                rotation={[0, 0, Math.PI / 3]}
              />
            </Rig>
            <EffectComposer multisampling={8}>
              <Bloom
                kernelSize={1}
                luminanceThreshold={0}
                luminanceSmoothing={0.4}
                intensity={0.6}
              />
              <Bloom
                kernelSize={2}
                luminanceThreshold={0}
                luminanceSmoothing={0}
                intensity={0.5}
              />
            </EffectComposer>
          </Physics>
        </Suspense>
        <Stats showPanel={0} className="stats" />
      </Canvas>
    </>
  )
}
