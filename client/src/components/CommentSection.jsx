import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [postComments, setPostComments] = useState([]);
  console.log('postComments', postComments);
  console.log('comments', comment);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setPostComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [postId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.length > 200) {
        return;
      }
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setPostComments([data, ...postComments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setPostComments(
          postComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setPostComments(
      postComments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  return (
    <div className="max-w-2xl mx-auto w-full">
      {currentUser ? (
        <div className="flex gap-1 items-center my-5 text-gray-500 text-xs ">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={'/dashboard?tab=profile'}
            className="text-xs text-cyan-600 hover:underline"
          >
            {currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be login to comment.
          <Link className="text-blue-500 hover:underline" to="/sign-in">
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 p-3 rounded-md"
        >
          <Textarea
            rows="3"
            maxLength="200"
            placeholder="Add a comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between item-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {postComments.length === 0 ? (
        <div>
          <p className="text-xs text-teal-500 my-5">No Comments Yet!</p>
        </div>
      ) : (
        <>
          <div className="flex gap-2 items-center my-5 ">
            <p>Comments</p>
            <div>
              <p className="border border-gray-400 py-1 px-2 text-xs rounded-sm">
                {postComments.length}
              </p>
            </div>
          </div>
          {postComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
            />
          ))}
        </>
      )}
    </div>
  );
}
