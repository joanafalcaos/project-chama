import React from "react";
import { Avatar, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const EditableProfilePicture = ({ src, onChange }) => {
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <Avatar
        alt="Foto de Perfil"
        src={src}
        sx={{
          width: 150,
          height: 150,
          margin: "0 auto",
          border: "2px solid #6200ea",
        }}
      />
      <IconButton
        color="primary"
        component="label"
        sx={{
          position: "absolute",
          bottom: -10,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#6200ea",
        }}
      >
        <PhotoCamera />
        <input hidden accept="image/*" type="file" onChange={onChange} />
      </IconButton>
    </div>
  );
};

export default EditableProfilePicture;
