import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { current, getUsers } from '../../redux/actions/authActions';
import User from '../User/User';
import './ListUsers.css'


function ListUsers() {
  const dispatch = useDispatch()
  const users = useSelector(state=>state.authReducer.users)
    useEffect(() => {
      dispatch({type:"TOGGLE_HOME_FALSE"})
      dispatch(getUsers())
      dispatch(current())
    }, []);
    
  return <div id='listUsersBloc'>
    <h2>Liste des utilisateurs</h2>
    {users && users.map(user=>user.role!="admin"?
    <h4>
      <span>
      <Link  style={{color:'inherit',textDecoration:'none'}}
      onClick={()=>dispatch({type:"TOGGLE_PENDING_TRUE"})}
      to={`/listUsers/userDetails/${user._id}`}>
        {`${user.firstName} ${user.lastName}`}
      </Link>
      </span>
      </h4>
    :null)}
    
  </div>;
}

export default ListUsers;
