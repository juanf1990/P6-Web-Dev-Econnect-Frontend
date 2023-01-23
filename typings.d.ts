export type Post = {
    id: string;
    imgUrl: string;
    message: string;
    created_at: number;
    userid: string;
};

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: number;
};
