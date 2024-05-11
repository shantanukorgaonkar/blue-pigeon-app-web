import { PostModel } from "../data/models/post.model"

export const getMediaURL = (post?: PostModel) => {
    if (!post) {
        return ""
    }
    const url = `http://localhost:3000/api/v1/media/${post.media}`
    return url

}