'use client';
import React, { useState, useContext, useRef, useEffect } from 'react';
import PageWrapper from '@/components/PageWrapper';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';

import Animation1 from '@/components/Animation1';
import { Canvas, useFrame } from '@react-three/fiber';

import FlowAnimation from '@/components/FlowAnimation';

import { createContext } from 'react';
import Header from '@/components/Header';
import Premises from '@/components/Premises';
import { motion } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { useSession } from 'next-auth/react';
import { db } from '@/firebase';

export let api_out = 'Initial';

// export const ApiContext = createContext();

function Premise() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const textRef = useRef(null);
  useEffect(() => {
    const textElement = textRef.current;
    const text = textElement.textContent;
    const textLength = text.length;
    const typingSpeed = 50; // Adjust typing speed (in milliseconds)

    let i = 0;
    textElement.textContent = '';

    const type = () => {
      if (i < textLength) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, typingSpeed);
      }
    };

    type();
  }, []);
  return (
    <>
      <PageWrapper>
        <div className="mt-[200px] flex flex-col space-between w-[100vw] fixed">
          <div className="text-3xl text-[#69eff1]">The Flow of Stories.GPT</div>

          <div className="flex">
            {isSidebarOpen && <Premises />}

            {!isSidebarOpen ? (
              <motion.button
                initial={{ x: 40 }}
                animate={{ x: 20 }}
                transition={{ delay: 0, type: 'spring', stiffness: 100 }}
                className="absolute ml-[20px] flex mt-[200px] z-10 cursor-pointer"
                onClick={toggleSidebar}
              >
                Your Premises
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </motion.button>
            ) : (
              <button
                className="absolute ml-[250px] text-white flex mt-[200px] z-20 cursor-pointer"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}

            <div className="absolute top-[140px] z-[-1] flex w-[40%] ml-[1100px] justify-center items-start">
              {/* <FlowAnimation /> */}
              {/* <Animation1 /> */}

              <img
                src="./fc.png"
                alt="poster"
                className="w-[450px] h-[450px] brightness-[15%]"
              />
            </div>

            {/* <div className="absolute top-[140px] z-[-1] flex w-[38%] ml-[-20px]  items-start">
          

              <img
                src="./rt.jpeg"
                alt="poster"
                className="w-[350px] h-[450px] brightness-[10%]"
              />
            </div> */}

            <div className="absolute flex flex-col  m-[10px] w-[100%] ml-[140px]">
              <div className="w-[80%] h-[100%] flex flex-col justify-center items-center">
                <div className="mt-[20px]">
                  The creative process of Stories.GPT commences with the
                  establishment of a compelling premise. This initial concept
                  serves as the foundation for subsequent character development
                  and the construction of intricate story worlds.
                </div>

                <div className="mt-[40px]">
                  PREMISE -{'>'} CHARACTER DEVELOPMENT -{'>'} WORLD BUILDING -
                  {'>'} STORY GENERATION -{'>'} SCREENPLAY GENERATION
                </div>

                <div className="mt-[50px]">
                  <div className="text-[#69eff1]">Well, What is a premise?</div>
                  <div>
                    In storytelling, a premise is the foundation of a story,
                    encapsulating its central conflict, characters, and overall
                    narrative direction.
                  </div>
                </div>

                <div className="mt-[80px]  typingAnimation text-gray-600 italic">
                  <span ref={textRef} className="typingText w-[100%]">
                    EG - In a dystopian future, a skilled hacker must infiltrate
                    a high-tech corporation's secret facility to expose their
                    sinister plans that threaten humanity's freedom and
                    existence.
                  </span>
                </div>
                {/* 
                <div className="mt-[60px] typingAnimation">
            <span ref={textRef} className="typingText w-[1000px]">
              Unleash your imagination with AI.
            </span>
          </div> */}
                <div className="absolute mt-[222px]">
                  <Button title="ENTER THE PREMISE" delay={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
      <div className="premise-ani">
        <Animation1 />
      </div>
    </>
  );
}

export default Premise;
