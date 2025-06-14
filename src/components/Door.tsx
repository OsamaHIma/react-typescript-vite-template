import React, { useRef } from "react";

import * as THREE from "three";
import type { DoorPatternType, DoorProps } from "../types";

function Door({ doorPattern, frameColor, handleColor }: DoorProps) {
  // Use textures for the door patterns
  const doorPatterns: Record<DoorPatternType, string> = {
    plain: "/api/placeholder/512/512",
    panels: "/api/placeholder/512/512",
    glass: "/api/placeholder/512/512",
  };

  // Door dimensions
  const width = 3;
  const height = 7;
  const thickness = 0.2;

  // Frame dimensions
  const frameWidth = 0.4;
  const frameDepth = 0.3;

  // Simple door animation
  const doorGroup = useRef<THREE.Group>(null);

  return (
    <group ref={doorGroup}>
      {/* Door Frame */}
      <group>
        {/* Top Frame */}
        <mesh position={[0, height / 2 + frameWidth / 2, 0]}>
          <boxGeometry
            args={[width + frameWidth * 2, frameWidth, frameDepth]}
          />
          <meshStandardMaterial color={frameColor} />
        </mesh>

        {/* Left Frame */}
        <mesh position={[-width / 2 - frameWidth / 2, 0, 0]}>
          <boxGeometry
            args={[frameWidth, height + frameWidth * 2, frameDepth]}
          />
          <meshStandardMaterial color={frameColor} />
        </mesh>

        {/* Right Frame */}
        <mesh position={[width / 2 + frameWidth / 2, 0, 0]}>
          <boxGeometry
            args={[frameWidth, height + frameWidth * 2, frameDepth]}
          />
          <meshStandardMaterial color={frameColor} />
        </mesh>

        {/* Bottom Frame / Threshold */}
        <mesh position={[0, -height / 2 - frameWidth / 2, 0]}>
          <boxGeometry
            args={[width + frameWidth * 2, frameWidth, frameDepth]}
          />
          <meshStandardMaterial color={frameColor} />
        </mesh>
      </group>

      {/* Door */}
      <group>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[width, height, thickness]} />
          <meshStandardMaterial
            color="#ffffff"
            map={doorPattern !== "plain" ? undefined : null}
          />
        </mesh>

        {/* Door Handle */}
        <group position={[width / 2 - 0.5, 0, thickness / 2 + 0.05]}>
          <mesh>
            <cylinderGeometry
              args={[0.05, 0.05, 0.6, 16]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <meshStandardMaterial
              color={handleColor}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={handleColor}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Add door pattern customization based on selection */}
        {doorPattern === "panels" && (
          <>
            <mesh position={[0, 0, thickness / 2 + 0.01]}>
              <boxGeometry args={[width - 0.4, height - 0.4, 0.05]} />
              <meshStandardMaterial color="#f5f5f5" />
            </mesh>
            <mesh position={[0, height / 4, thickness / 2 + 0.02]}>
              <boxGeometry args={[width - 0.8, height / 2 - 0.4, 0.05]} />
              <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            <mesh position={[0, -height / 4, thickness / 2 + 0.02]}>
              <boxGeometry args={[width - 0.8, height / 2 - 0.4, 0.05]} />
              <meshStandardMaterial color="#e0e0e0" />
            </mesh>
          </>
        )}

        {doorPattern === "glass" && (
          <>
            <mesh position={[0, height / 4, thickness / 2 + 0.01]}>
              <boxGeometry args={[width - 1, height / 2, 0.05]} />
              <meshStandardMaterial
                color="#a0d8ef"
                transparent={true}
                opacity={0.6}
                metalness={0.2}
                roughness={0}
              />
            </mesh>
            <mesh position={[0, height / 4, thickness / 2 + 0.02]}>
              <boxGeometry args={[width - 1.2, height / 2 - 0.2, 0.01]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent={true}
                opacity={0.2}
                metalness={0.9}
                roughness={0}
              />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
}

export default Door;