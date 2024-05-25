import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            About Hamza's Blog
          </h1>
          <div className=" text-md text-gray-500 flex flex-col gap-6">
            <p>
              Hamza's Blog is a blog that I created to share my thoughts and
              ideas with the world. I am a software engineer and I love to writ
              about my experiences and things I have learned. I hope you enjoy
              reading my blog.
            </p>
            <p>
              As a software engineer, I’ve come to realize that our field is one
              of perpetual evolution and discovery. The rapid advancement of
              technology means that staying current requires a relentless
              pursuit of knowledge and a passion for innovation. In my journey,
              I've embraced this constant change as an opportunity to grow and
              adapt.
            </p>
            <p>
              One of the most rewarding aspects of being a software engineer is
              the sense of community and collaboration that permeates our
              industry. From contributing to open-source projects to
              participating in local meetups and global conferences, the
              opportunities to connect with like-minded individuals are endless.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
