import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics, useBox, useSphere } from '@react-three/cannon'

const SPEED = 5
const keys = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'jump'
}
const moveFieldByKey = (key) => keys[key]

const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()
const speed = new THREE.Vector3()

const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  })
  useEffect(() => {
    const handleKeyDown = (e) =>
      setMovement((oldMovement) => ({
        ...oldMovement,
        [moveFieldByKey(e.code)]: true
      }))
    const handleKeyUp = (e) =>
      setMovement((oldMovement) => ({
        ...oldMovement,
        [moveFieldByKey(e.code)]: false
      }))
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    // useEffect(() => {
    //   performSideEffect();
    //   return cleanUpFunction;
    // }, []);

    // useEffect/React will run when it is time to clean up:
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  return movement
}

export const Player = (props) => {
  const characterRef = useRef()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0],
    ...props
  }))
  const { forward, backward, left, right, jump } = usePlayerControls()
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])

  // update velocity on change
  useEffect(
    () => api.velocity.subscribe((v) => (velocity.current = v)),
    []
  )

  useFrame((state) => {
    ref.current.getWorldPosition(camera.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)
    speed.fromArray(velocity.current)

    characterRef.current.children[0].rotation.x =
      THREE.MathUtils.lerp(
        characterRef.current.children[0].rotation.x,
        Math.sin(
          (speed.length() > 1) * state.clock.elapsedTime * 10
        ) / 6,
        0.1
      )

    // doesnt seem to do anything
    characterRef.current.rotation.copy(camera.rotation)

    // moves the visible character
    characterRef.current.position
      .copy(camera.position)
      .add(camera.getWorldDirection(rotation).multiplyScalar(1))

    // camera.position.set(
    //   characterRef.current.position.x - 5,
    //   characterRef.current.position.y + 5,
    //   characterRef.current.position.z + 5
    // )

    var characterPos = new THREE.Vector3(
      characterRef.current.position.x,
      characterRef.current.position.y + 10,
      characterRef.current.position.z + 30
    )

    let camPos = new THREE.Vector3(
      camera.position.x,
      camera.position.y,
      camera.position.z
    )

    camPos.lerp(characterPos, 0.033)
    camera.position.copy(characterPos)
    camera.lookAt(characterRef.current.position)

    api.velocity.set(direction.x, velocity.current[1], direction.z)
  })

  return (
    <>
      <mesh />
      <group ref={characterRef} scale={1}>
        <Person />
      </group>
    </>
  )
}

function Person(props) {
  return (
    <mesh castShadow>
      <sphereBufferGeometry />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}
