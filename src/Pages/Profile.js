import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
} from "@mui/material";
import ProfilePicture from "../Components/ProfilePicture";
import EditableProfilePicture from "../Components/EditableProfilePicture";
import "./Profile.css";
import perfil from "../images/perfil.png";
import perfilBombeiro  from "../images/perfilBombeiro.png"

const Profile = () => {
    
    const [profile, setProfile] = useState({
        role: "user",
        name: "Usuário",
        cpf: "",
        dob: "2000-01-01",
        phone: "",
        email: "usuario@example.com",
        cep: "",
        address: {
            city: "",
            uf: "",
            street: "",
            neighborhood: "",
            complement: "",
        },
    });

    const [isEditing, setIsEditing] = useState(false);
    const [profilePicture, setProfilePicture] = useState(profile.role === "bombeiro" ? perfilBombeiro : perfil);

    const formatCpf = (value) => {
        const numericValue = value.replace(/\D/g, ""); // Remove tudo que não é número
        const formattedValue = numericValue
            .replace(/^(\d{3})(\d)/, "$1.$2") // Primeiro ponto
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") // Segundo ponto
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4"); // Traço
        return formattedValue.slice(0, 14); // Limita ao formato "000.000.000-00"
    };

    const formatPhone = (value) => {
        const numericValue = value.replace(/\D/g, ""); // Remove tudo que não é número
        const formattedValue = numericValue
            .replace(/^(\d{2})(\d)/, "($1) $2") // Parênteses para DDD
            .replace(/(\d{5})(\d{4})$/, "$1-$2"); // Traço no número
        return formattedValue.slice(0, 15); // Limita ao formato "(XX) XXXXX-XXXX"
    };

    const formatCep = (value) => {
        const numericValue = value.replace(/\D/g, ""); // Remove tudo que não é número
        const formattedValue = numericValue.replace(/^(\d{5})(\d{1,3})$/, "$1-$2"); // Traço no CEP
        return formattedValue.slice(0, 9); // Limita ao formato "XXXXX-XXX"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === "cpf") formattedValue = formatCpf(value);
        if (name === "phone") formattedValue = formatPhone(value);
        if (name === "cep") formattedValue = formatCep(value);
        if (name === "uf") formattedValue = value.toUpperCase().slice(0, 2); // UF em letras maiúsculas, máximo 2 caracteres
        if (name === "name") formattedValue = value.slice(0, 100); // Nome completo máximo 100 caracteres
        if (name === "email") formattedValue = value.slice(0, 254); // Email até 254 caracteres

        setProfile((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        const maxLengths = {
            city: 50,
            street: 100,
            neighborhood: 50,
            complement: 50,
        };
        const formattedValue = value.slice(0, maxLengths[name] || 50);

        setProfile((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: formattedValue,
            },
        }));
    };

    const handleCepChange = async (e) => {
        const cep = formatCep(e.target.value); // Formata o CEP
        setProfile((prev) => ({ ...prev, cep }));

        if (cep.length === 9) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setProfile((prev) => ({
                        ...prev,
                        address: {
                            city: data.localidade,
                            uf: data.uf,
                            street: data.logradouro,
                            neighborhood: data.bairro,
                            complement: "",
                        },
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar o CEP:", error);
            }
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicture(reader.result); // Atualiza o estado com a imagem convertida
                console.log("Profile picture updated:", reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.log("Nenhuma imagem selecionada");
        }
    };   

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
        alert("Perfil salvo com sucesso!");
    };

    return (
        <Box className="profile-container">
  <Card sx={{ maxWidth: 500, width: "100%" }}>
    <CardContent>
      {isEditing ? (
        <EditableProfilePicture
        src={profilePicture}
        onChange={handleProfilePictureChange}
    />    
      ) : (
        <ProfilePicture src={profilePicture} />
      )}
      <Typography variant="h5" sx={{ margin: "20px 0" }}>
        {isEditing ? "Editar Perfil" : profile.name}
      </Typography>
      {isEditing ? (
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome Completo"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                value={profile.cpf}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Data de Nascimento"
                name="dob"
                type="date"
                value={profile.dob}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Celular"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="CEP"
                name="cep"
                value={profile.cep}
                onChange={handleCepChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Logradouro"
                name="street"
                value={profile.address.street}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Cidade"
                name="city"
                value={profile.address.city}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="UF"
                name="uf"
                value={profile.address.uf}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Bairro"
                name="neighborhood"
                value={profile.address.neighborhood}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Complemento"
                name="complement"
                value={profile.address.complement}
                onChange={handleAddressChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSave}
            sx={{ marginTop: 2 }}
          >
            Salvar
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="body1">E-mail: {profile.email}</Typography>
          <Typography variant="body1">
            Data de Nascimento: {new Date(profile.dob).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">Celular: {profile.phone}</Typography>
          <Typography variant="body1">CEP: {profile.cep}</Typography>
          <Typography variant="body1">
            Endereço:{" "}
            {`${profile.address.street && profile.address.street + ", "}`}
            {`${profile.address.neighborhood && profile.address.neighborhood + ", "}`}
            {`${profile.address.city && profile.address.city + " - "}`}
            {profile.address.uf}
          </Typography>
          <Typography variant="body1">
            Complemento: {profile.address.complement}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={toggleEditing}
          >
            Editar Perfil
          </Button>
        </Box>
      )}
    </CardContent>
  </Card>
</Box>

    );
};

export default Profile;
