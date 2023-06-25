'use client';
import React, { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';

function Premise() {
  const [text, setText] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    // setIsGenerating(true);

    console.log('Calling OpenAI...');
    const response = await fetch('/api/generate', {
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
    setText(event.target.value);
  };
  return (
    <PageWrapper>
      <div className="mt-[200px] flex flex-col space-between">
        <div>Write down the premise of the story you want to develop:</div>

        <TextArea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your premise here"
        />
        {/* <p>Entered text: {text}</p> */}
        <Button
          path="/characters"
          title="GET ME CHARACTERS"
          delay={2}
          onClick={callGenerateEndpoint}
        />

        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default Premise;
