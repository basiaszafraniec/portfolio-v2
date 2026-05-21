import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Shape({ geometry, position, color, opacity = 0.65, speed = 1 }) {
  const mesh = useRef()
  const offset = useRef(Math.random() * Math.PI * 2)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    mesh.current.rotation.x += 0.003 * speed
    mesh.current.rotation.y += 0.005 * speed
    mesh.current.position.y = position[1] + Math.sin(t * 0.4 * speed + offset.current) * 0.35
  })

  return (
    <mesh ref={mesh} position={position}>
      {geometry}
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0, 10] }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      {/* torusKnot — right side, purple */}
      <Shape
        geometry={<torusKnotGeometry args={[1, 0.28, 80, 16]} />}
        position={[4.8, 0.5, -1]}
        color="#FF5C35"
        opacity={0.7}
        speed={0.7}
      />
      {/* icosahedron — left lower, purple */}
      <Shape
        geometry={<icosahedronGeometry args={[1.5, 0]} />}
        position={[-4.5, -1.2, -3]}
        color="#FF5C35"
        opacity={0.45}
        speed={0.5}
      />
      {/* torus — upper area, cream */}
      <Shape
        geometry={<torusGeometry args={[0.9, 0.28, 16, 60]} />}
        position={[1.5, 3.8, -5]}
        color="#F5F2EC"
        opacity={0.35}
        speed={1.1}
      />
      {/* octahedron — left upper, cream */}
      <Shape
        geometry={<octahedronGeometry args={[1.1]} />}
        position={[-2, 2.5, -4]}
        color="#F5F2EC"
        opacity={0.3}
        speed={0.9}
      />
    </Canvas>
  )
}
