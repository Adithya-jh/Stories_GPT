'use client';
import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Glitch, Bloom } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
// import {EffectComposer} from '@react-three/postprocessing'

import { useLoader } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment } from '@react-three/drei';

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
          position: [0.2, 0.5, 0.5],
        }}
      >
        <Environment preset="city" />
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

  let shouldRunFrame = true;
  useEffect(() => {
    const timeout = setTimeout(() => {
      shouldRunFrame = false;
    }, 3000);

    return () => clearTimeout(timeout);
  }, [shouldRunFrame]);

  const char1Animation = useAnimations(char1.animations, char1.scene);
  const char1Ref = useRef();

  useEffect(() => {
    const action1 = char1Animation.actions.course_loup;
    // {"course_loup":true}
    // {"course_cavalier":true}
    action1.play();
    char1Animation.actions.course_cavalier.play();

    window.setTimeout(() => {
      char1Animation.actions.pose_loup.play();
      char1Animation.actions.course_cavalier.stop();

      char1Animation.actions.pose_loup.crossFadeFrom(
        char1Animation.actions.course_loup,
        1
      );
    }, 2000);
  }, []);

  // useFrame((state, delta) => (char1Ref.current.position.z += delta));
  // {"pose_loup":true}
  useFrame((state, delta) => {
    if (shouldRunFrame) {
      char1Ref.current.position.z += delta; // Modify this line with your desired code
    }
  });

  return (
    <primitive
      object={char1.scene}
      ref={char1Ref}
      scale={1}
      position={[-0.8, -1.8, -5]}
    />
  );
};

export default CharAnimation;

// function Model(props) {
//     const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-wolf/model.gltf')
//     return <primitive object={scene} {...props} />
//   }
