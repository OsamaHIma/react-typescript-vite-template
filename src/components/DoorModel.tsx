import { useSnapshot } from 'valtio';
import { DoorStore } from '../stores/doorStore';
import * as THREE from 'three';

import { useMemo } from 'react';

export default function DoorModel() {
  const state = useSnapshot(DoorStore);

  // Create door geometry based on type
  const doorGeometry = useMemo(() => {
    switch (state.doorModel) {
      case 'LinePivot':
        return (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.8, 2.2, 0.08]} />
            <meshPhysicalMaterial 
              color={state.doorColor}
              roughness={0.2}
              metalness={0.3}
              clearcoat={0.5}
              clearcoatRoughness={0.1}
              envMapIntensity={1}
            />
            {/* Decorative lines */}
            <group position={[0, 0, 0.041]}>
              {[-0.4, 0, 0.4].map((x, i) => (
                <mesh key={i} position={[x, 0, 0]}>
                  <boxGeometry args={[0.05, 2, 0.01]} />
                  <meshPhysicalMaterial 
                    color="#333333"
                    metalness={0.9}
                    roughness={0.1}
                    clearcoat={1}
                  />
                </mesh>
              ))}
            </group>
          </mesh>
        );

      case 'FrameGlass':
        return (
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.8, 2.2, 0.08]} />
              <meshPhysicalMaterial 
                color={state.doorColor}
                roughness={0.2}
                metalness={0.3}
                clearcoat={0.5}
                clearcoatRoughness={0.1}
                envMapIntensity={1}
              />
            </mesh>
            {/* Glass panel */}
            <mesh position={[0, 0.3, 0.041]}>
              <boxGeometry args={[1.4, 1.4, 0.02]} />
              <meshPhysicalMaterial
                color="#87CEEB"
                transparent={true}
                opacity={0.2}
                transmission={0.95}
                thickness={0.5}
                roughness={0}
                ior={1.5}
                envMapIntensity={1}
              />
            </mesh>
          </group>
        );

      case 'Hospital':
        return (
          <group>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.8, 2.2, 0.08]} />
              <meshPhysicalMaterial 
                color={state.doorColor}
                roughness={0.2}
                metalness={0.3}
                clearcoat={0.5}
                clearcoatRoughness={0.1}
                envMapIntensity={1}
              />
            </mesh>
            {/* Window */}
            <mesh position={[0, 0.5, 0.041]}>
              <boxGeometry args={[1.2, 0.8, 0.02]} />
              <meshPhysicalMaterial
                color="#87CEEB"
                transparent={true}
                opacity={0.2}
                transmission={0.95}
                thickness={0.5}
                roughness={0}
                ior={1.5}
                envMapIntensity={1}
              />
            </mesh>
            {/* Kick plate */}
            <mesh position={[0, -0.9, 0.041]}>
              <boxGeometry args={[1.6, 0.3, 0.01]} />
              <meshPhysicalMaterial 
                color="#C0C0C0"
                metalness={0.9}
                roughness={0.1}
                clearcoat={1}
                envMapIntensity={1}
              />
            </mesh>
          </group>
        );

      default:
        return (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.8, 2.2, 0.08]} />
            <meshPhysicalMaterial 
              color={state.doorColor}
              roughness={0.2}
              metalness={0.3}
              clearcoat={0.5}
              clearcoatRoughness={0.1}
              envMapIntensity={1}
            />
          </mesh>
        );
    }
  }, [state.doorModel, state.doorColor]);

  return (
    <group position={[0, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Door Frame */}
      <mesh castShadow receiveShadow position={[0, 0, -0.02]}>
        <boxGeometry args={[2, 2.4, 0.12]} />
        <meshStandardMaterial 
          color={state.frameColor} 
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Door */}
      {doorGeometry}

      {/* Handle */}
      {state.handle && (
        <group position={[0.8, 0, 0.04]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.15]} />
            <meshStandardMaterial 
              color={state.handleColor.toLowerCase()} 
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      )}

      {/* Ground Plane */}
      <mesh 
        receiveShadow 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.2, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#f0f0f0"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
