import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
export default function DashProfile() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg w-full mx-auto p-3">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 cursor-pointer self-center p-3 shadow-md overflow-hidden">
          {' '}
          <img
            src={currentUser.profilePicture}
            alt="user"
            className=" w-full h-full border-8 border-[lightgray] rounded-full "
          />
        </div>
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone={'pinkToOrange'} outline>
          Update
        </Button>
        <div className="text-red-300 flex justify-between mt-3">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer ">LogOut</span>
        </div>
      </form>
    </div>
  );
}
