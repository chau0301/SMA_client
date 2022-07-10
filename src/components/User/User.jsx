import React, {useState} from 'react'
import './User.css'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/userAction'

const User = ({person}) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  const defaultProfile = publicFolder + "defaultProfile.png"
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.authReducer.authData)
  const [following, setFollowing] = useState(person.followers.includes(user._id))
  const handleFollow = ()=> {
    following 
        ? dispatch(unFollowUser(person._id, user)) 
        : dispatch(followUser(person._id, user))
    setFollowing((prev) => !prev)
  }
  
  return (
    <div className="follower">
    <div>
        <img src={person.img ? person.img : defaultProfile} alt="" className='followerImage' />
        <div className="name">
            <span>{person.firstname} {person.lastname}</span>
            <span>@{person.username}</span>
        </div>
    </div>
    <button className={following ? 'button fc-button UnFollowButton' : 'button fc-button'} onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
    </button>
</div>
  )
}

export default User