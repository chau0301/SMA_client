import React, { useEffect } from 'react'
import './Posts.css'
import { useDispatch , useSelector } from 'react-redux'
import Post from '../Post/Post'
import { getTimelinePosts } from '../../actions/postAction'

const Posts = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.authReducer.authData)
  const {posts, loading} = useSelector((state) => state.postReducer) 
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])

  if(posts.length === 0) return <div style={{textAlign: 'center'}}>No post!!!</div>

  return (
    // <div style={{textAlign: 'center'}}>Loading...</div>
    <div className="Posts">
      {loading
        ? <div style={{textAlign: 'center'}}>Loading...</div>
        : (posts.map((post, id) => <Post data={post} id={id}/>))}
    </div>
  )
}

export default Posts