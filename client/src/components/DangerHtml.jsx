import React from 'react';
import { useState, useEffect } from 'react';
export default function DangerHtml({ postSlug }) {
  const [post, setPost] = useState(null);
  console.log(post);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, []);
  return (
    <div
      className="p-3 max-w-2xl mx-auto w-full post-content"
      dangerouslySetInnerHTML={{ __html: post && post.content }}
    ></div>
  );
}
