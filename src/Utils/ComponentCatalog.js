// @ts-nocheck
/* eslint-disable no-undef */


// ===================================================================================================================
// orbit controls and limit camera angles
//
;<orbitControls
  enableZoom={false}
  maxPolarAngle={Math.PI / 3}
  minPolarAngle={Math.PI / 3}
  args={[camera, gl.domElement]}
/>
// ===================================================================================================================
// 
// 
// 
// ===================================================================================================================
// Rotate/ move whole group of objects 
//
function Rotate(props) {
  const ref = useRef()
  useFrame((state) => (ref.current.rotation.y = state.clock.elapsedTime))
  return <group ref={ref} {...props} />
}

<Rotate position-y={-0.5} scale={0.2}>
          <Suspense fallback={<Model url="/bust-lo-draco.glb" />}>
            <Model url="/bust-hi.glb" />
          </Suspense>
// ===================================================================================================================
// 
// 
// 
// ===================================================================================================================