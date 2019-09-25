import { User } from './user.models'

export class Post{
    _id: string
    title: string
    subTitle: string
    content: String
    user: User
    highFives: HighFive[]
    createdAt: Date
    category: string[]
    comments: Comment[]

    constructor(){
        this.highFives = []
        this.category = []
        this.comments = []
    }
}

export class HighFive{
    createdAt: Date
    user: User
    
}
 
export class Comment{
    _id: string
    body: string
    user: any
    createdAt: Date
    highFives: []
}
