import { useState, useEffect } from "react";
import Image from "next/image";
import { Post } from "../../typings";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("bg-green-600");
  const [readBy, setReadBy] = useState(false);
  const cookie = Cookies.get("userId");
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:8001/api/posts/");
      const data = await res.json();
      const posts = data;
      for (let i = 0; i < posts.length; i++) {
        const res = await fetch(
          `http://localhost:8001/api/users_posts/${posts[i].id}/${cookie}`
        );
        // Check that the userId is in the same row as the post id is in the users_posts table
        const data = await res.json();
        const result = data;
        if (result === true) {
          posts[i].readBy = true;
        } else if (result === false) {
          posts[i].readBy = false;
        }
      }
      setPosts(posts);
    };

    if (!cookie) {
      router.push("/");
    } else {
      fetchPosts();
    }
  }, []);

  const handleMarkAsRead = async (id: any, cookie: any) => {
    if (cookie === undefined || cookie === null) {
      router.push("/");
      return;
    } else {
      // Check if the user has already liked the post
      const res = await fetch(
        `http://localhost:8001/api/users_posts/${id}/${cookie}`
      );
      const data = await res.json();
      const result = data;
      if (result === true) {
        alert("Post already marked as read");
      } else if (result === false) {
        const response = await fetch(`http://localhost:8001/api/users_posts/`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: cookie, postId: id }),
        });
        setReadBy(true);
        const data = await response.json();
        if (response.ok) {
          alert("Post marked as read");
        } else {
          console.error(data);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-[80px] z-[-1] gap-4">
      {typeof posts === "string" ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">{posts}</h1>
        </div>
      ) : !Array.isArray(posts) || !posts.length ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">No posts yet</h1>
          <p className="text-lg">Be the first to post</p>
        </div>
      ) : (
        <div className="posts-container flex flex-col-reverse gap-4">
          {posts.map((post: any) => (
            <div
              className="card flex lg:card-side glass shadow-xl"
              key={post.id}
            >
              <div className="relative min-w-[250px] min-h-[150px]">
                <Image
                  src={post.imgUrl}
                  alt="post image"
                  fill={true}
                  className="card-side rounded-tl-lg rounded-tr-lg object-cover max-w-full lg:rounded-bl-lg lg:rounded-tr-none"
                />
              </div>
              <div className="card-body fl bg-cyan-800 rounded-bl-lg rounded-br-lg lg:rounded-tr-lg lg:rounded-bl-none gap-0 flex">
                <h4 className="card-title text-right rounded-t-lg bg-cyan-600 pl-2 pr-2 justify-end text-[12px]">
                  {post.username}
                </h4>
                <p className="card-subtitle text-justify bg-cyan-500 pl-3 pr-3 py-2 max-w-[200px]">
                  {post.description}
                </p>
                <div className="flex justify-end bg-cyan-600 rounded-b-lg px-2 py-2">
                  <span
                    // TODO: Set the background color of the badge based on the boolean value of the post and the text of the badge based on the boolean value of the post
                    className={`badge ${backgroundColor} cursor-pointer text-[12px] font-bold text-white`}
                    onClick={() => handleMarkAsRead(post.id, cookie)}
                  >
                    {post.readBy === false && "Mark as read"}
                    {post.readBy === true && "Read"}
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
