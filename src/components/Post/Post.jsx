import React, {useState} from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import {useSelector} from 'react-redux'
import { likePost } from '../../api/PostRequest'

const Post = ({data}) => {
  const user = useSelector((state) => state.authReducer.authData.user)
  const [Liked, setLiked] = useState(data.likes.includes(user._id))
  const [Likes, setLikes] = useState(data.likes.length)
  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    Liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
  return (
    <div className="Post">
        <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER+data.image : ""} alt=""/>
        <div className="detail"><span> {data.desc}</span></div>
        <div className="postReact">
            <img src={Liked ? Heart: NotLike} alt="" style={{cursor: "pointer"}} onClick={handleLike}/>
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{Likes} likes</span>

        {/* <div className="detail">
            <span> {data.desc}</span>
        </div> */}
    </div>
  )
}

export default Post