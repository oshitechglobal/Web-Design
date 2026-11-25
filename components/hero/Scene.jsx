"use client";

import Room from "./Room";
import Equipment from "./Equipment";
import CameraRig from "./CameraRig";
import Particles from "./Particles";
import Annotations from "./Annotations";

export default function Scene({ progressRef }) {
  return (
    <>
      <fog attach="fog" args={["#03060f", 6, 20]} />
      <color attach="background" args={["#03060f"]} />

      <ambientLight intensity={0.35} color="#1c3a86" />
      <directionalLight
        position={[4, 8, 4]}
        intensity={1.4}
        color="#dfeeff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[-3, 2.5, -1]} intensity={8} color="#2dd4ee" distance={9} decay={2} />
      <pointLight position={[4, 1.5, -3]} intensity={3} color="#e8972f" distance={6} decay={2} />

      <Room />
      <Equipment progressRef={progressRef} />
      <Particles />
      <Annotations progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
    </>
  );
}
