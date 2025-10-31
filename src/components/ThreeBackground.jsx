import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTheme } from '../context/ThemeContext.jsx'

function WireframeSphere() {
  const meshRef = useRef()
  const { theme } = useTheme()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  const color = theme === 'dark' ? '#7c3aed' : '#3b82f6'
  const opacity = theme === 'dark' ? 0.15 : 0.1

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={opacity}
      />
    </mesh>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <WireframeSphere />
      </Canvas>
    </div>
  )
}
