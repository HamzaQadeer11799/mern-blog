import { Button } from 'flowbite-react';
import React from 'react';

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 rounded-br-3xl justify-center items-center rounded-tl-3xl text-center ">
      <div className="  flex flex-1 justify-center flex-col">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p>Checkout these resources with 100 JavaScript Projects</p>
        <Button gradientDuoTone="purpleToPink" className=" mt-3 rounded-tl-xl">
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            100 JavaScript Projects
          </a>
        </Button>
      </div>
      <div className="flex-1">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShd7rqYDVmv8tDkFPNP2UQrzzANkLB8DUYpVf_IazK8g&s" />
      </div>
    </div>
  );
}
