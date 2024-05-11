import { PostModel } from "../../models/post.model";
import BaseService from "../base.service";

class PostService extends BaseService {
    constructor() {
        super();
    }
    public async getAllPosts(): Promise<{ status: string, message: string, data: PostModel }> {
        const response = this.get('/api/v1/posts') as Promise<{ status: string, message: string, data: PostModel }>
        return response
    }
}

export default PostService