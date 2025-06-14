import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import DoorModel from './DoorModel'

export default function SceneCanvas({ config }: { config: any }) {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <DoorModel config={config} />
      <OrbitControls />
      <Environment preset="city" background />
    </Canvas>
  )
}
