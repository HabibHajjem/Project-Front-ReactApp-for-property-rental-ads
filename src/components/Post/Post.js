import React from 'react';
import {Card, Carousel} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import './Post.css'

function Post({post}) {
  
  const dispatch = useDispatch()

  return <div >
  
    <Card style={{ width: '80%',height:'20rem' }} >
    <Link to={`/postDetails/${post._id}`} 
  onClick={()=>dispatch({type:"TOGGLE_LOADING_TRUE"})}
  style={{textDecoration:'none',color:'inherit'}}>
      <div style={{ display:'flex'}}>
        <Carousel style={{width:'65%'}}
        controls={post.imagesUrl.length===1?false:true} 
        indicators={post.imagesUrl.length===1?false:true} >
        {post.imagesUrl.map(image=>
          <Carousel.Item >
            <img  style={{width:'100%',height:'20rem'}}
            className="d-block w-100"
            src={image}
            alt="First slide"
            />
          </Carousel.Item>)}
        </Carousel>
        <Card.Body style={{width:'35%'}}>
          <div 
          style={{display:'flex',width:'100%',height:'100%',flexDirection:'column',justifyContent:'center'}}>
          <Card.Title style={{fontWeight:'bold', fontSize:'1.2em',textAlign:'center'}}>
            {`${post.governate}, ${post.city}`}
            </Card.Title >
          <Card.Title style={{fontWeight:'bold', fontSize:'1.2em',textAlign:'center'}}>
            {post.locationType}
            </Card.Title>
          <Card.Text style={{display:'flex',width:'100%',flexDirection:'column',gap:'10px',textAlign:'center'}}>
            <ul style={{fontWeight:'bold', gap:'25px',fontSize:'1.1em',display:'flex',flexWrap:'wrap'}}>
              <li>{post.piecesNbre}</li>
              <li>{post.surface}m2</li>
              <li>{post.price}DT</li>
            </ul>
          </Card.Text>
          </div>
        </Card.Body>
      </div>
      </Link>
    </Card>
  
  </div>;
}

export default Post;
