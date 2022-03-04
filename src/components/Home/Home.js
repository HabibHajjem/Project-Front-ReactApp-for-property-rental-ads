import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts } from '../../redux/actions/postActions'
import Filter from '../Filter/Filter'
import ListPosts from '../ListPosts/ListPosts'
import './Home.css'

function Home() {
    const user = useSelector(state => state.authReducer)
    const posts = useSelector(state=>state.postReducer.posts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"TOGGLE_HOME_TRUE"})
        dispatch(getPosts())
      }, [])
    return (
        <div id='container2'>
            
            <Carousel style={{width:'55%', margin:'auto', marginTop:'30px'}}
            fade={true} indicators={false}>
            {posts && posts.map(post=>
                <Carousel.Item>
                    <Link to={`/postDetails/${post._id}`} 
            onClick={()=>dispatch({type:"TOGGLE_LOADING_TRUE"})} >
                    <img
                    style={{width:'50rem',height:'25rem',borderRadius:'20px 20px'}}
                    className="d-block w-100"
                    src={`http://localhost:3000/uploads/${post.imagesUrl[0]}`}
                    alt="First slide"
                    />
                    </Link>
                </Carousel.Item>
                
                )}
                </Carousel>
                <Filter/>

            <ListPosts/>
        </div>
    )
}

export default Home
