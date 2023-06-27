import React from 'react';

function TextArea({ value, onChange, placeholder }) {
  return (
    <div className="relative h-[50%] w-[100%]">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // rows={4}
        className="w-[100%] bg-black outline-none mt-[100px]"
      />
    </div>
  );
}

export default TextArea;
