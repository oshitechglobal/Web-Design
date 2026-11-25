"use client";

import Room from "./Room";
import Equipment from "./Equipment";
import CameraRig from "./CameraRig";
import Particles from "./Particles";
import Annotations from "./Annotations";

export default function Scene({ progressRef }) {
  return (
    <>
      <fog attach="fog" args={["#0a1428", 9, 24]} />
      <color attach="background" args={["#0a1428"]} />

      <ambientLight intensity={0.85} color="#3a5a9e" />
      <hemisphereLight args={["#9fd3f5", "#0b1a3d", 0.6]} />
      <directionalLight
        position={[4, 8, 4]}
        intensity={2.6}
        color="#eef6ff"
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
      <pointLight position={[-3, 2.5, -1]} intensity={12} color="#2dd4ee" distance={10} decay={2} />
      <pointLight position={[4, 1.5, -3]} intensity={5} color="#e8972f" distance={7} decay={2} />

      <Room />
      <Equipment progressRef={progressRef} />
      <Particles />
      <Annotations progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
    </>
  );
}
