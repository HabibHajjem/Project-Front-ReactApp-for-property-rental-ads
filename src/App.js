import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBare from './components/navbar/Navbar';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home'
import Profil from './components/Profil/Profil';
import PrivateRoute from './components/PrivateRoute';
import LoginRegister from './components/Login-register/LoginRegister';
import AddPost from './components/AddPost/AddPost';
import MesAnnonces from './components/MesAnnonces/MesAnnonces';
import PostDetails from './components/PostDetails.js/PostDetails';
import ListUsers from './components/ListUsers/ListUsers';
import UserDetails from './components/UserDetails.js/UserDetails';
import EditPost from './components/EditPost/EditPost';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import Succes from './components/Succes/Succes';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <NavBare/>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/loginRegister' element={<LoginRegister/>} ></Route>
        <Route path='/signIn' element={<SignIn/>} ></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/addPost' element={<AddPost/>} ></Route>
        <Route path='/addPost/succes' element={<Succes/>}></Route>
        <Route path='/editPost/:id' element={<EditPost/>} ></Route>
        <Route path='/mesAnnonces' element={<MesAnnonces/>} ></Route>
        <Route path='/postDetails/:id' element={<PostDetails/>} ></Route>
        <Route path='/listUsers/userDetails/:id' element={<UserDetails/>} ></Route>
        <Route path='/listUsers' 
        element={
        <PrivateRouteAdmin>
        <ListUsers/>
        </PrivateRouteAdmin>} >
        </Route>
        <Route path='/profil' 
        element={
        <PrivateRoute>
        <Profil/>
        </PrivateRoute>
      }></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
