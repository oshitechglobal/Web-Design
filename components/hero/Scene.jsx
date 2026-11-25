"use client";

import Room from "./Room";
import Equipment from "./Equipment";
import CameraRig from "./CameraRig";
import Particles from "./Particles";
import Annotations from "./Annotations";

export default function Scene({ progressRef }) {
  return (
    <>
      <fog attach="fog" args={["#2b3140", 5, 19]} />
      <color attach="background" args={["#242a36"]} />

      <ambientLight intensity={0.7} color="#b6bac5" />
      <hemisphereLight args={["#c7ccd6", "#2b3140", 0.55]} />
      <directionalLight
        position={[4, 8, 4]}
        intensity={2.2}
        color="#eef1f6"
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
      <pointLight position={[-3, 2.5, -1]} intensity={7} color="#9fe8f0" distance={10} decay={2} />
      <pointLight position={[4, 1.5, -3]} intensity={3} color="#d9a45a" distance={7} decay={2} />

      <Room />
      <Equipment progressRef={progressRef} />
      <Particles />
      <Annotations progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
    </>
  );
}
