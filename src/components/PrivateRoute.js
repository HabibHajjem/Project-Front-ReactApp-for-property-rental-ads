import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { current } from '../redux/actions/authActions'


function PrivateRoute({children}) {
    const auth = useSelector(state => state.authReducer.auth)
    const loading = useSelector(state=>state.authReducer.loading)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    useEffect(() => {
        dispatch(current())
        }, []);
    return(
        loading?null:auth?children:<Navigate to = '/signIn' />
    ) 
}

export default PrivateRoute
