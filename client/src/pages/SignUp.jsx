import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center ">
        {/*left*/}
        <div className="flex-1">
          <Link to="/" className="  font-bold   dark:text-white text-4xl ">
            <span className=" mrgin-0 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Hamza's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            <br />
            or with Google.
          </p>
        </div>
        {/*right*/}
        <div className="flex-1">
          <form className="flex flex-col gap-3">
            <div>
              <Label value="Your username"></Label>
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email"></Label>
              <TextInput type="email" placeholder="Email" id="email" />
            </div>
            <div>
              <Label value="Your password"></Label>
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              signup
            </Button>
          </form>
          <div className="flex mt-5 text-sm gap-2">
            <span>Have an account?</span>
            <Link className="text-blue-500" to="/sign-in">
              signIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
