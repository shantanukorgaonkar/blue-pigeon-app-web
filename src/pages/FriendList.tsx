import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorSnackbar from '../components/ErrorSnackbar'
import { UserModel } from '../data/models/user.models'
import UserService from '../data/network/user/user.service'

const FriendList = () => {
    const [userId, setUserId] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error>()
    const [users, setUsers] = useState<UserModel[]>([])
    const [friends, setFriends] = useState<string[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        const service = new UserService()
        service.getAllUsers()
            .then((res) => {
                const data = res.data.filter((val) => val._id !== localStorage.getItem("id"))
                setUsers(data)
            })
            .catch((err) => setError(err))
        service.getFriends()
            .then((res) => {
                const data = res.data.filter((val) => val !== localStorage.getItem("id"))
                setFriends(data)
            })
            .catch((err) => setError(err))
    }, [])
    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            if (!userId) {
                throw new Error("userId cant be empty.")
            }
            const service = new UserService()
            service.addFriend(userId).then(() => window.alert("Success"))
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            if (error instanceof Error) {
                // console.log(error)
                setError(error)
            }
        }
    }
    return (
        <Grid container justifyContent="center" gap={4} height="100%">
            <Grid item xs={12} mt={4} padding={1}>
                <Grid container gap={4}>
                    <Link to='/post-feed'>Post Feed</Link>
                    <Link to='/complete-profile'>Profile Setup</Link>
                    <Link to='/friend-list'>Friend List</Link>
                </Grid>
            </Grid>

            <Grid item xs={12} mt={4}>
                <Typography variant='h4' textAlign="center">Add Friend</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography>List of users</Typography>
                {users.map((user) =>
                    <Grid>
                        <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                        <Typography>{user._id}</Typography>

                    </Grid>)}
            </Grid>
            <Grid item xs={4} sx={{ backgroundColor: "#FFFFFF", padding: 4 }}>
                <Grid container justifyContent="center" gap={2}>
                    <Typography>Add friend. Kindly add id of the user you want to send request. Reload page on success </Typography>
                    <Grid item xs={12}>
                        <TextField
                            margin='dense'
                            required
                            fullWidth
                            label='Username'
                            id="username"
                            name="username"
                            autoFocus
                            InputProps={{ sx: { borderRadius: "12px" } }}
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={4}>
                    <Grid container justifyContent="space-around" >
                        <Grid item xs={4}>
                            {isLoading ?
                                <Grid container justifyContent="center">
                                    <CircularProgress />
                                </Grid> :
                                <Button fullWidth variant='contained' onClick={() => handleSubmit()}>Add friend</Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Typography>List of friends</Typography>
                {friends.map((userId) =>
                    <Grid>
                        <Typography>{userId}</Typography>
                    </Grid>)}
            </Grid>
            <ErrorSnackbar error={error} setError={setError} />
        </Grid>
    )
}

export default FriendList