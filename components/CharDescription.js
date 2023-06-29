'use client';
import Characters from './Characters';
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import PremiseInput from './PremiseInput';

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
      <div className="absolute text-white py-4  flex flex-col mt-[20px] overflow-scroll  ml-[-120px] max-h-[450px] border	 border-y-3 rounded-lg w-[1100px]">
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

        {isMessage && <PremiseInput isMessage={isMessage} />}
      </div>
    </div>
  );
}

export default CharDescription;
