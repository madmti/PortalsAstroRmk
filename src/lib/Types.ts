
export type UserLock = {
    _id: String,
    name: String,
    email: String,
    password: String,
    isSuper: boolean
};

export type Message = {
    _id: String,
    from: String,
    author: Author,
    content: String,
    date: Date
}

export type Author = {
    _id: String,
    alias: String | null,
    name: String
}

export type Channel = {
    _id: String,
    from: String,
    name: String,
    is: 'text' | 'voice' | 'video'
    history: Message[] | null
}

export type Server = {
    _id: String,
    isPublic: boolean,
    key: string | null,
    name: String,
    channels: Channel[] | null,
    description: string | null,
    super: UserData | String | null
}

export type UserData = {
    _id: String,
    alias: String | null,
    name: String | null,
    imgUrl: String | null,
    servers: Server[] | null,
    created: Number
}