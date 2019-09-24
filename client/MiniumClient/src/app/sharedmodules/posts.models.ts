import { User } from './user.models'

export class Post{
    _id: string
    title: string
    content: String
    user: User
    highFives: HighFive[]
    createdAt: Date
    categories: string[]
    comments: Comment[]

    constructor(){
        this.highFives = []
        this.categories = []
        this.comments = []
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
     
}
