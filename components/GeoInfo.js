import React, { useState } from 'react';
import Button from './Button';

function GeoInfo({ userInput }) {
  const [world, setWorld] = useState('');
  const [premise, setPremise] = useState('');

  // if (userInput) {
  //   setPremise(userInput);
  // }

  const callWorld = async () => {
    const response = await fetch('/api/auth/generateworld', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ premise }),
    });

    setPremise('');
    // .then(() => {
    //   toast.success('Your character description has been generated', {
    //     id: notification,
    //   });
    // });

    const data = await response.json();
    const { output } = data;
    console.log('OpenAI replied...', output.text);

    setWorld(`${output.text}`);
  };

  return (
    <div>
      <div></div>

      <div>
        <Button title="GENERATE GEO" delay={0} />
        {/* <div>{world}</div> */}
        <div>Bomb</div>
      </div>
    </div>
  );
}

export default GeoInfo;
