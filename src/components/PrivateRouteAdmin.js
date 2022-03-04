import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { current } from '../redux/actions/authActions';



function PrivateRouteAdmin({children}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)
    const loading = useSelector(state=>state.authReducer.loading)
    const token = localStorage.getItem('token')
    useEffect(() => {
    dispatch(current())
    }, []);
    // return (user && user.role=="admin") || token?children:<Navigate to = '/' />
    return (
        loading?null:(user && user.role==="admin")?children:<Navigate to = '/' />
        )
}

export default PrivateRouteAdmin
