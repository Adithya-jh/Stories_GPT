import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Glitch, Bloom } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
// import {EffectComposer} from '@react-three/postprocessing'
import { useGLTF, useAnimations, Environment } from '@react-three/drei';

function WorldAnimation() {
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
        <Environment preset="city" />
        <AnimateTorus />
        <Animate2 />
        <AnimateStuffs />
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
    <mesh ref={torusRef} wrapperclass="torus" position={[0, 0, -3]}>
      <torusGeometry />
      {/* <torusKnotGeometry /> */}
      <meshBasicMaterial color={[1, 1.5, 2]} wireframe toneMapped={false} />
    </mesh>
  );
};

const Animate2 = () => {
  const torusRef = useRef();

  useFrame((state, delta) => (torusRef.current.rotation.y += delta * 0.2));
  return (
    <mesh ref={torusRef} wrapperclass="torus" scale={0.6} position={[0, 0, -3]}>
      <tetrahedronGeometry />
      {/* <torusKnotGeometry /> */}
      <meshBasicMaterial color={[2, 1.5, 1]} toneMapped={false} />
    </mesh>
  );
};

const AnimateStuffs = () => {
  const char1Ref = useRef();
  const char1Ref1 = useRef();
  const char1Ref2 = useRef();
  const char1RefR = useRef();

  const char1 = useGLTF(
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lamp-post/model.gltf'
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf'
  );
  const char2 = useGLTF(
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lamp-post/model.gltf'
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ankou-with-cart/model.gltf'
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bench-2/model.gltf'
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/rocks-forrest/model.gltf'
  );

  const char3 = useGLTF(
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lamp-post/model.gltf'
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ankou-with-cart/model.gltf'
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bench-2/model.gltf'
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf'
  );
  const charR = useGLTF(
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lamp-post/model.gltf'
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ankou-with-cart/model.gltf'
    // 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bench-2/model.gltf'
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/old-korrigan/model.gltf'
  );

  const char1Animation = useAnimations(charR.animations, charR.scene);
  //   const char1Ref = useRef();

  useEffect(() => {
    const action1 = char1Animation.actions.pose_vieux;
    action1.play();
  }, []);

  return (
    <>
      <primitive
        object={char1.scene}
        ref={char1Ref}
        scale={0.4}
        position={[-5, -1.8, -8]}
      />

      <primitive
        object={char2.scene}
        ref={char1Ref1}
        scale={1.1}
        position={[-4.7, -1.8, -6]}
      />
      {/* 
      <primitive
        object={char3.scene}
        ref={char1Ref2}
        scale={0.25}
        position={[12, -1.8, -8]}
      /> */}

      <primitive
        object={charR.scene}
        ref={char1RefR}
        scale={2}
        position={[-4, -1.4, -5]}
      />
    </>
  );
};

export default WorldAnimation;
