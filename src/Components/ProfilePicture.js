import React from "react";
import { Avatar } from "@mui/material";

const ProfilePicture = ({ src }) => {
  return (
    <div style={{ textAlign: "center" }}>
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
    </div>
  );
};

export default ProfilePicture;
