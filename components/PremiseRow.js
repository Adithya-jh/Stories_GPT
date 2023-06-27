import React from 'react';

import Link from 'next/link';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { orderBy, query, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

import { useCollection } from 'react-firebase-hooks/firestore';

function PremiseRow({ id }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [messages] = useCollection(
    collection(db, 'users', session.user.email, 'premises', id, 'messages')
  );

  const removePremise = async () => {
    await deleteDoc(doc(db, 'users', session.user.email, 'premises', id));
    router.replace('/premise');
  };
  return (
    <Link
      href={`/characters/${id}`}
      className="flex justify-center mt-[15px] cursor-pointer z-10 hover:bg-gray-700/50"
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate ml-2">
        {messages?.docs[messages?.docs.length - 1]?.data().text ||
          'Your Premise'}
      </p>
      <TrashIcon
        className="h-5 w-5 text-gray-700 hover:text-red-700"
        onClick={removePremise}
      />
    </Link>
  );
}

export default PremiseRow;
