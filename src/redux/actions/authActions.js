import axios from "axios"

export const signUp = (newUser,navigate) => async(dispatch)=>{
    try {
        const res = await axios.post('https://gmcmyprojectmern.herokuapp.com/api/signUp', newUser)
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
        const res = await axios.get('https://gmcmyprojectmern.herokuapp.com/api/users', config)
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
        await axios.delete(`https://gmcmyprojectmern.herokuapp.com/api/users/deleteUser/${id}`,config)
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
        const res = await axios.get(`https://gmcmyprojectmern.herokuapp.com/api/users/${id}`,config)
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
        const res = await axios.get(`https://gmcmyprojectmern.herokuapp.com/api/listUsers/${id}`,config)
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
        await axios.put('https://gmcmyprojectmern.herokuapp.com/api/editUser',update,config)
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
        await axios.put('https://gmcmyprojectmern.herokuapp.com/api/editPassword',update,config)
        dispatch(current())
        dispatch({type:"TOGGLE_SHOW_TRUE"})
    } catch (error) {
        dispatch({type:"FAIL",payload:error.response.data})
    }
}