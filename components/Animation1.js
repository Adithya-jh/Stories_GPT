import { createRoot } from 'react-dom/client';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Glitch, Bloom } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
// import {EffectComposer} from '@react-three/postprocessing'

function Animation1() {
  //   useFrame((state, delta) => (mesh.current.rotation.x += delta));
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, 0],
        }}
      >
        <AnimateTorus />
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

const AnimateTorus = () => {
  const torusRef = useRef();
  useFrame((state, delta) => (torusRef.current.rotation.y += delta * 0.2));
  return (
    <mesh ref={torusRef} wrapperclass="torus" position={[0, 0, 0]}>
      <torusKnotGeometry />
      <meshBasicMaterial color={[1.5, 1, 4]} wireframe toneMapped={false} />
    </mesh>
  );
};

export default Animation1;
