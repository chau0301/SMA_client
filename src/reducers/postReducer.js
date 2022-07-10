const postReducer = (
    state = {posts: [], error: false, uploading: false, loading: true}, action) => {
    switch (action.type) {
        //postShare
        case "UPLOAD_START":
            return {...state, uploading: true, error: false}
        case "UPLOAD_SUCCESS": 
            console.log("upload success")
            return { ...state, posts: [action.data.newPost, ...state.posts], uploading: false, error: false };
        case "UPLOAD_FAIL":
            return {...state, uploading: false, error: true}
        //posts
        case "RETRIEVING_START":
            return { ...state, loading: true, error: false };
        case "RETRIEVING_COMPLETE":
            return { ...state, posts: action.data.posts, loading: false, error: false };
        case "RETRIEVING_FAIL":
            return { ...state, loading: false, error: true };
        default:
            return state
    }
}

export default postReducer