'use client';
import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Glitch, Bloom } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
// import {EffectComposer} from '@react-three/postprocessing'

import earth from '@/public/earth.jpeg';

import { useLoader } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment } from '@react-three/drei';

function FlowAnimation() {
  //   useFrame((state, delta) => (mesh.current.rotation.x += delta));

  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0.2, 0.5, 0.5],
        }}
      >
        <Environment preset="city" />
        <AnimateShape />
        {/* <AnimateShape2 /> */}
        <EffectComposer multisampling={0}>
          {/* <Glitch
            delay={[1, 10]}
            duration={[0.5, 0.6]}
            // mode={GlitchMode.CONSTANT_MILD}
          /> */}
          <Bloom mipmapBlur />
        </EffectComposer>
      </Canvas>
    </>
  );
}

const AnimateShape = () => {
  const torusRef = useRef();
  //   const colorMap = useLoader(
  //     TextureLoader,
  //     'https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg'
  //   );
  useFrame((state, delta) => (torusRef.current.rotation.y += delta * 0.2));
  return (
    <mesh ref={torusRef} wrapperclass="torus" position={[0.5, -2, -2]}>
      {/* <sphereGeometry /> */}
      {/* <dodecahedronGeometry /> */}
      <tubeGeometry />
      {/* <meshNormalMaterial color={[1.5, 2, 1]} wireframe /> */}
      <meshBasicMaterial color={[1.5, 2, 1]} wireframe toneMapped={false} />
      {/* <meshStandardMaterial color={[1.5, 2, 1]} wireframe toneMapped={false} /> */}
      {/* <meshStandardMaterial
        // map={colorMap}
        color={[1.5, 2, 1]}
        wireframe
        toneMapped={false}
      /> */}
    </mesh>
  );
};
const AnimateShape2 = () => {
  const torusRef = useRef();
  //   const colorMap = useLoader(
  //     TextureLoader,
  //     'https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg'
  //   );
  useFrame((state, delta) => (torusRef.current.rotation.y += delta * 0.2));
  return (
    <mesh ref={torusRef} wrapperclass="torus" position={[-0.5, -1, -3]}>
      {/* <sphereGeometry /> */}
      {/* <dodecahedronGeometry /> */}
      <tubeGeometry />
      {/* <meshNormalMaterial color={[1.5, 2, 1]} wireframe /> */}
      <meshBasicMaterial color={[1.5, 2, 1]} wireframe toneMapped={false} />
      {/* <meshStandardMaterial color={[1.5, 2, 1]} wireframe toneMapped={false} /> */}
      {/* <meshStandardMaterial
        // map={colorMap}
        color={[1.5, 2, 1]}
        wireframe
        toneMapped={false}
      /> */}
    </mesh>
  );
};

export default FlowAnimation;

// function Model(props) {
//     const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-wolf/model.gltf')
//     return <primitive object={scene} {...props} />
//   }
