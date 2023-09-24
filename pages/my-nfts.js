import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios'; // Import Axios for making AJAX requests

import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/shortenAddress';
import { Loader, NFTCard, SearchBar, Banner, Button } from '../components';
import images from '../assets';

const MyNFTs = () => {
  const { fetchMyNFTsOrCreatedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState('Recently Added');
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const walletId = encodeURIComponent(currentAccount);
  useEffect(() => {
    // Make a GET request to the updated endpoint
    axios.get(`/api/displayUserdata?walletId=${walletId}`)
      .then((response) => {
        // eslint-disable-next-line no-shadow
        const userData = response.data;
        setUserData(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [walletId]);
  useEffect(() => {
    fetchMyNFTsOrCreatedNFTs('')
      .then((items) => {
        setNfts(items);
        setNftsCopy(items);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your Nifty NFTs"
          childStyles="text-center mb-4"
          parentStyle="h-80 justify-center"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full relative">
            <Image src={`/profiles/${encodeURIComponent(currentAccount)}.png`} className="rounded-full object-cover" height={168} width={168} objectFit="cover" priority />
            {userData && userData.verified !== '0' ? (
              <div className="w-10 h-10 absolute bottom-3 right-0 sm:w-7 sm:h-7 sm:bottom-3 sm:right-1">
                <Image src={images.tick} layout="fill" objectFit="contain" alt="tick" />
              </div>
            ) : null}
          </div>
          {/* Render username and bio */}
          {userData ? ( // Conditional rendering for user data
            <>
              <p className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2">{userData.username}</p>
              <p className="font-poppins dark:text-white text-nft-black-1 text-lg mt-0">{shortenAddress(currentAccount)}</p>
              <p className="font-poppins dark:text-white text-nft-black-1 text-sm mt-1 break-all pl-4 pr-4">{userData.bio}</p>
            </>
          ) : (
            <p className="font-poppins dark:text-white text-nft-black-1 text-lg mt-0">{shortenAddress(currentAccount)}</p>
          )}

        </div>
        <Button
          btnName="Edit Profile"
          btnType="secondary"
          classStyles="relative left-0 top-5 rounded-xl"
          handleClick={() => router.push(`/editprofile?userid=${currentAccount}`)}
        />
      </div>

      {(!isLoading && nfts.length === 0) ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">No NFTs owned</h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar activeSelect={activeSelect} setActiveSelect={setActiveSelect} handleSearch={onHandleSearch} clearSearch={onClearSearch} />
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfilePage />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
