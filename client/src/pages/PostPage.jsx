import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DangerHtml from '../components/DangerHtml';
import CallToAction from '../components/CallToAction';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        }
        if (res.ok) {
          setLoading(false);
          setError(false);
          setPost(data.posts[0]);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchPost();
  }, [postSlug]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <main className="p-3 max-w-6xl  mx-auto flex flex-col min-h-screen">
      <hi className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </hi>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button size="xs" pill color="gray">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        className="mt-10 max-h-[600px] w-full p-3 object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs ">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div>
        {' '}
        <DangerHtml postSlug={postSlug} />
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
    </main>
  );
}
