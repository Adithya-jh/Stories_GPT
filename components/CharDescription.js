'use client';
import Characters from './Characters';
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import PremiseInput from './PremiseInput';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function CharDescription({ premiseId }) {
  const { data: session } = useSession();
  const [isMessage, setisMessage] = useState(false);
  const [isMessage2, setisMessage2] = useState(true);

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

  useEffect(() => {
    if (messages) {
      setisMessage(!isMessage);
    }
  }, []);

  console.log(messages);
  return (
    <div>
      <motion.div
        initial={{ x: 2000 }}
        animate={{ x: !messages?.empty && 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
        className={`absolute text-white py-4  flex flex-col mt-[20px] overflow-scroll  ml-[-120px] max-h-[450px] ${
          !messages?.empty && 'border border-y-3 rounded-lg'
        } w-[1100px]`}
      >
        {/* {messages?.empty && (
          <>
            <p className="mt-10 text-center text-white">
              Type the Premise below to get started
            </p>
            <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
          </>
        )} */}
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

        {/* {isMessage && <PremiseInput isMessage={isMessage} />} */}
      </motion.div>
    </div>
  );
}

export default CharDescription;
