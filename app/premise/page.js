'use client';
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';

import Animation1 from '@/components/Animation1';
import { Canvas, useFrame } from '@react-three/fiber';

import { createContext } from 'react';
import Header from '@/components/Header';
import Premises from '@/components/Premises';
import { motion } from 'framer-motion';

export let api_out = 'Initial';

export const ApiContext = createContext();

function Premise() {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const callGenerateEndpoint = async () => {
    // setIsGenerating(true);

    console.log('Calling OpenAI...');
    const response = await fetch('/api/auth/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log('OpenAI replied...', output.text);

    setApiOutput(`${output.text}`);
    api_out = apiOutput;
    // setIsGenerating(false);
  };

  const handleTextChange = (event) => {
    setUserInput(event.target.value);
  };

  let path = '';

  // api_out = apiOutput;
  return (
    <>
      <ApiContext.Provider value={userInput}>
        <PageWrapper>
          {/* <Header /> */}
          <div className="mt-[200px] flex flex-col space-between">
            <div>Write down the premise of the story you want to develop:</div>

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

              <div className="absolute w-[100%]">
                <TextArea
                  value={userInput}
                  onChange={handleTextChange}
                  placeholder="Enter your premise here"
                />
                {/* <p>Entered text: {text}</p> */}
                {/* {!userInput ? (path = '') : (path = '/characters')} */}
                <div onClick={callGenerateEndpoint}>
                  <Button
                    // path="/premise"
                    // path="/characters"
                    title="GET ME CHARACTERS"
                    delay={2}
                  />
                </div>
              </div>
            </div>

            <div className="root"></div>

            {apiOutput && !userInput && (
              <div className="text-white w-[100%] flex justify-center">
                <div className="mt-[100px]">
                  <p>{apiOutput}</p>
                  {/* <p>BOMB BLAST MANDAYA</p> */}
                </div>
              </div>
            )}
          </div>
        </PageWrapper>
        <div className="premise-ani">
          <Animation1 />
        </div>
      </ApiContext.Provider>
    </>
  );
}

export default Premise;
