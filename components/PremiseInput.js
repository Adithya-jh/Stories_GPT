import React, { useState } from 'react';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import { useSession } from 'next-auth/react';

import { motion } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from 'react-hot-toast';

function PremiseInput({ premiseId }) {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isMoved, setIsMoved] = useState(false);

  const [isOutput, setisOutput] = useState(false);

  const { data: session } = useSession();

  const callGenerateEndpoint = async () => {
    // setIsGenerating(true);
    setIsMoved(true);

    const input = userInput.trim();

    const premise = {
      text: input,
      createdAt: serverTimestamp(),

      user: {
        _id: session.user.email,
        name: session.user.name,
        avatar:
          session.user.image ||
          `https://ui-avatars.com/api/?name=${session.user.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        'users',
        session.user.email,
        'premises',
        premiseId,
        'premise'
      ),
      premise
    );
    // Toast Notification
    const notification = toast.loading('Generating your Character description');

    const response = await fetch('/api/auth/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    // .then(() => {
    //   toast.success('Your character description has been generated', {
    //     id: notification,
    //   });
    // });

    const data = await response.json();
    const { output } = data;
    console.log('OpenAI replied...', output.text);

    setApiOutput(`${output.text}`);
    setisOutput(true);

    // api_out = apiOutput;
    // setIsGenerating(false);
  };

  const handleTextChange = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="p-0 m-0">
      <div className="fixed">
        {apiOutput && (
          <div className="text-white bg-white flex justify-center">
            <div className="absolute top-[50px] ml-[480px] w-[800px] flex justify-center items-center">
              <p>{apiOutput}</p>
              {/* <p>BOMB BLAST MANDAYA</p> */}
            </div>
          </div>
        )}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isMoved ? 410 : 0 }}
          transition={{ delay: 0, type: 'spring', stiffness: 100 }}
          className="ml-[230px] w-[100%] z-[2] h-[200px] top-[200px]"
        >
          <TextArea
            value={userInput}
            onChange={handleTextChange}
            placeholder="Enter your premise here"
          />
        </motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isMoved ? 410 : 0 }}
          transition={{ delay: 0, type: 'spring', stiffness: 100 }}
          // onClick={callGenerateEndpoint}
          className="ml-[250px] flex justify-center p-[0px] m-[0px] z-[-1] relative w-[100%] mt-[-200px]"
        >
          <Button
            // path="/premise"
            // path="/characters"
            onClick={callGenerateEndpoint}
            title="GET ME CHARACTERS"
            delay={2}
            // onClick
          />
        </motion.div>
        {/* {apiOutput && (
        <div className="text-white  flex justify-center">
          <div className="mt-[100px]">
            <p>{apiOutput}</p>
  
          </div>
        </div>
      )} */}
      </div>
    </div>
  );
}

export default PremiseInput;