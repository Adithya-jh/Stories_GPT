import { createRoot } from 'react-dom/client';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Glitch, Bloom } from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';

import { Physics, RigidBody } from '@react-three/rapier';
// import {EffectComposer} from '@react-three/postprocessing'

function LoginAnimations() {
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
        {/* <AnimateTorus /> */}
        {/* <AnimateTorus2 /> */}
        <AnimateBox />
        <AnimateBall />
        <AnimateBall2 />
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
    <mesh ref={torusRef} wrapperclass="torus" position={[-4, 2, -6]}>
      <torusKnotGeometry />
      <meshBasicMaterial color={[1.5, 2, 1]} wireframe toneMapped={false} />
    </mesh>
  );
};

const AnimateTorus2 = () => {
  const torusRef = useRef();
  useFrame((state, delta) => (torusRef.current.rotation.y += delta * 0.2));
  return (
    <mesh ref={torusRef} wrapperclass="torus" position={[4, -3, -6]}>
      <torusKnotGeometry />
      {/* <boxGeometry /> */}
      <meshBasicMaterial color={[1.5, 3, 2]} wireframe toneMapped={false} />
    </mesh>
  );
};

const AnimateBox = () => {
  const torusRef = useRef();
  useFrame((state, delta) => (torusRef.current.rotation.y += delta * 0.2));
  return (
    <Physics>
      <RigidBody type="fixed">
        <mesh ref={torusRef} wrapperclass="torus" position={[0, 0, -5]}>
          {/* <torusKnotGeometry /> */}
          <boxGeometry />
          <meshBasicMaterial color={[1.5, 2, 1]} wireframe toneMapped={false} />
        </mesh>
      </RigidBody>
    </Physics>
  );
};

const AnimateBall = () => {
  let shouldRunFrame = true;
  let shouldRunFrame2 = true;

  useEffect(() => {
    const timeout = setTimeout(() => {
      shouldRunFrame2 = false;
    }, 5800);

    return () => clearTimeout(timeout);
  }, [shouldRunFrame2]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      shouldRunFrame = false;
    }, 4700);

    return () => clearTimeout(timeout);
  }, [shouldRunFrame]);

  const torusRef = useRef();
  useFrame((state, delta) => {
    if (shouldRunFrame) {
      torusRef.current.position.x += delta;
      //   torusRef.current.position.y += delta;
    } else if (shouldRunFrame2) {
      torusRef.current.position.x += delta;
      torusRef.current.position.y += delta * 1.3;
    }
  });
  return (
    <mesh
      ref={torusRef}
      wrapperclass="torus"
      scale={0.1}
      position={[-5, 0, -5]}
    >
      {/* <torusKnotGeometry /> */}

      <sphereGeometry />
      <meshBasicMaterial color={[1.5, 4, 3]} toneMapped={false} />
    </mesh>
  );
};

const AnimateBall2 = () => {
  let shouldRunFrame = true;
  let shouldRunFrame2 = true;

  useEffect(() => {
    const timeout = setTimeout(() => {
      shouldRunFrame2 = false;
    }, 5800);

    return () => clearTimeout(timeout);
  }, [shouldRunFrame2]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      shouldRunFrame = false;
    }, 4700);

    return () => clearTimeout(timeout);
  }, [shouldRunFrame]);

  const torusRef = useRef();
  useFrame((state, delta) => {
    if (shouldRunFrame) {
      torusRef.current.position.x -= delta;
      //   torusRef.current.position.y += delta;
    } else if (shouldRunFrame2) {
      torusRef.current.position.x -= delta;
      torusRef.current.position.y += delta * 1.3;
    }
  });
  return (
    <mesh ref={torusRef} wrapperclass="torus" scale={0.1} position={[5, 0, -5]}>
      {/* <torusKnotGeometry /> */}

      <sphereGeometry />
      <meshBasicMaterial color={[1.5, 2, 3]} toneMapped={false} />
    </mesh>
  );
};

export default LoginAnimations;
