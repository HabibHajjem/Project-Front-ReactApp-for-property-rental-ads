import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getMyPosts } from '../../redux/actions/postActions';
import Post from '../Post/Post'
import './MesAnnonces.css'

function MesAnnonces() {
    const myposts = useSelector(state=>state.postReducer.myposts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"TOGGLE_HOME_FALSE"})
        dispatch(getMyPosts())
    }, []);
  return <div id='mesAnnoncesBloc'>
      {myposts.map(post=> <Post post={post} />)}
  </div>;
}

export default MesAnnonces;
