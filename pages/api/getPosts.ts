import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../redis'
import { Post } from '../../typings';

type Data = {
    posts: Post[];
};

type ErrorData = {
    body: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {
    if (req.method !== 'GET') {
        res.status(405).json({ body: 'Method Not Allowed' });
        return;
    }
       
    const postRes = await redis.hvals('posts');
    const posts: Post[] = postRes.map((post) => JSON.parse(post)).sort((a, b) => b.created_at - a.created_at);

    res.status(200).json({ posts });
}