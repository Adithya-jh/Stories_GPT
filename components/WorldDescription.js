'use client';
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Characters from './Characters';
import Button from './Button';
import { toast } from 'react-hot-toast';

import { motion } from 'framer-motion';

function WorldDescription({ worldId }) {
  const { data: session } = useSession();
  const [userInput, setUserInput] = useState('');
  const [isMessage, setisMessage] = useState(false);
  const [isMessage2, setisMessage2] = useState(true);

  //   const { data: session } = useSession();

  //   const [premises] = useCollection(
  //     session &&
  //       query(
  //         collection(
  //           db,
  //           'users',
  //           session.user.email,
  //           'premises',
  //           premiseId,
  //           // 'premised',
  //           'premise'
  //         ),
  //         orderBy('createdAt', 'asc')
  //       )
  //   );
  const [premises] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user.email, 'worlds'),
        orderBy('createdAt', 'asc')
      )
  );

  useEffect(() => {
    premises &&
      premises.docs.forEach((premise) => setUserInput(premise.premise));
  }, [premises]);

  const callWorld = async () => {
    const notification = toast.loading(
      'Generating your Geographic description'
    );
    const response = await fetch('/api/auth/generateworld', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, worldId, session }),
    }).then(() => {
      toast.success('Your Geographic  description has been generated', {
        id: notification,
      });
    });

    // if (response.ok) {
    //   toast.success('Your character description has been generated', {
    //     id: notification,
    //   });
    //   const data = await response.json();

    //   const { output } = data;
    //   //   console.log('OpenAI replied...', output.text);

    //   //   setApiOutput(output.text);
    //   // setisOutput(true);
    // }
  };

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session.user.email,
          'worlds',
          worldId,
          // 'premised',
          'world'
        ),
        orderBy('createdAt', 'asc')
      )
  );

  //   useEffect(() => {
  //     if (messages) {
  //       setisMessage(!isMessage);
  //     }
  //   }, []);

  return (
    <div>
      <div className=" h-[300px] w-[200px] ml-[400px]  flex justify-center items-start mt-[-70px]">
        <Button title="GENERATE GEO" delay={0} onClick={callWorld} />
      </div>

      <motion.div
        initial={{ x: 2000 }}
        animate={{ x: !messages?.empty && 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
        className={`absolute text-white py-4  flex flex-col mt-[-20px] overflow-scroll  ml-[-120px] max-h-[450px] ${
          !messages?.empty && 'border border-y-3 rounded-lg'
        } w-[1100px]`}
      >
        {messages &&
          messages.docs.map((message) => (
            <Characters
              key={message.id}
              message={
                // message._document.data.value.mapValue.fields.text.stringValue
                message.data()
              }
            />
            // message.data().text;
          ))}
        {/* 
        {premises &&
          premises.docs.forEach(
            (premise) => setUserInput(premise.premise)
            // message.data().text;
          )} */}
      </motion.div>
    </div>
  );
}

export default WorldDescription;
