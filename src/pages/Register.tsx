import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import UserAuthService from '../data/network/user/user.auth.service';
import ErrorSnackbar from '../components/ErrorSnackbar';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState<Error>()

    const navigate = useNavigate()
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            if (!email || !password || !firstName || !lastName) {
                throw new Error("Values cant be empty.")
            }
            const service = new UserAuthService()
            const response = await service.registerUser(email, password, firstName, lastName)
            localStorage.setItem('id', response.data.id.toString());
            localStorage.setItem('token', response.data.token);
            setIsLoading(false)
            navigate('/profile')
        } catch (error) {
            setIsLoading(false)
            if (error instanceof Error) {
                // console.log(error)
                setError(error)
            }
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/profile')
        }
    }, [])

    return (
        <Grid container justifyContent="center" gap={4} height="100%">
            <Grid item xs={12} mt={4}>
                <Typography variant='h4' textAlign="center">Register Page</Typography>
            </Grid>
            <Grid item xs={4} sx={{ backgroundColor: "#FFFFFF", padding: 4 }}>
                <Grid container justifyContent="space-between">
                    <Grid item xs={5}>
                        <TextField margin='dense'
                            required
                            fullWidth
                            label='First Name'
                            id="firstName"
                            name="firstName"
                            autoFocus
                            InputProps={{ sx: { borderRadius: "12px" } }}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField margin='dense'
                            required
                            fullWidth
                            label='Last Name'
                            id="lastName"
                            name="lastName"
                            autoFocus
                            InputProps={{ sx: { borderRadius: "12px" } }}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField margin='dense'
                            required
                            fullWidth
                            label='Email'
                            id="email"
                            name="email"
                            autoFocus
                            InputProps={{ sx: { borderRadius: "12px" } }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin='dense'
                            required
                            fullWidth
                            label="Password"
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                sx: { borderRadius: "12px" },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
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
                                <Button fullWidth variant='contained' onClick={() => handleSubmit()}>Register</Button>
                            }
                        </Grid>
                        <Grid item xs={4}>
                            <Button fullWidth variant='contained' onClick={() => navigate('/')}>Go to login</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ErrorSnackbar error={error} setError={setError} />
        </Grid>
    );
}

export default Register;
