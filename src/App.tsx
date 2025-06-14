import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { CustomizationPanel } from "./components/CustomizationPanel";
import DoorModel from "./components/DoorModel";
import Loader from "./components/Loader";

export default function App() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Customization */}
      <div className="w-[400px] bg-white h-screen overflow-y-auto">
        <CustomizationPanel />
      </div>
      
      {/* Right Panel - 3D View */}
      <div className="flex-1 relative bg-gray-100">
        <Canvas 
          shadows 
          camera={{ position: [3, 0, 3], fov: 50 }}
          gl={{ 
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1
          }}
        >
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.7} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1.5}
              castShadow
              shadow-mapSize={[2048, 2048]}
            >
              <orthographicCamera 
                attach="shadow-camera"
                args={[-10, 10, 10, -10, 0.1, 50]}
              />
            </directionalLight>
            <directionalLight 
              position={[-10, -10, -5]} 
              intensity={0.2}
            />
            <Environment preset="apartment" background blur={0.6} />
            <DoorModel />
            <OrbitControls 
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2 - 0.2}
              maxPolarAngle={Math.PI / 2 + 0.2}
              minAzimuthAngle={-0.2}
              maxAzimuthAngle={0.2}
            />
            <Environment preset="apartment" />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
