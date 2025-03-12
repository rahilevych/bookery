import React, { useCallback, useRef } from 'react';

interface Props {
  onInputChange: (text: string) => void;
  text: string;
}
const Search: React.FC<Props> = ({ onInputChange, text }) => {
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceFetchBooks = useCallback(
    (value: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        onInputChange(value);
      }, 300);
    },
    [onInputChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debounceFetchBooks(value);
    onInputChange(value);
  };

  return (
    <div>
      <input
        type='text'
        value={text}
        onChange={handleInputChange}
        placeholder='Search for books...'
        className='w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
      />
    </div>
  );
};

export default Search;
