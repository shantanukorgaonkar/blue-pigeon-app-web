import { Autocomplete, Button, Chip, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorSnackbar from '../components/ErrorSnackbar'
import UserService from '../data/network/user/user.service'
import IndustriesService from '../data/network/industries/industries.service'
import InterestsService from '../data/network/interests/interests.service'
import { IndustriesModel } from '../data/models/industries.model'
import { InterestsModel } from '../data/models/interests.model'

const CompleteProfile = () => {
    const [username, setUsername] = useState("")
    const [selectedIndustries, setSelectedIndustries] = useState<IndustriesModel[]>([])
    const [selectedInterests, setSelectedInterests] = useState<InterestsModel[]>([])
    const [industries, setIndustries] = useState<IndustriesModel[]>([])
    const [interests, setInterests] = useState<InterestsModel[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error>()
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        const industryService = new IndustriesService()
        const interestService = new InterestsService()
        industryService.getIndustries().then((res) => {
            return setIndustries(res.data)
        }).catch((error) => setError(error))

        interestService.getInterests().then((res) => {
            return setInterests(res.data)
        }).catch((error) => setError(error))
    }, [])
    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            if (!username) {
                throw new Error("username cant be empty.")
            }

            if (selectedInterests.length < 3) {
                throw new Error("Minimum 3 interests required")
            }
            const service = new UserService()
            const industryIds = selectedIndustries.map((val) => val._id)
            const interestIds = selectedInterests.map((val) => val._id)
            const response = await service.updateUser(username, industryIds, interestIds)
            setIsLoading(false)
            navigate('/post-feed')
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
                <Typography variant='h4' textAlign="center">Set up profile</Typography>
            </Grid>
            <Grid item xs={4} sx={{ backgroundColor: "#FFFFFF", padding: 4 }}>
                <Grid container justifyContent="center" gap={2}>
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            forcePopupIcon={false}
                            value={selectedIndustries || []}
                            id="industriesAutocomplete"
                            options={industries}
                            onChange={(event, value) => setSelectedIndustries(value)}
                            renderTags={(tagValue, getTagProps) => {
                                return tagValue.map((option, index) => (
                                    <Chip {...getTagProps({ index })} key={option._id} label={option.name} />
                                ))
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Industries"
                                    // error={!!(touched.keywords && errors.keywords)}
                                    value={selectedIndustries || []}
                                    id="industries"
                                    name="industries"
                                    FormHelperTextProps={{ sx: { fontStyle: 'italic', fontWeight: 'bold', mt: 1 } }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>

                        <Autocomplete
                            multiple
                            forcePopupIcon={false}
                            value={selectedInterests || []}
                            id="interestsAutocomplete"
                            options={interests}
                            onChange={(event, value) => setSelectedInterests(value)}
                            renderTags={(tagValue, getTagProps) => {
                                return tagValue.map((option, index) => (
                                    <Chip {...getTagProps({ index })} key={option._id} label={option.name} />
                                ))
                            }}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Interests"
                                    // error={!!(touched.keywords && errors.keywords)}
                                    value={selectedInterests || []}
                                    id="interests"
                                    name="interests"
                                    FormHelperTextProps={{ sx: { fontStyle: 'italic', fontWeight: 'bold', mt: 1 } }}
                                />
                            )}
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
                                <Button fullWidth variant='contained' onClick={() => handleSubmit()}>Complete profile</Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={4}>
                            <Typography>Add friend. Kindly add id of the user you want to send request </Typography>
                </Grid>
            </Grid>
            <ErrorSnackbar error={error} setError={setError} />
        </Grid>
    )
}

export default CompleteProfile