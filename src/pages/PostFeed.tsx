import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostService from '../data/network/post/post.service'
import { PostModel } from '../data/models/post.model'
import { Grid } from '@mui/material'
import ErrorSnackbar from '../components/ErrorSnackbar'
import Post from '../components/post'

const PostFeed = () => {
    const [posts, setPosts] = useState<PostModel[]>([])
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
        <Grid container justifyContent="center" gap={4} height="100%">
            {
                posts.map((value, key) => {
                    return (<Grid key={key} item xs={12}>
                        <Grid container justifyContent="center" >
                            <Post
                                post={value} />
                        </Grid>
                    </Grid>)
                })
            }
            <ErrorSnackbar error={error} setError={setError} />
        </Grid>
    )
}

export default PostFeed