export class PostModel {
    _id: string;
    media: string[];
    caption: string;
    user: string;
    createdAt: string;
    updatedAt: string;
}

export enum MediaType {
    IMAGE = 'image',
    VIDEO = 'video',
}