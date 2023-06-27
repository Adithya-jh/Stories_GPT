import React from 'react';

import { motion } from 'framer-motion';

import { useCollection } from 'react-firebase-hooks/firestore';

import { useSession } from 'next-auth/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import PremiseRow from './PremiseRow';

function Premises() {
  const { data: session } = useSession();

  const [premises, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user.email, 'premises'),
        orderBy('createdAt', 'asc')
      )
  );
  return (
    <motion.div
      initial={{ x: -150 }}
      animate={{ x: 20 }}
      transition={{ delay: 0, type: 'spring', stiffness: 100 }}
      className="p-2 w-[250px] h-[600px] flex z-20 bg-[rgba(5,5,5,0.7)] border  rounded-md"
    >
      <div className="flex-1 ">
        <div className="cursor-pointer z-20">
          <div>{/* ModelSelection */}</div>
          {/* Map through the Premises */}
          {premises?.docs.map((premise) => (
            <PremiseRow key={premise.id} id={premise.id} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Premises;
