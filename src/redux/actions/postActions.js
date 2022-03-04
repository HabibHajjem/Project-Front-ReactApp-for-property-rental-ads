import axios from 'axios'

export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get('/posts')
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
        await axios.post('/posts/addPost', newPost, config)
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
        const res = await axios.get('/myPosts', config)
        dispatch({type:"GET_MYPOSTS", payload: res.data.posts})
    } catch (error) {
        
    }
}

export const getPostById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/posts/${id}`)
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
        await axios.put(`/posts/addComment/${id}`, comment, config)
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
        await axios.delete(`/posts/deletePost/${id}`,config)
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
        await axios.put(`/posts/editPost/${id}`,info,config)
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
        await axios.put(`/posts/deletePhoto/${id}`,photoName,config)
        dispatch(getPostById(id))
    } catch (error) {
        console.log(error)
    }
}