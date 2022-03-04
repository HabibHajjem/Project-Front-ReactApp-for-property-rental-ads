import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getPostsUser, getUserById } from '../../redux/actions/authActions';
import Post from '../Post/Post';
import './UserDetails.css'

function UserDetails() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const posts = useSelector(state=>state.authReducer.userPosts)
    const user = useSelector(state=>state.authReducer.userById)
    const pending = useSelector(state=>state.postReducer.pending)
    const {id} = useParams()
    useEffect(() => {
        dispatch(getUserById(id))
        dispatch(getPostsUser(id))
        return ()=>{
            dispatch({type:"CLEAR_USERPOSTS"})
        }
    }, []);
    
return <div id='userDetailBloc'>
    {pending?null:
    <div>
        <h2>
            {user && `${user.firstName} ${user.lastName}`}
            <Button variant='secondary'
            onClick={()=>dispatch(deleteUser(user._id,navigate))}>supprimer utilisateur</Button>
            </h2>
        <div id='postsBloc'>
        {posts && posts.map(post=><Post post={post}/>)}
        </div>
    </div>}
</div>};


export default UserDetails;
