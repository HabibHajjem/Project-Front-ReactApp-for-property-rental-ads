import React, { useEffect, useState } from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, editUserPassword } from '../../redux/actions/authActions'
import './Profil.css'

function Profil() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)
    const errors = useSelector(state=>state.authReducer.errors)
    const show = useSelector(state=>state.postReducer.show)

    const [editFirstName, setEditFirstName] = useState(false)
    const [editLastName, setEditLastName] = useState(false)
    const [editContact, setEditContact] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const [editPassword, setEditPassword] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')

    

    const handleClose = () => dispatch({type:"TOGGLE_SHOW_FALSE"});

    const handleEditPassword = () => {
        dispatch(editUserPassword({password,newPassword}));
        setEditPassword(false)
        setPassword('')
        setnewPassword('')
    }

    useEffect(() => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setContact(user.contact)
    setEmail(user.email)
    errors && errors.map(error=>alert(error.msg))
    return ()=>{
        dispatch({type:"CLEARERRORS"})
      }
    }, [errors])
    
    return (
        <div id='profilContainer'>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>Votre mot de passe a été modifié avec succes </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    
            <h2>Informations personnelles  </h2>

            <h4>
                <div className='infoBloc'>
                    First Name :  {editFirstName?
                    <div>
                    <Form.Control type="txt" placeholder="" value={firstName} 
                    onChange={(e)=>{setFirstName(e.target.value)}}  />
                    </div>
                    :<span className='info'>{` ${firstName}`}</span>}
                </div> 
                {editFirstName?
                <div className='buttonsBloc'>
                <Button variant='primary' 
                onClick={()=>{dispatch(editUser({firstName}));setEditFirstName(false)}} >
                enregistrer </Button>
                <Button variant='secondary' 
                onClick={()=>{setEditFirstName(false);setFirstName(user.firstName)}} >
                    annuler </Button>
                </div>:
                <Button variant="secondary" onClick={()=>setEditFirstName(true)}>
                    <i class="bi bi-pencil-square"></i>
                </Button>} 
            </h4>

            <h4>
                <div className='infoBloc'>
                    Last Name :  {editLastName?
                    <div>
                    <Form.Control type="txt" placeholder="" value={lastName} 
                    onChange={(e)=>setLastName(e.target.value)}  />
                    </div>
                    :<span className='info'>{` ${lastName}`}</span>}
                </div> 
                {editLastName?
                <div className='buttonsBloc'>
                <Button variant='primary'
                onClick={()=>{dispatch(editUser({lastName}));setEditLastName(false)}}>enregistrer </Button>
                <Button variant='secondary' onClick={()=>setEditLastName(false)} >annuler </Button>
                </div>:
                <Button variant="secondary" onClick={()=>setEditLastName(true)}>
                    <i class="bi bi-pencil-square"></i>
                </Button>} 
            </h4>

            <h4>
                <div className='infoBloc'>
                    Contact :  {editContact?
                    <div>
                    <Form.Control type="txt" placeholder="" value={contact}
                    onChange={(e)=>setContact(e.target.value)}    />
                    </div>
                    :<span className='info'>{` ${user.contact}`}</span>}
                </div> 
                {editContact?
                <div className='buttonsBloc'>
                <Button variant='primary'
                onClick={()=>{dispatch(editUser({contact}));setEditContact(false)}}>enregistrer </Button>
                <Button variant='secondary' onClick={()=>setEditContact(false)} >annuler </Button>
                </div>:
                <Button variant="secondary" onClick={()=>setEditContact(true)}>
                    <i class="bi bi-pencil-square"></i>
                </Button>} 
            </h4>
            
            <h4>
                <div className='infoBloc'>
                    E-mail :  {editEmail?
                    <div>
                    <Form.Control type="txt" placeholder="" value={email} 
                    onChange={(e)=>setEmail(e.target.value)}  />
                    </div>
                    :<span className='info'>{` ${email}`}</span>}
                </div> 
                {editEmail?
                <div className='buttonsBloc'>
                <Button variant='primary'
                onClick={()=>{dispatch(editUser({email}));setEditEmail(false)}}>enregistrer </Button>
                <Button variant='secondary' onClick={()=>setEditEmail(false)} >annuler </Button>
                </div>:
                <Button variant="secondary" onClick={()=>setEditEmail(true)}>
                    <i class="bi bi-pencil-square"></i>
                </Button>} 
            </h4>

            <h4 style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                Mot de passe  
                <Button variant="secondary" onClick={()=>setEditPassword(!editPassword)}
                >{!editPassword?<i class="bi bi-pencil-square"></i>: 'annuler'}</Button>
                </div>
                {editPassword?
                <div id="passwordBloc">
                <form style={{fontSize:'0.7em',paddingLeft:'130px',marginTop:'10px'}}>
                    <div style={{display:'flex',gap:'80px',marginBottom:'10px'}}>
                    <label>mot de passe</label>
                    <input type="password" value={password} 
                    onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>
                    <div style={{display:'flex',gap:'10px'}}>
                    <label>nouveau mot de passe</label>
                    <input type="password" value={newPassword}
                    onChange={(e)=>setnewPassword(e.target.value)}></input>
                    </div>
                    <Button variant="secondary"
                    style={{marginLeft:'150px',marginTop:'10px'}}
                    onClick={()=>{handleEditPassword()}} >
                    enregistrer</Button>
                </form>
                </div>:null}
            </h4> 
        </div>
    )
}

export default Profil
