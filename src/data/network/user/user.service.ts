import { PostModel } from "../../models/post.model";
import { UserModel } from "../../models/user.models";
import BaseService from "../base.service";

class UserService extends BaseService {
    constructor() {
        super();
    }
    public async updateUser(username: string, industries: string[], interests: string[]): Promise<{ status: string, message: string, data: UserModel }> {
        const response = this.patch('/api/v1/users/update', { username, industries, interests }) as Promise<{ status: string, message: string, data: UserModel }>
        return response
    }

    public async getUserProfile(): Promise<{ status: string, message: string, data: UserModel }> {
        return this.get('/api/v1/users/me') as Promise<{ status: string, message: string, data: UserModel }>
    }
    public async getFriends(): Promise<{ status: string, message: string, data: UserModel }> {
        return this.get('/api/v1/users/friends') as Promise<{ status: string, message: string, data: UserModel }>
    }
    public async addFriend(data: any): Promise<{ status: string, message: string, data: { id: string, senderId: string, receiverId: string } }> {
        return this.post('/api/v1/users/friends', data) as Promise<{ status: string, message: string, data: { id: string, senderId: string, receiverId: string } }>
    }
    public async getPosts(): Promise<{ status: string, message: string, data: PostModel }> {
        return this.get('/api/v1/users/posts') as Promise<{ status: string, message: string, data: PostModel }>
    }
}

export default UserService