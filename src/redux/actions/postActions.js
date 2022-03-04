import axios from 'axios'

export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('https://gmcmyprojectmern.herokuapp.com/api/posts')
        dispatch({type:"GET_POSTS", payload:res.data.posts})
    } catch (error) {
        console.log(error);
    }
}

export const addPost = (newPost,navigate) => async(dispatch) =>{
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        await axios.post('https://gmcmyprojectmern.herokuapp.com/api/posts/addPost', newPost, config)
        dispatch(getPosts())
        navigate('/addPost/succes')
    } catch (error) {
        dispatch({type:"FAIL", payload:error.response.data})
    }
}

export const getMyPosts = () => async (dispatch) => {
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    
    try {
        const res = await axios.get('https://gmcmyprojectmern.herokuapp.com/api/myPosts', config)
        dispatch({type:"GET_MYPOSTS", payload: res.data.posts})
    } catch (error) {
        
    }
}

export const getPostById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`https://gmcmyprojectmern.herokuapp.com/api/posts/${id}`)
        await dispatch({type:"GET_POST_BY_ID", payload: res.data.post})
        dispatch({type:"TOGGLE_LOADING"})
    } catch (error) {
        console.log(error);
    }
}

export const addComment = (comment,id) => async (dispatch) => {
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        await axios.put(`https://gmcmyprojectmern.herokuapp.com/api/posts/addComment/${id}`, comment, config)
        dispatch(getPostById(id))
        dispatch(getPosts())
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id,navigate) => async (dispatch) => {
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        await axios.delete(`https://gmcmyprojectmern.herokuapp.com/api/posts/deletePost/${id}`,config)
        navigate('/mesAnnonces')
        dispatch(getPosts())
    } catch (error) {
        console.log(error);
    }
}

export const editPost = (id,info,navigate) => async (dispatch) => {
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        await axios.put(`https://gmcmyprojectmern.herokuapp.com/api/posts/editPost/${id}`,info,config)
        navigate(`/postDetails/${id}`)
    } catch (error) {
        console.log(error);
    }
}

export const deletePhoto = (id,photoName) => async (dispatch) =>{
    const token = localStorage.getItem('token')
    const config = {
        headers :{
            Authorization:token
        }
    }
    try {
        await axios.put(`https://gmcmyprojectmern.herokuapp.com/api/posts/deletePhoto/${id}`,photoName,config)
        dispatch(getPostById(id))
    } catch (error) {
        console.log(error)
    }
}