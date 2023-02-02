export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Post = {
    id: string;
    imgUrl: string;
    description: string;
    username: string;
};


