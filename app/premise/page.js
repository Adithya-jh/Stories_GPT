'use client';
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';

import Animation1 from '@/components/Animation1';
import { Canvas, useFrame } from '@react-three/fiber';

import { createContext } from 'react';

export let api_out = 'Initial';

export const ApiContext = createContext();

function Premise() {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
          <div className="mt-[200px] flex flex-col space-between">
            <div>Write down the premise of the story you want to develop:</div>

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
                path="/characters"
                title="GET ME CHARACTERS"
                delay={2}
              />
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
