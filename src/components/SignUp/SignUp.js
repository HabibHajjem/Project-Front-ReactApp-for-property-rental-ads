import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../redux/actions/authActions';
import './SignUp.css'

function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector(state => state.authReducer.errors)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('');
  
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
    <Form.Label>First name</Form.Label>
    <Form.Control type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter first name" />
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Last name</Form.Label>
    <Form.Control type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Enter last name" />
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Numéro de télephone</Form.Label>
    <Form.Control type="text" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="Enter num de tel" />
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit" onClick={(e)=>{e.preventDefault();dispatch(signUp({firstName,lastName,email,contact,password},navigate))}} >
    S'inscrire
  </Button>
</Form>
        </div>
    )
}

export default SignUp
