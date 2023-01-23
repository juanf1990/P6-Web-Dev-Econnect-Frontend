"use client";

import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Post } from "../typings";
import userSWR from "swr";
import fetcher from "../utils/fetchPosts";
import { unstable_getServerSession } from "next-auth";

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

function PostInput({ session }: Props) {
  const [input, setInput] = useState("");
  const { data: posts, error, mutate } = userSWR("/api/getPosts", fetcher);

  console.log(posts);

  const addPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const postToSend = input;

    setInput("");

    const id = uuid();

    const post: Post = {
      id,
      imgUrl: postToSend,
      message: postToSend,
      created_at: Date.now(),
      userid: session.user.email!,
    };

    const uploadMessagetoDB = async () => {
      const data = await fetch("/api/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post,
        }),
      }).then((res) => res.json());

      return [data.post, ...posts!];
    };

    await mutate(uploadMessagetoDB, {
      optimisticData: [post, ...posts!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addPost}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 border-t border-gray-100 bg-white space-between"
    >
      <input
        type="file"
        name="file"
        id="file"
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      ></input>
      <input
        type="text"
        value={input}
        disabled={!session}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default PostInput;
