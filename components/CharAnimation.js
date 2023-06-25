'use client';
import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Glitch, Bloom } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
// import {EffectComposer} from '@react-three/postprocessing'

import { useLoader } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

function CharAnimation() {
  //   useFrame((state, delta) => (mesh.current.rotation.x += delta));
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [1, 1, 1],
        }}
      >
        <AnimateCharacter />
        {/* <EffectComposer multisampling={0}> */}
        {/* <Glitch
            delay={[1, 10]}
            duration={[0.5, 0.6]}
            // mode={GlitchMode.CONSTANT_MILD}
          /> */}
        {/* <Bloom mipmapBlur /> */}
        {/* </EffectComposer> */}
      </Canvas>
    </>
  );
}

const AnimateCharacter = () => {
  const char1 = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-wolf/model.gltf'
  );

  const char1Animation = useAnimations(char1.animations, char1.scene);

  //   useEffect(() => {
  //     const action = char1Animation.actions.pose_cavalier;
  //     action.play();
  //   }, []);

  //   useFrame((state, delta) => (torusRef.current.rotation.y += delta * 0.2));
  return <primitive object={char1.scene} scale={4} />;
};

export default CharAnimation;

// function Model(props) {
//     const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-wolf/model.gltf')
//     return <primitive object={scene} {...props} />
//   }
