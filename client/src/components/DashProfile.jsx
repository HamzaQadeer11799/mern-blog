import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, TextInput } from 'flowbite-react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from '../firebase';
import {
  updateStart,
  updateFailure,
  updateSuccess,
} from '../redux/user/userSlice';
export default function DashProfile() {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setupdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError(
          'Could not upload image(size should be less than 2MB)'
        );
        setImageFileUploadingProgress(null),
          setImageFile(null),
          setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setupdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('There is nothing to change');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setupdateUserSuccess('User is updated successfully!');
        setUpdateUserError(null);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-3">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
          ref={filePickerRef}
        />
        <div
          className=" relative w-32 h-32 cursor-pointer self-center p-3 shadow-md overflow-hidden"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100',
                  height: '100',
                  position: 'absolute',
                  top: '14',
                  left: '14',
                  bottom: '0',
                  right: '0',
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}{' '}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`w-full h-full border-8 border-[lightgray] rounded-full  
          
            ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone={'pinkToOrange'} outline>
          Update
        </Button>
        {updateUserSuccess && (
          <Alert color="success">{updateUserSuccess}</Alert>
        )}

        <div className="text-red-300 flex justify-between mt-3">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer ">LogOut</span>
        </div>
        {updateUserError && <Alert color="failure">{updateUserError}</Alert>}
      </form>
    </div>
  );
}
