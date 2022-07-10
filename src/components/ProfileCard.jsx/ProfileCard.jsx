import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileCard = ({location}) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const posts = useSelector((state) => state.postReducer.posts)
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.coverPicture 
          ? publicFolder + user.coverPicture 
          : publicFolder + "defaultCover.jpg"} 
          alt="coverPicture" />
        <img src={user.profilePicture 
          ? publicFolder + user.profilePicture 
          : publicFolder + "defaultProfile.png"} 
          alt="profilePicture" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.about}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow context">
            <span>{user.followings.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow context">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post) => post.userId === user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'profilePage' ? "" : <span><Link style={{textDecoration: "none", color: "inherit"}} to = {`/profile/${user._id}`}>My Profile</Link></span>}
    </div>
  );
};

export default ProfileCard;
