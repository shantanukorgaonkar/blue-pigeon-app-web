import { PostModel } from "../../models/post.model";
import BaseService from "../base.service";

class PostService extends BaseService {
    constructor() {
        super();
    }
    public async getAllPosts(): Promise<{ status: string, message: string, data: PostModel[] }> {
        const response = this.get('/api/v1/posts') as Promise<{ status: string, message: string, data: PostModel[] }>
        return response
    }

    public async createPost(media: File[], caption: string): Promise<{ status: string, message: string, data: PostModel[] }> {
        const response = this.post('/api/v1/posts/create', { caption, media }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }) as Promise<{ status: string, message: string, data: PostModel[] }>
        return response
    }
}

export default PostService