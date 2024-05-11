import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorSnackbar from '../components/ErrorSnackbar'
import Post from '../components/post'
import { PostModel } from '../data/models/post.model'
import PostService from '../data/network/post/post.service'

const PostFeed = () => {
    const [posts, setPosts] = useState<PostModel[]>([])
    const [caption, setCaption] = useState<string>("")
    const [error, setError] = useState<Error>()
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [modalOpen, setModalOpen] = useState(false)
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
    const onModalClose = () => {
        setModalOpen(false)
    }
    const handleMediaUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        let files: File[] = []
        for (const file of e.target.files) {
            files.push(file)
        }
        setUploadedFiles(files)
    }

    const handleSubmit = () => {
        try {
            const service = new PostService()
            const response = service.createPost(uploadedFiles, caption)
            window.alert("Success!")
            setModalOpen(false)
        } catch (error: any) {
            setError(error)
        }
    }
    return (
        <Grid container gap={4} height="100%">
            <Grid item xs={12} mt={4} padding={1}>
                <Grid container gap={4}>
                    <Link to='/post-feed'>Post Feed</Link>
                    <Link to='/complete-profile'>Profile Setup</Link>
                    <Link to='/friend-list'>Friend List</Link>
                </Grid>
            </Grid>
            <Grid item xs={2} mt={2} padding={1}>
                <Button fullWidth variant='contained' onClick={() => setModalOpen(true)} >+ Create Post</Button>
            </Grid>
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
            <Modal
                open={modalOpen}
                onClose={onModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid item sx={{ width: "600px", backgroundColor: '#FFFFFF', minHeight: 400, padding: 2 }}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    margin='dense'
                                    fullWidth
                                    label='Caption'
                                    id="caption"
                                    name="caption"
                                    InputProps={{ sx: { borderRadius: "12px" } }}
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        {/* <Button
                            component="label"
                            variant="outlined"
                            startIcon={<UploadFileIcon />}
                        >
                            Choose Image
                            <input type="file" accept="image/*,video/*" hidden onChange={(e) => handleMediaUpload(e, "displayImage")} />
                       </Button> */}
                        <input type="file" accept="image/*,video/*" multiple onChange={(e) => handleMediaUpload(e)} />
                        <Grid item xs={3} mt={2}>
                            <Button fullWidth variant='contained' onClick={() => handleSubmit()} >Submit Post</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Grid >
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

export default PostFeed