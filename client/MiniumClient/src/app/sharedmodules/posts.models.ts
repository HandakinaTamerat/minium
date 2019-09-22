export class Post{
    title: string
    description: String
    user: any
    highFives: HighFive[]
    createdAt: Date
}

export class HighFive{
    createdAt: Date
    user: any
}
 
export class Comment{
    body: string
    user: any
    createdAt: Date
    replyies: Comment[]
}
