/* eslint-disable no-shadow */
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';

import axios from 'axios'; // Import Axios for making AJAX requests
import images from '../assets';
import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/shortenAddress';
import { shortenUsername } from '../utils/shortenUsername';

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }) => {
  const { nftCurrency } = useContext(NFTContext);
  const [userData, setUserData] = useState(null);
  const [imageExists, setImageExists] = useState(true); // Assume the image exists initially
  const walletId = encodeURIComponent(creatorName);
  useEffect(() => {
    // Make a GET request to the updated endpoint
    axios.get(`/api/displayUserdata?walletId=${walletId}`)
      .then((response) => {
        const userData = response.data;
        setUserData(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [walletId]);
  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(creatorImage, { method: 'HEAD' });
        setImageExists(response.ok);
      } catch (error) {
        setImageExists(false);
      }
    };

    checkImage();
  }, [creatorImage]);

  return (
    <div className="min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4">
      <div className="w-8 h-8 minlg:w-10 minlg:h-10 rounded-full bg-nft-red-violet flexCenter">
        <p className="font-poppins text-white font-semibold text-base minlg:text-lg ">{rank}</p>
      </div>

      <div className="my-2 flex justify-center">
        <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
          {imageExists ? (
            <Image
              src={creatorImage}
              layout="fill"
              objectFit="cover"
              alt="creator"
              className="rounded-full"
            />
          ) : (
            <Image
              src={images.creator1}
              layout="fill"
              objectFit="cover"
              alt="default creator"
              className="rounded-full"
            />
          )}
          {userData && userData.verified !== '0' ? (
            <div className="absolute w-5 h-5 minlg:w-7 minlg:h-7 bottom-1 -right-0">
              <Image src={images.tick} layout="fill" objectFit="contain" alt="tick" />
            </div>
          ) : null}

        </div>
      </div>

      <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">

        {userData ? ( // Conditional rendering for user data
          <>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">{shortenUsername(userData.username, 16)}</p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm">({shortenAddress(creatorName)})</p>
          </>
        ) : (
          <>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">Anonymous</p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm">({shortenAddress(creatorName)})</p>
          </>
        )}
        <p className="mt-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-base">{creatorEths.toFixed(2)} <span className="font-normal">{nftCurrency}</span></p>
      </div>
    </div>
  );
};

export default CreatorCard;
