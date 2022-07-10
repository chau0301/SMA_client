import * as postApi from '../api/PostRequest'

export const getTimelinePosts = (id) => async(dispatch) => {
    dispatch({type: "RETRIEVING_START"})
    try {
        const {data} = await postApi.getTimelinePosts(id)
        dispatch({type: "RETRIEVING_COMPLETE", data: data})
    } catch (error) {
        console.log(error)
        dispatch({type: "RETRIEVING_FAIL"})
    }
}