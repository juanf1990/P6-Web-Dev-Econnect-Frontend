import { useState, useEffect } from "react";
import Image from "next/image";
import { Post } from "../../typings";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("badge-primary");
  const [readBy, setReadBy] = useState(["Mark as read"]);
  const cookie = Cookies.get("userId");
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:8001/api/posts/");
      const data = await res.json();
      const posts = data;
      setPosts(posts);
    };

    if (!cookie) {
      router.push("/");
    } else {
      fetchPosts();
    }
  }, []);

  const handleMarkAsRead = async (id: string) => {
    const readBy = JSON.stringify({ readBy: cookie });
    const res = await fetch(`http://localhost:8001/api/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: readBy,
    });

    if (res.status === 200) {
      // Check if user is already in the readBy array and change the badge color
      const post: any = posts.find((post: Post) => post.id === id);
      if (post.readBy.includes(cookie)) {
        setBackgroundColor("badge-secondary");
        setReadBy(["Read"]);
      } else {
        setBackgroundColor("badge-primary");
        setReadBy(["Mark as read"]);
      }
    } else {
      console.log("error on submitting");
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
        <div className="posts-container flex flex-col gap-4">
          {posts.map((post: Post) => (
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
                    className={`badge ${backgroundColor} cursor-pointer text-[12px] font-bold`}
                    onClick={() => handleMarkAsRead(post.id)}
                  >
                    {readBy}
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
