import React from 'react';

function Characters({ message }) {
  return (
    <div className="text-white bg-[#00000077] px-3  top-[220px]">
      {/* <div>{message}</div> */}
      <div className="mt-[5px]">{message.text}</div>
      {/* <div>Hi</div> */}
    </div>
  );
}

export default Characters;
