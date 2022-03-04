import axios from "axios"

export const signUp = (newUser,navigate) => async(dispatch)=>{
    try {
        const res = await axios.post('/signUp', newUser)
        dispatch({type:"SIGN_UP", payload: res.data})
        navigate('/')
    } catch (error) {
        dispatch({type:"FAIL", payload: error.response.data})

    }
}

export const signIn = (userInfo,navigate) => async(dispatch) => {
    try {
        const res = await axios.post('https://gmcmyprojectmern.herokuapp.com/api/signIn',userInfo)
        dispatch({type : "SIGN_IN", payload : res.data})
        navigate('/')
    } catch (error) {
        dispatch({type:"FAIL", payload: error.response.data})
    }
}

export const current = () => async(dispatch) =>{
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        const res = await axios.get('https://gmcmyprojectmern.herokuapp.com/api/current', config)
        dispatch({type : "CURRENT", payload:res.data})
        dispatch({type:"TOGGLE_LOADING_FALSE"})
    } catch (error) {
        console.log("error server")
        dispatch({type:"TOGGLE_LOADING_FALSE"})
    }
}

export const getUsers = () => async (dispatch) => {
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        const res = await axios.get('/users', config)
        dispatch({type:"GET_USERS", payload:res.data.users})
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = (id,navigate) => async (dispatch) =>{
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        await axios.delete(`/users/deleteUser/${id}`,config)
        dispatch(getUsers())
        navigate('/listUsers')
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = (id) => async(dispatch)=>{
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        const res = await axios.get(`/users/${id}`,config)
        dispatch({type:"GET_USER", payload:res.data.user})
        dispatch({type:"TOGGLE_LOADING"})
        dispatch({type:"TOGGLE_PENDING_FALSE"})
    } catch (error) {
        console.log(error)
    }
}

export const getPostsUser = (id) => async (dispatch) =>{
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        const res = await axios.get(`/listUsers/${id}`,config)
        console.log(res.data.posts)
        dispatch({type:"GET_USERPOSTS", payload:res.data.posts})
    } catch (error) {
        console.log(error);
    }
}

export const editUser = (update) => async (dispatch) => {
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        await axios.put('/editUser',update,config)
        dispatch(current())
    } catch (error) {
        dispatch({type:"FAIL",payload:error.response.data})
    }
}

export const editUserPassword = (update) => async (dispatch) => {
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        await axios.put('/editPassword',update,config)
        dispatch(current())
        dispatch({type:"TOGGLE_SHOW_TRUE"})
    } catch (error) {
        dispatch({type:"FAIL",payload:error.response.data})
    }
}