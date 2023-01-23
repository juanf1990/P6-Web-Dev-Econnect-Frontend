import Image from "next/image";
import { Post } from "../typings";
import { useSession } from "next-auth/react";
import TimeAgo from "timeago-react";

type Props = {
  post: Post;
};

function PostComponent({ post }: Props) {
  const { data: session } = useSession();
  const isUser = session?.user?.email! === post.userid;

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          height={100}
          width={100}
          src={post.imgUrl}
          alt="User Image"
        />
      </div>

      <div>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? "bg-cyan-400 ml-auto order-2" : "bg-gray-200"
            }`}
          >
            <p>{post.message}</p>
          </div>

          <p
            className={`text-[0.65rem] italic px2 text-gray-300 ${
              isUser && "text-right"
            }`}
          >
            <TimeAgo datetime={post.created_at} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostComponent;
