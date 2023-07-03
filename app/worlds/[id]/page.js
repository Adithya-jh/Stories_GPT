'use client';
import React, { useState } from 'react';
import GeoInfo from '@/components/GeoInfo';
import WorldDescription from '@/components/WorldDescription';
import WorldAnimation from '@/components/WorldAnimation';

import StoryButton from '@/components/StoryButton';

import Header from '@/components/Header';

function World({ params: { id } }) {
  return (
    <div>
      <Header />
      <div className="mt-[100px] fixed w-[100vw] text-white">
        <div className="absolute w-[100vw]  h-[650px] mt-[5px]">
          <WorldAnimation />
        </div>
        <div>
          {/* <GeoInfo /> */}

          <div className="ml-[10px] mb-[100px]  absolute flex flex-col">
            <div className="ml-[550px] mt-[60px] border rounded-[50px] bg-[#111111ac]">
              Geographic Description
            </div>
            <div className="ml-[550px] mt-[10px] text-[#69eff1]">
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
          </div>
        </div>
        <StoryButton worldId={id} />
      </div>
    </div>
  );
}

export default World;
