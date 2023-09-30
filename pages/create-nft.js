import { useState, useMemo, useCallback, useContext } from 'react';
import { create as ipfsHTTPClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { NFTContext } from '../context/NFTContext';
import { Button, Input, Loader } from '../components';
import images from '../assets';

const projectId = process.env.NEXT_PUBLIC_API_URL;
const projectSecret = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const client = ipfsHTTPClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const CreateItem = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const [fileUrl, setFileUrl] = useState(null);
  const { theme } = useTheme();

  const uploadToInfura = async (file) => {
    const subdomain = 'https://ever-traded.infura-ipfs.io';
    try {
      const added = await client.add({ content: file });
      const URL = `${subdomain}/ipfs/${added.path}`;
      setFileUrl(URL);
      return URL;
    } catch (error) {
      // console.log('Error uploading file to IPFS.');
      alert('Error uploading file.');
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 100000000,
  });

  // add tailwind classes acording to the file status
  const fileStyle = useMemo(
    () => (
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? ' border-file-active ' : ''} 
       ${isDragAccept ? ' border-file-accept ' : ''} 
       ${isDragReject ? ' border-file-reject ' : ''}`),
    [isDragActive, isDragReject, isDragAccept],
  );

  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', category: '' });
  const router = useRouter();
  const { currentAccount } = useContext(NFTContext);

  const createMarket = async () => {
    const { name, description, price } = formInput;
    const formData = new FormData();
    formData.append('price', formInput.price);
    formData.append('name', formInput.name); // Add the name field to formData
    formData.append('description', formInput.description); // Add the bio field to formData
    formData.append('category', formInput.category);
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({ name, description, image: fileUrl });
    formData.append('user', currentAccount);
    try {
      const added = await client.add(data);
      formData.append('path', added.path);
      const url = `https://ever-traded.infura-ipfs.io/ipfs/${added.path}`;
      formData.append('url', url);
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      await createSale(url, formInput.price);
    } catch (error) {
      // console.log('Error uploading file: ', error);
      alert('Error uploading file.');
    }
    try {
      const response = await fetch('api/uploadNFT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // console.log('Successfully Uploaded to Database');
      // Handle success
      } else {
        // console.error('Database Record Not Added');
        // console.log(response.error);
      // Handle error
      }
      router.push('/');
    } catch (error) {
      // console.error('Error uploading database info:', error);
    // Handle error
    }
  };

  if (isLoadingNFT) {
    return (
      <div className="flexCenter" style={{ height: '51vh' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Create new NFT</h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload file</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === 'light' ? 'filter invert' : undefined}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">Drag and Drop File</p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">Or browse media on your device</p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img
                    src={fileUrl}
                    alt="Asset_file"
                  />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleClick={(e) => updateFormInput({ ...formInput, name: e.target.value })}
        />

        <Input
          inputType="select"
          title="Category"
          handleClick={(e) => updateFormInput({ ...formInput, category: e.target.value })}
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) => updateFormInput({ ...formInput, description: e.target.value })}
        />

        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => updateFormInput({ ...formInput, price: e.target.value })}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            btnType="primary"
            classStyles="rounded-xl"
            handleClick={createMarket}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
