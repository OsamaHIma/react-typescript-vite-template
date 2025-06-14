// src/components/DoorBuilder.tsx
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { DoorStore } from "../stores/doorStore";
import { useSnapshot } from "valtio";

export function DoorBuilder() {
  const { doorColor, doorTexture, frameColor, frameTexture, doorType } =
    useSnapshot(DoorStore);

  const [doorTex, frameTex] = useLoader(TextureLoader, [
    doorTexture,
    frameTexture,
  ]);

  return (
    <group position={[0, -1, 0]}>
      {/* Frame */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2.2, 2.5, 0.2]} />
        <meshStandardMaterial map={frameTex} color={frameColor} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 1, 0.11]}>
        {doorType === "normal" ? (
          <boxGeometry args={[1.8, 2.1, 0.1]} />
        ) : (
          // Hospital door would be wider
          <boxGeometry args={[2.4, 2.1, 0.1]} />
        )}
        <meshStandardMaterial map={doorTex} color={doorColor} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.9, 1, 0.16]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
}
