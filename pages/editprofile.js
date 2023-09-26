/* eslint-disable no-shadow */
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NFTContext } from '../context/NFTContext';
import { Button, Input } from '../components';

const editMyprofile = () => {
  const { currentAccount } = useContext(NFTContext);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formInput, updateFormInput] = useState({ name: '', bio: '' });
  const router = useRouter();
  // console.log(router);
  const [currentAccount1, setCurrentAccount] = useState(undefined);

  useEffect(() => {
    // When router.query.userid changes, update currentAccount1
    setCurrentAccount(router.query.userid);
  }, [router.query.userid]);

  // console.log('currentAccount1:', currentAccount1);

  // Function to fetch user profile data
  useEffect(() => {
    // Check if currentAccount1 is defined before making the fetch request
    if (currentAccount1 !== undefined) {
      // Make the fetch request using currentAccount1
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/displayUserdata?walletId=${currentAccount1}`);
          if (response.status === 200) {
            const { data } = response;
            updateFormInput({ name: data.username, bio: data.bio });
            // console.log('User data:', data);
          } else {
            // console.error('Error fetching user profile data');
          }
        } catch (error) {
          // console.error('Error fetching user profile data:', error);
        }
      };

      fetchData(); // Call the fetch data function when currentAccount1 is defined
    }
  }, [currentAccount1]); // Add currentAccount1 as a dependency

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a URL for the selected file to use as a preview
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(previewUrl);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);

    // Create a URL for the dropped file to use as a preview
    const previewUrl = URL.createObjectURL(droppedFile);
    setPreviewUrl(previewUrl);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    // if (!file) {
    //   console.error('No file selected');
    //   return;
    // }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', currentAccount);
    formData.append('name', formInput.name); // Add the name field to formData
    formData.append('bio', formInput.bio); // Add the bio field to formData
    // formData.append('walletid', currentAccount); // Add the bio field to formData
    // console.log('test');
    // console.log(formInput.name);
    // console.log(formInput.bio);
    try {
      const response = await fetch('api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // console.log('File uploaded successfully');
      // Handle success
      } else {
        // console.error('File upload failed');
        // console.log(response.error);
      // Handle error
      }
    } catch (error) {
      // console.error('Error uploading file:', error);
    // Handle error
    }
    router.replace('/my-nfts');
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <form encType="multipart/form-data">
          <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Edit Profile</h1>

          <div className="mt-16">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload Profile Picture</p>
            <div className="mt-4">
              <div>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {previewUrl ? (
                    <img src={previewUrl} />
                  ) : (
                    <p>
                      <label>Drag and drop an image here or click to
                        browse
                        <input
                          type="button"
                          onClick={() => document.querySelector('input[type=file]').click()}
                        />
                      </label>
                      <span className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs mt-7">Image format supported .png. Max 100mb.</span>
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/png"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />

                {/* <button type="button" onClick={handleSubmit}>Upload Image</button> */}
              </div>
              <Input
                inputType="input"
                title="Name"
                placeholder="your username"
                value={formInput.name}
                handleClick={(e) => updateFormInput({ ...formInput, name: e.target.value })}
              />
              <Input
                inputType="input"
                title="Bio"
                placeholder="your bio"
                value={formInput.bio}
                handleClick={(e) => updateFormInput({ ...formInput, bio: e.target.value })}
              />
            </div>
          </div>

          {/* <Input
          inputType="input"
          title="Change Username"
          placeholder="My Username"
          handleClick={(e) => updateFormInput({ ...formInput, name: e.target.value })}
        /> */}

          <div className="mt-7 w-full flex justify-end">
            <Button
              btnName="Update Profile"
              btnType="primary"
              classStyles="rounded-xl"
              handleClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default editMyprofile;
