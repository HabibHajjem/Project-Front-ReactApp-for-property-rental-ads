import React from 'react';
import {useDispatch} from 'react-redux'
import { deleteUser } from '../../redux/actions/authActions'
import {Link} from 'react-router-dom'
import './User.css'

function User({user}) {
  const dispatch = useDispatch()
  return <div >
    
      <div id='userBloc'>
      <Link to={`/listUsers/userDetails/${user._id}`} style={{textDecoration:'none',color:'inherit'}} >
      <h2>{`${user.firstName}  ${user.lastName}`}</h2>
      </Link>
      <button onClick={()=>dispatch(deleteUser(user._id))}>delete</button>
      </div>
    
  </div>;
}

export default User;
