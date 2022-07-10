import * as UploadAPI from '../api/UploadRequest'

export const uploadImage = (data) => async(dispatch) => {
    try {
        await UploadAPI.uploadImage(data)
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost = (data) => async(dispatch) => {
    dispatch({type: "UPLOAD_START"})
    try {
        const newPost = await UploadAPI.uploadPost(data)
        // console.log("newPost data:", newPost.data.newPost)
        dispatch({type: "UPLOAD_SUCCESS",  data: newPost.data})
    } catch (error) {
        console.log(error)
        dispatch({type: "UPLOAD_FAIL"})
    }
}