'use client';
import React, { useContext } from 'react';

// import { api_out } from '@/app/premise/page';
import { ApiContext } from '@/app/premise/page';

import { api_out } from '@/app/premise/page';

import CharAnimation from '@/components/CharAnimation';
import Header from '@/components/Header';

function Characters() {
  const character_out = useContext(ApiContext);
  console.log('character_out', character_out);
  return (
    <div className="flex">
      <Header />
      <div className="h-[750px] w-[20%]  bg-black">
        <CharAnimation />
      </div>

      <div>
        <div className="ml-[250px] mt-[150px]">Characters and Description:</div>
        <div className="ml-[250px] mt-[10px] text-[#69eff1]">
          Discover Unique Personalities with their Captivating Descriptions
        </div>

        <div className="ml-[250px] mt-[10px]">{character_out}</div>
        {/* <div className="ml-[250px] mt-[10px]">{api_out}</div> */}

        {/* {character_out} */}
      </div>
    </div>
  );
}

export default Characters;
