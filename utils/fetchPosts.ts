import { Post } from '../typings'

const fetcher = async () => {
    const res = await fetch ('/api/getPosts');
    const data = await res.json();
    const posts: Post[] = data.posts;

    return posts;
};

export default fetcher;