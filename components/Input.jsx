import { useContext } from 'react';

import { NFTContext } from '../context/NFTContext';

const Input = ({ inputType, title, placeholder, handleClick, value = null }) => {
  const { nftCurrency } = useContext(NFTContext);

  // Add category options
  const categoryOptions = [
    { value: 'Default', label: 'Default' },
    { value: 'Art', label: 'Art' },
    { value: 'photo-realistic', label: 'Photo Realistic' },
  ];

  return (
    <div className="mt-10 w-full">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">{title}</p>

      {inputType === 'number' ? (
        <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            type="number"
            className="flex-1 w-full dark:bg-nft-black-1 bg-white outline-none "
            value={value}
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">{nftCurrency}</p>
        </div>
      )
        : inputType === 'textarea' ? (
          <textarea rows={10} className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3" placeholder={placeholder} onChange={handleClick} value={value} />
        ) : inputType === 'select' ? (
          <select
            value={value}
            onChange={handleClick}
            className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
            placeholder={placeholder}
            value={value}
            onChange={handleClick}
          />
        )}
    </div>
  );
};

export default Input;
