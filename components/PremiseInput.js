import React, { useState } from 'react';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import { useSession } from 'next-auth/react';
// import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebase';
// import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

import { useCollection } from 'react-firebase-hooks/firestore';

import WorldAnimButton from './WorldAnimButton';
import GeoInfo from './GeoInfo';

function PremiseInput({ premiseId, isMessage }) {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isMoved, setIsMoved] = useState(false);

  const [isOutput, setisOutput] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  // const navigate = useNavigate();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session.user.email,
          'premises',
          premiseId,
          // 'premised',
          'premise'
        ),
        orderBy('createdAt', 'asc')
      )
  );

  const callGenerateEndpoint = async (e) => {
    // setIsGenerating(true);
    e.preventDefault();
    setIsMoved(true);

    // const response = await fetch('/api/auth/generate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ userInput, premiseId, session }),
    // });

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

    userInput &&
      (await addDoc(
        collection(
          db,
          'users',
          session.user.email,
          'premises',
          premiseId,
          'premise'
        ),
        premise
      ));
    // Toast Notification
    const notification = toast.loading('Generating your Character description');

    // const response = await fetch('/api/auth/generate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ userInput, premiseId, session }),
    // }).then(() => {
    //   // setisOutput(true);
    //   toast.success('Your character description has been generated', {
    //     id: notification,
    //   });
    // });
    // if (response) {
    //   const data = await response.json();
    //   // rest of your code that handles the data

    //   const { output } = data;
    //   console.log('OpenAI replied...', output.text);

    //   setApiOutput(`${output.text}`);
    //   // setisOutput(true);
    // }

    const response = await fetch('/api/auth/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, premiseId, session }),
    });

    if (response.ok) {
      const data = await response.json();

      const { output } = data;
      console.log('OpenAI replied...', output.text);

      setApiOutput(output.text);
      setisOutput(true);

      toast.success('Your character description has been generated', {
        id: notification,
      });
    }

    // api_out = apiOutput;
    // setIsGenerating(false);
  };

  // const nextPage = () => {
  //   navigate.go(1); // Navigate forward by one page
  // };

  const handleTextChange = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="p-0 m-0">
      {/* {!isMessage ? ( */}

      {/* ) : ( */}
      <div className={`fixed`}>
        {/* {apiOutput && (
            <div className="text-white bg-white flex justify-center">
              <div className="absolute top-[50px] ml-[480px] w-[800px] flex justify-center items-center">
                <p>{apiOutput}</p>
       
              </div>
            </div>
          )} */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isMoved || !messages?.empty ? 410 : 0 }}
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
          animate={{ y: isMoved || !messages?.empty ? 410 : 0 }}
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
      {/* )} */}

      {/* <Button title="ckick" onClick={nextPage} /> */}

      {/* <GeoInfo userInput={userInput} apiOutput={apiOutput} /> */}
      {userInput && apiOutput && (
        <div className="absolute top-5 ml-[300px]">
          <WorldAnimButton userInput={userInput} apiOutput={apiOutput} />
          {/* {toast.success('Your character description has been generated', {
            id: toast.loading('Generating your Character description'),
          })} */}
        </div>
      )}

      {messages && (
        <div className="absolute top-5 ml-[300px]">
          <WorldAnimButton
            userInput={userInput}
            apiOutput={apiOutput}
            premiseId={premiseId}
          />
          {/* {toast.success('Your character description has been generated', {
            id: toast.loading('Generating your Character description'),
          })} */}
        </div>
      )}

      {/* {userInput && apiOutput && (
        <div className="absolute top-5 ml-[300px]">

        </div>
      )} */}
    </div>
  );
}

export default PremiseInput;
