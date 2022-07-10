import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from "../../actions/uploadAction";

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading) 
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef()
  const {user} = useSelector((state) => state.authReducer.authData)

  const dispatch = useDispatch()
  const reset = () => {
    setImage(null)
    desc.current.value = ""
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    const newPost = { 
      userId: user._id,
      desc: desc.current.value
    }
    
    if (image) {
      const data = new FormData()
      const fileName = Date.now() + image.name
      data.append('name', fileName)
      data.append('file', image)
      newPost.image = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(uploadPost(newPost))
    reset()
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  console.log(user.profilePicture)
  return (
    <div className="PostShare">
      <img src={user.profilePicture 
        ? publicFolder + user.profilePicture 
        : publicFolder + "defaultProfile.png"} alt="profileImage" />
      <div>
        <input type="text" placeholder="What's happening" ref={desc} required/>
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button className="button ps-button" onClick={handleSubmit} disabled = {loading}>
            {loading ? "Sharing..." : "Share"}
            </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
      {image && (
        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <img src={URL.createObjectURL(image)} alt="" />
        </div>
      )}
      </div>
    </div>
  );
};

export default PostShare;
