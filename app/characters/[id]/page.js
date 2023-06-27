'use client';
import React, { useContext, useState } from 'react';

// import { api_out } from '@/app/premise/page';
import { ApiContext } from '@/app/flow/page';
import TextArea from '@/components/TextArea';

import { api_out } from '@/app/flow/page';

import CharAnimation from '@/components/CharAnimation';
import Header from '@/components/Header';

// export const ApiContext2 = createContext();

import Button from '@/components/Button';

import Animation1 from '@/components/Animation1';
import { Canvas, useFrame } from '@react-three/fiber';

import { createContext } from 'react';

import Premises from '@/components/Premises';
import { motion } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { useSession } from 'next-auth/react';
import { db } from '@/firebase';
// import { ApiContext2 } from '../characters/[id]/page';

import PremiseInput from '@/components/PremiseInput';
import CharDescription from '@/components/CharDescription';
import WorldAnimButton from '@/components/WorldAnimButton';

function Characters({ params: { id } }) {
  // const character_out = useContext(ApiContext);
  // console.log('character_out', character_out);

  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  // const [isGenerating, setIsGenerating] = useState(false);

  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="flex">
      <Header />
      <div className="h-[750px] w-[20%]  bg-black">
        <CharAnimation />
      </div>

      <div className="ml-[40px] mt-[-70px]">
        <div className="ml-[250px] mt-[150px]">Characters and Description:</div>
        <div className="ml-[250px] mt-[10px] text-[#69eff1]">
          Discover Unique Personalities with their Captivating Descriptions
        </div>

        {/* <div className="ml-[250px] mt-[10px]">{character_out}</div> */}
        {/* <div className="ml-[250px] mt-[10px]">{api_out}</div> */}

        {/* {character_out} */}
        {/* 
        <div className="absolute w-[100%]">
          <TextArea
            value={userInput}
            onChange={handleTextChange}
            placeholder="Enter your premise here"
          />

          <div onClick={callGenerateEndpoint}>
            <Button
              // path="/premise"
              // path="/characters"
              title="GET ME CHARACTERS"
              delay={2}
              // onClick
            />
          </div>
        </div> */}

        {/* <CharDescription premiseId={id} /> */}
        <PremiseInput premiseId={id} />
      </div>

      <WorldAnimButton />
    </div>
  );
}

export default Characters;
