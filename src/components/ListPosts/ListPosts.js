import React from 'react';
import {useSelector} from 'react-redux'
import Post from '../Post/Post';
import './ListPosts.css'

function ListPosts() {
    const posts = useSelector(state=>state.postReducer.posts)
    const filter = useSelector(state=>state.postReducer.filter)
  return <div id='listPostsBloc'>
      {posts && posts.filter(post=>(filter && filter.price?post.price<=filter.price:post)&&
      (filter && filter.governate?filter.governate===post.governate:post)&&
      (filter && filter.city?filter.city===post.city:post)&&
      (filter && filter.maison?post.locationType==="Maison":post)&&
      (filter && filter.appartement?post.locationType==="Appartement":post))
      .map(post=><Post post={post} />)}
  </div>;
}

export default ListPosts;
