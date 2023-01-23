"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { Post } from "../typings";
import fetcher from "../utils/fetchPosts";
import PostComponent from "./PostComponent";

type Props = {
  initialPosts: Post[];
};

function PostList({ initialPosts }: Props) {
  const {
    data: posts,
    error,
    mutate,
  } = useSWR<Post[]>("/api/getPosts", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("posts");

    channel.bind("new-post", async (data: Post) => {
      // if you send a post, no need to update the cache
      if (posts?.find((post) => post.id === data.id)) return;

      if (!posts) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...posts!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [posts, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 maw-w-2xl mx-auto">
      {(posts || initialPosts).map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
