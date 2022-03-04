import React, { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link,  useNavigate } from 'react-router-dom'
import { current } from '../../redux/actions/authActions'
import './Navbar.css'

function NavBare() {

  const user = useSelector(state => state.authReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(current())
  }, [])
    return (
        <div>
          <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand   >My Project</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    {user.auth?
      <Nav className="me-auto">
        <Nav.Link as={Link} to='/' > Home </Nav.Link>
        <Nav.Link as={Link} to={user.auth?'/addPost':'/loginRegister'} > Ajouter une annonce </Nav.Link>
        <Nav.Link as={Link} to='/profil' > Profil </Nav.Link>
        {user.user.role==="admin"?
        <Nav.Link as={Link} to='/listUsers' > Listes des utilisateurs </Nav.Link>:
        <Nav.Link as={Link} to='/mesAnnonces' > Mes annonces </Nav.Link>}
      </Nav>:
      <Nav className="me-auto">
        <Nav.Link as={Link} to='/' > Home </Nav.Link>
        <Nav.Link as={Link} to={user.auth?'/addPost':'/loginRegister'} > Ajouter une annonce </Nav.Link>
      </Nav>
      }
      {user.auth?
        <Nav>
        <Navbar.Text style={{marginRight:'20px'}}>
        Bienvenue <span style={{color:'blue'}}>{user.user.firstName}</span>
        </Navbar.Text>
        <Nav.Link 
        onClick={(e)=>{e.preventDefault();dispatch({type:"LOG_OUT"});navigate('/');}}>
        Se déconnecter </Nav.Link>
        </Nav>
        :<Nav>
        <Nav.Link as={Link} to='/signUp' > S'inscrire </Nav.Link>
        <Nav.Link as={Link} to='/signIn' > Se connecter </Nav.Link>
        </Nav>}
      </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    )
}

export default NavBare
