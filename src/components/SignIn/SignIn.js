import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../redux/actions/authActions';
import './SignIn.css'

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  
  const errors = useSelector(state => state.authReducer.errors)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    errors && errors.map(error=>alert(error.msg))
    return ()=>{
      dispatch({type:"CLEARERRORS"})
    }
  }, [errors])
  

    return (
        <div id="container">
            <Form>
  <Form.Group className="mb-3" >
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" />
  </Form.Group>
  <Button variant="primary" onClick={(e)=>{e.preventDefault();dispatch(signIn({email,password},navigate))}} type="submit">
    Se connecter
  </Button>
</Form>
        </div>
    )
}

export default SignIn
