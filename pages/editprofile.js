import { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { NFTContext } from '../context/NFTContext';
import { Button, Input, Loader } from '../components';

const editMyprofile = () => {
  const { currentAccount } = useContext(NFTContext);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      // Handle success
      } else {
        console.error('File upload failed');
        console.log(response.error);
      // Handle error
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    // Handle error
    }
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
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />

                {/* <button type="button" onClick={handleSubmit}>Upload Image</button> */}
              </div>
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
