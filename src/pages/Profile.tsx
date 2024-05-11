import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Profile = () => {

    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])
    return (
        <div>Profile</div>
    )
}

export default Profile