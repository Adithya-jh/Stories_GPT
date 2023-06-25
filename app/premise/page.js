'use client';
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';

let api_out = null;

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
    // setIsGenerating(false);
  };

  const handleTextChange = (event) => {
    setUserInput(event.target.value);
  };

  let path = '';

  api_out = apiOutput;
  return (
    <PageWrapper>
      <div className="mt-[200px] flex flex-col space-between">
        <div>Write down the premise of the story you want to develop:</div>

        <TextArea
          value={userInput}
          onChange={handleTextChange}
          placeholder="Enter your premise here"
        />
        {/* <p>Entered text: {text}</p> */}
        {!userInput ? (path = '') : (path = '/characters')}
        <div onClick={callGenerateEndpoint}>
          <Button
            // path="/premise"
            path={userInput ? path : ''}
            title="GET ME CHARACTERS"
            delay={2}
          />
        </div>

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
  );
}

export default Premise;
