import React from 'react';
import { Link } from 'react-router-dom';
import './LoginRegister.css'

function LoginRegister() {
  return <div id='container' >
   Bienvenue à My Project !<br/>
   Pour déposer une annonce, vous devrez avoir un compte.
   <div id='btnBloc'>
   <Link to='/signUp'><button className='button'>Créer un compte </button></Link>
   <Link to='/signIn'><button className='button'>Me connecter</button></Link>
   </div>
  </div>;
}

export default LoginRegister;
