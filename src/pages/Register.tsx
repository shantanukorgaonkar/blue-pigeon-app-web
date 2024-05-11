import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';

function App() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleSubmit = () => {
        setIsLoading(false)
    }

    return (
        <Grid container justifyContent="center" gap={4} height="100%">
            <Grid item xs={12} mt={4}>
                <Typography variant='h4' textAlign="center">Register Page</Typography>
            </Grid>
            <Grid item xs={6} sx={{ backgroundColor: "#FFFFFF", padding: 4 }}>
                <Grid container justifyContent="space-between">
                    <Grid item xs={5}>
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
                    <Grid item xs={5}>
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
                    <Grid item xs={5}>
                        <TextField margin='dense'
                            required
                            fullWidth
                            label='First Name'
                            id="email"
                            name="email"
                            autoFocus
                            InputProps={{ sx: { borderRadius: "12px" } }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField margin='dense'
                            required
                            fullWidth
                            label='Last Name'
                            id="email"
                            name="email"
                            autoFocus
                            InputProps={{ sx: { borderRadius: "12px" } }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={4}>
                    <Grid container justifyContent="center" >
                        <Grid item xs={4}>
                            {isLoading ?
                                <Grid container justifyContent="center">
                                    <CircularProgress />
                                </Grid> :
                                <Button fullWidth variant='contained' onClick={handleSubmit}> Login</Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
