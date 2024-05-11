import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostService from '../data/network/post/post.service'
import { PostModel } from '../data/models/post.model'

const PostFeed = () => {
    const [posts,setPosts] = useState<PostModel[]>()
    const [error, setError] = useState<Error>()
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        const service = new PostService()
      
        service.getAllPosts().then((res) => {
            return setPosts(res.data)
        }).catch((error) => setError(error))
    }, [])
  return (
    <div>PostFeed</div>
  )
}

export default PostFeed