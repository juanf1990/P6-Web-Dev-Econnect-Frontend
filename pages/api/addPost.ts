import type { NextApiRequest, NextApiResponse } from 'next';
import { serverPusher } from '../../pusher';
import redis from '../../redis'
import { Post } from '../../typings';

type Data = {
    post: Post;
};

type ErrorData = {
    body: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {
    if (req.method !== 'POST') {
        res.status(405).json({ body: 'Method Not Allowed' });
        return;
    }
        const { post } = req.body;

        const newPost = {
            ...post,
            created_at: Date.now(),
        };

        await redis.hset('posts', post.id, JSON.stringify(newPost));
        serverPusher.trigger('posts', 'new-post', newPost);

    res.status(200).json({ post: newPost });
}