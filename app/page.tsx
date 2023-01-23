import { Post } from "../typings";
import PostInput from "./PostInput";
import PostList from "./PostList";
import { unstable_getServerSession } from "next-auth";
import { Providers } from "./providers";

async function Homepage() {
  const data = await fetch(`http://localhost:3000/api/getPosts`).then((res) =>
    res.json()
  );
  const posts: Post[] = data.posts;
  const session = await unstable_getServerSession();
  return (
    <Providers session={session}>
      <main className=" bg-gray-500">
        <PostList initialPosts={posts} />
        <PostInput session={session} />
      </main>
    </Providers>
  );
}

export default Homepage;
