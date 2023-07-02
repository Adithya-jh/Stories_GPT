'use client';
import { db } from '@/firebase';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
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
  // const [premises] = useCollection(
  //   session &&
  //     query(
  //       collection(db, 'users', session.user.email, 'worlds'),
  //       orderBy('createdAt', 'asc')
  //     )
  // );
  // const [premises] = useCollection(
  //   session &&
  //     query(
  //       collection(db, 'users', session.user.email, 'worlds'),
  //       orderBy('createdAt', 'asc')
  //     )
  // );

  // if (premises && !premises?.empty) {
  //   const premise1 =
  //     'a boy in a small village trying to do adventureos things by going to the mountain';
  //   // const premise1 =
  //   //   premises[0]._document.data.value.mapValue.fields.text.stringValue;
  //   setUserInput(premise1);
  // }

  // const fetchPremises = async () => {
  //   // Await the premises object
  //   const [premises] = await useCollection(
  //     session &&
  //       query(
  //         collection(db, 'users', session.user.email, 'worlds'),
  //         orderBy('createdAt', 'asc')
  //       )
  //   );

  //   if (!premises?.empty) {
  //     const premise1 = premises[0].data().premise;
  //     setUserInput(premise1);
  //   }
  // };

  const fetchPremises = async () => {
    const premisesPromise = new Promise((resolve) => {
      const [premises] = useCollection(
        session &&
          query(
            collection(db, 'users', session.user.email, 'worlds'),
            orderBy('createdAt', 'asc')
          )
      );
      resolve(premises);
    });

    const premises = await premisesPromise;
    // console.log(premises);
    console.log(premises.docs[0].data().premise);

    if (premises && premises.docs && premises.docs.length > 0) {
      const premise1 = premises.docs[0].data().premise;
      // const premise1 =
      //   "In a dystopian future, a skilled hacker must infiltrate a high-tech corporation's secret facility to expose their sinister plans that threaten humanity's freedom and existence.";
      setUserInput(premise1);
    }
  };

  // fetchPremises();

  // ...

  useEffect(() => {
    const fetchPremises = async () => {
      const q = query(
        collection(db, 'users', session.user.email, 'worlds'),
        orderBy('createdAt', 'asc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const premise1 = snapshot.docs[0].data().premise;
          setUserInput(premise1);
        }
      });

      return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribe();
      };
    };

    fetchPremises();

    // ...
  }, []);

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
      <div className=" h-[300px] w-[200px] ml-[340px]  flex justify-center items-start mt-[-70px]">
        <Button title="GENERATE GEO" delay={0} onClick={callWorld} />
      </div>

      <motion.div
        initial={{ x: 2000 }}
        animate={{ x: !messages?.empty && 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
        className={`absolute  py-4  flex flex-col mt-[-50px] overflow-scroll  ml-[-120px] max-h-[450px] ${
          !messages?.empty && 'border border-y-3 rounded-lg'
        } w-[1100px]`}
      >
        <div className="text-white  w-[100%]  flex justify-center items-center  ">
          <h3 className="w-[50%] border bg-black rounded-[50px]">
            GEOGRAPHIC DESCRIPTION BASED ON YOUR PREMISE
          </h3>
        </div>
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
