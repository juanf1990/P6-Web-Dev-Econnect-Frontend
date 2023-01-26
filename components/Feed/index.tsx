import React, { useState } from "react";
import { useEffect } from "react";
import { Post } from "../../typings";

const Feed = () => {
  const [backgroundColor, setBackgroundColor] = useState("badge-primary");
  const [read, setRead] = useState("Mark as Read");
  const [posts, setPosts] = useState([]);
  const handleClick = () => {
    setBackgroundColor("bg-green-700");
    setRead("Read");
  };

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:8001/api/posts");
    const data = await res.json();
    const posts = data.posts;
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-[80px] z-[-1] gap-4">
      {!posts ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">No posts yet</h1>
          <p className="text-lg">Be the first to post</p>
        </div>
      ) : (
        <div className="posts-container flex flex-col gap-4">
          {posts.map((post: Post) => (
            <div
              className="card flex lg:card-side glass shadow-xl"
              key={post.id}
            >
              <img
                src={post.imgUrl}
                alt="post image"
                className="card-side rounded-tl-lg rounded-bl-lg"
              />
              <div className="card-body">
                <h2 className="card-title">{post.username}</h2>
                <p className="card-subtitle">{post.description}</p>
                <div className="flex justify-end">
                  <span
                    className={`badge ${backgroundColor} text-white`}
                    onClick={handleClick}
                  >
                    {read}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
