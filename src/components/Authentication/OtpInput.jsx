import React, { useRef, useEffect } from 'react';

const OtpInput = ({ length = 6, values, onChange }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!values[index] && index > 0) {
        inputRefs.current[index - 1].focus();
        onChange(index - 1, '');
      } else {
        onChange(index, '');
      }
    }
    // Handle left arrow
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    // Handle right arrow
    else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInput = (index, e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    const singleDigit = numericValue.slice(-1);

    onChange(index, singleDigit);

    if (singleDigit && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numericValue = pastedData.replace(/[^0-9]/g, '');
    
    for (let i = 0; i < Math.min(length, numericValue.length); i++) {
      onChange(i, numericValue[i]);
    }
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = values.findIndex(v => !v);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-2xl font-bold rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-black focus:outline-none focus:border-green-500 dark:focus:border-green-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;