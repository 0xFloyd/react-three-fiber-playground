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
  Sphere,
  shaderMaterial
} from '@react-three/drei'
import { RectAreaLightUniformsLib } from './Utils/RectAreaLightUniformsLib'
import earthImg from './Assets/earth.jpg'
import bumpImg from './Assets/bump.jpg'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import glsl from 'babel-plugin-glsl/macro'

extend({ OrbitControls })

RectAreaLightUniformsLib.init()

// const ColorShiftMaterial = shaderMaterial(
//   {
//     time: 0.25,
//     color: new THREE.Color(0.7, 1.6, 2.8)
//   },
//   // vertex shader
//   glsl`
//   varying vec2 vUv;
// void main() {
//   vUv = uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
// }`,
//   // fragment shader
//   glsl`#include <common>

//   uniform vec3 iResolution;
//   uniform float iTime;
//   uniform sampler2D iChannel0;

//   #define TIMESCALE 0.25
//   #define TILES 8
//   #define COLOR 0.7, 1.6, 2.8

//   void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
//   vec2 uv = fragCoord.xy / iResolution.xy;
//   uv.x *= iResolution.x / iResolution.y;

//   vec4 noise = texture2D(iChannel0, floor(uv * float(TILES)) / float(TILES));
//   float p = 1.0 - mod(noise.r + noise.g + noise.b + iTime * float(TIMESCALE), 1.0);
//   p = min(max(p * 3.0 - 1.8, 0.1), 2.0);

//   vec2 r = mod(uv * float(TILES), 1.0);
//   r = vec2(pow(r.x - 0.5, 2.0), pow(r.y - 0.5, 2.0));
//   p *= 1.0 - pow(min(1.0, 12.0 * dot(r, r)), 2.0);

//   fragColor = vec4(COLOR, 1.0) * p;
// }

// varying vec2 vUv;

// void main() {
//   mainImage(gl_FragColor, vUv * iResolution.xy);
// }`
// )

// extend({ ColorShiftMaterial })

const BasicBuilding = (props) => {
  return (
    <mesh {...props}>
      <boxGeometry {...props} />
      {/* <meshStandardMaterial
        attach="material"
        roughness={0.1}
        metalness={0}
        color="#242424"
      /> */}
      {/* <colorShiftMaterial attach="material" time={0.25} /> */}
    </mesh>
  )
}

export default function WelcomePageCity() {
  return (
    <Canvas
      className="canvas-black-background"
      camera={{ position: [0, 10, 30], fov: 50 }}
    >
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
      />
      <ambientLight intensity={1} />
      {/* <SpotLight /> */}

      <BasicBuilding position={[0, 25, 0]} args={[10, 50, 10]} />
      <gridHelper
        position={[0, 0, 0]}
        args={[200, 100, 'hotpink', 'hotpink']}
      />
    </Canvas>
  )
}
