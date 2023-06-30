import React from 'react';

function Characters({ message }) {
  const isStoriesGpt = message.user.name === 'stories-gpt';
  return (
    <div
      className={`py-5 ${isStoriesGpt && 'bg-[#ff464682] mx-3 rounded-lg'} `}
    >
      <div
        className={`text-white flex rounded-md space-x-5 px-10 mx-auto top-[220px]`}
      >
        {/* <div>{message}</div> */}
        <img src={message.user.avatar} alt="avatar" className="h-8  w-8" />
        <div className="mt-[5px] pt-1">{message.text}</div>
        {/* <div>Hi</div> */}
      </div>
    </div>
  );
}

export default Characters;
