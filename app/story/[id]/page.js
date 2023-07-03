'use client';
import React from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebase';

import { useCollection } from 'react-firebase-hooks/firestore';
import { motion } from 'framer-motion';

function Story() {
  const { data: session } = useSession();

  const [worlds] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user.email,
          'worlds',
          worldId,
          // 'premised',
          'world'
        ),
        orderBy('createdAt', 'asc')
      )
  );

  const callStory = async () => {
    const notification = toast.loading(
      'Generating your Geographic description'
    );
    const response = await fetch('/api/auth/generatestory', {
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
  return <div>Story</div>;
}

export default Story;
