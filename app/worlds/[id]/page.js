'use client';
import React, { useState } from 'react';
import GeoInfo from '@/components/GeoInfo';

function page() {
  return (
    <div className="mt-[100px] text-white">
      <div>
        <GeoInfo />
      </div>
    </div>
  );
}

export default page;
