import React from "react";
import './ProfilePhoto.css'
import { GitHub, LinkedIn } from "@mui/icons-material";

function ProfilePhoto(props){
    return (
        <div className="profile-photo">
            <img className="profile-photo-img" src={props.img} alt={props.alt}></img>
            <h3>{props.name}</h3>
            <div className="social-icons">
                <a href={props.github} target="_blank" rel="noopener noreferrer"><GitHub sx={{ color: '#737373', '&:hover': { color: '#bfbfbf' }}}/></a>
                <a href={props.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn sx={{ color: '#737373', '&:hover': { color: '#bfbfbf' }}}/></a>
            </div>
        </div>
    )
}

export default ProfilePhoto;