import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { motion } from 'framer-motion';

import WorldButton from './WorldButton';

function WorldAnimButton() {
  const { data: session } = useSession();

  const router = useRouter();
  const createWorlds = async () => {
    const doc = await addDoc(
      collection(db, 'users', session.user.email, 'worlds'),
      {
        // premises: [],
        userId: session.user.email,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/worlds/${doc.id}`);
  };
  return (
    <div>
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        transition={{ delay: 0, type: 'spring', stiffness: 100, duration: 4 }}
        className="flex justify-between flex-col h-[20%] mt-[600px] ml-[100px]"
      >
        <button
          className="absolute z-[2] text-xl flex justify-center items-center mt-[60px] ml-[75px] text-[#ddf68a] font-extrabold"
          onClick={createWorlds}
        >
          <div className="w-[100%] flex justify-center items-center bg-[#90b3fa7b] hover:bg-black text-white ease-out 2s rounded-lg p-2">
            Generate Geographies
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </button>

        <WorldButton />
      </motion.div>
    </div>
  );
}

export default WorldAnimButton;
