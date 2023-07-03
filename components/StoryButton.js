'use client';
import React from 'react';
import Button from './Button';

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

function StoryButton({ worldId }) {
  const { data: session } = useSession();

  const router = useRouter();

  //   const [worlds] = useCollection(
  //     session &&
  //       query(
  //         collection(
  //           db,
  //           'users',
  //           session?.user.email,
  //           'worlds',
  //           worldId,
  //           // 'premised',
  //           'world'
  //         ),
  //         orderBy('createdAt', 'asc')
  //       )
  //   );
  const createStory = async () => {
    const doc = await addDoc(
      collection(db, 'users', session?.user.email, 'story'),
      {
        // premises: [],
        userId: session?.user.email,
        createdAt: serverTimestamp(),
        worldId: worldId,
        section: 'story',
      }
    );

    router.push(`/story/${doc.id}`);
  };

  return (
    <div>
      <Button title="GENERATE STORIES" onClick={createStory} />
    </div>
  );
}

export default StoryButton;
