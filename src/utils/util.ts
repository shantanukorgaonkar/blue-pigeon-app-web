import { MediaType, PostModel } from "../data/models/post.model"

export const getMediaURL = (fileName: string) => {
    if (!fileName) {
        return ""
    }
    const url = `http://localhost:3000/api/v1/media/${fileName}`
    return url

}

export const getMediaType = (fileName: string) => {
    const videoMimeTypes = ['video/mp4', 'video/mov', 'video/wmv', 'video/gif', 'video/quicktime'];
    const imageTypes = ['jpg', 'jpeg', 'png']
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (imageTypes.includes(extension)) {
        return MediaType.IMAGE
    }
    else if (videoMimeTypes.includes(extension)) {
        return MediaType.VIDEO
    }
}