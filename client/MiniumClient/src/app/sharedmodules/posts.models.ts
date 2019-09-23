import { User } from './user.models'

export class Post{
    title: string
    description: String
    user: User
    highFives: HighFive[]
    createdAt: Date
    categories: string[]
    comments: Comment[]

    constructor(){
        this.highFives = []
        this.categories = []
    }
}

export class HighFive{
    createdAt: Date
    user: User
}
 
export class Comment{
    body: string
    user: any
    createdAt: Date
    replyies: Comment[]
}
