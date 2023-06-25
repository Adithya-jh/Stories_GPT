import React from 'react';

function TextArea({ value, onChange, placeholder }) {
  return (
    <div className="width-[100%]">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // rows={4}
        className="w-[50%] bg-black outline-none mt-[100px]"
      />
    </div>
  );
}

export default TextArea;
