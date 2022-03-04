import React, { useEffect, useState } from 'react';
import {  Button, Carousel, Form } from 'react-bootstrap';
import {  useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../redux/actions/authActions';
import { addComment, deletePost, getPostById } from '../../redux/actions/postActions';
import './PostDetails.css'

function PostDetails() {
    const post = useSelector(state=>state.postReducer.post)
    const isHome = useSelector(state=>state.postReducer.isHome)
    const user = useSelector(state=>state.authReducer.user)
    const auth = useSelector(state=>state.authReducer.auth)
    const UserById = useSelector(state=>state.authReducer.userById)
    const loading = useSelector(state=>state.postReducer.loading)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [comment, setComment] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPostById(id))
        if(!loading){
            dispatch(getUserById(post.user_id))
        }
        return ()=>{
            dispatch({type:"CLEAR_POST"})
        }
    }, [loading])

return <div className='postDetailBloc'>
{post && 
    <div>
        <div style={{display:'flex',gap:'20px'}}>
            <Carousel style={{width:'65%',height:'30rem'}}>
        {post.imagesUrl.map(image=>
        <Carousel.Item >
            <img  style={{width:'100%',height:'30rem'}}
            className="d-block w-100"
            src={`https://hungry-nobel-f450ba.netlify.app/uploads/${image}`}
            alt="First slide"
            />
        </Carousel.Item>)}
        </Carousel>
        </div>
        <div style={{marginTop:'30px',marginBottom:'15px'}}>
        <h2 style={{fontSize:'1.4em'}}>{post.locationType}</h2>
        <ul style={{fontWeight:'bold', gap:'30px',fontSize:'1.3em',display:'flex',flexWrap:'wrap'}}>
            <li>{post.piecesNbre}</li>
            <li>{post.surface}m2</li>
            <li>{post.price}DT</li>
        {post.meuble==="meublé"?<li>meublé</li>:null}
        {post.climatisation==="climatisé"?<li>climatisé</li>:null}
        </ul>
        <span style={{fontWeight:'bold',fontSize:'1.3em'}}> Adresse : </span>
        <span style={{fontSize:'1.2em'}}> {`${post.governate}, ${post.city}, ${post.location}`}  </span><br/>
        <div style={{marginTop:'10px'}}>
        <span style={{fontWeight:'bold',fontSize:'1.3em'}}> Contact : </span>
        <span style={{fontSize:'1.2em'}}> {UserById && UserById.contact} </span>
        </div>
        </div>
        <span style={{fontWeight:'bold',fontSize:'1.3em'}}>Description : </span><br/> 
        <span style={{fontSize:'1.2em'}}> {post.description} </span>

        {!isHome?<div style={{display:'flex', gap:'20px', marginTop:'20px'}}>
      <Button 
      onClick={()=>{
          dispatch(deletePost(post._id));
          navigate(user.role==="admin"?`/listUsers/userDetails/${UserById._id}`:'/mesAnnonces')}}>
          Supprimer l'annonce</Button>
      {user && user.role!="admin"?
      <Link to={`/editPost/${id}`}><Button>Modfier l'annonce</Button></Link>
      :null}
      </div>
      :null}


        <h2 
        style={{fontSize:'1.4em',width:'65%',paddingBottom:'2px',marginTop:'15px',borderBottom:'2px solid'}}>
            Commenatires</h2>
        {auth?
        <div style={{display:'flex', gap:'10px' }}>
        <Form.Control as="textarea" placeholder='taper un commentaire'
        value={comment}
        style={{width:'45%',height:'40px',marginBottom:'10px'}}
        onChange={(e)=>setComment(e.target.value)} />
        <Button style={{height:'40px'}}
        onClick={()=>{dispatch(addComment({comment},id));setComment('')}}>Ajouter commentaire </Button>
        </div>:null}

        {post.comments.map(comment=><div className='commentsBloc'>
            <span style={{fontWeight:'bold',color:'blue'}}>{`${comment.firstName} ${comment.lastName}`}</span><br/>
            {comment.comment}
        </div>)}
        
    </div>
} 
    </div>;
}

export default PostDetails;
