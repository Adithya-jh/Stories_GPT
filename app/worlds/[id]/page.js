'use client';
import React, { useState } from 'react';
import GeoInfo from '@/components/GeoInfo';
import WorldDescription from '@/components/WorldDescription';

import Header from '@/components/Header';

function World({ params: { id } }) {
  return (
    <div className="mt-[100px] text-white">
      <Header />
      <div>
        {/* <GeoInfo /> */}

        <div className="ml-[-10px] mt-[-70px] flex flex-col">
          <div className="ml-[150px] mt-[100px]">Geographic Description</div>
          <div className="ml-[150px] mt-[10px] text-[#69eff1]">
            Discover the detailed geographies for the charactar establishment
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

          <div className="max-h-[400px] ml-[300px] mt-[-100px]">
            <WorldDescription worldId={id} />
          </div>

          {/* <PremiseInput premiseId={id} /> */}
        </div>
      </div>
    </div>
  );
}

export default World;
