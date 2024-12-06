import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    Grid2,
} from "@mui/material";
import "./Profile.css";
import perfil from "../images/perfil.png";
import perfilBombeiro from "../images/perfilBombeiro.png";

const Profile = () => {
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        return storedUser || {
            userId: 1,
            name: "",
            email: "",
            phone: "",
            address: {
                addressId: 1,
                zipCode: "",
                street: "",
                houseNumber: "",
                neighborhood: "",
                city: "",
            },
            cpf: "",
            patent: "",
            fireHouse: "",
            firefighterRegister: "",
        };
    });

    const [isEditing, setIsEditing] = useState(false);
    const [profilePicture, setProfilePicture] = useState(
        user.cpf ? perfil : perfilBombeiro
    );

    useEffect(() => {
        setProfilePicture(user.cpf ? perfil : perfilBombeiro);
    }, [user.cpf]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split(".");

        if (nameParts.length > 1) {
            setUser((prev) => ({
                ...prev,
                [nameParts[0]]: {
                    ...prev[nameParts[0]],
                    [nameParts[1]]: value,
                },
            }));
        } else {
            setUser((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        setIsEditing(false);

        const requestBody = {
            ...user,
            address: {
                addressId: user.address.addressId,
                zipCode: user.address.zipCode || "A",
                street: user.address.street || "A",
                houseNumber: user.address.houseNumber || 1,
                neighborhood: user.address.neighborhood || "A",
                city: user.address.city || "A",
            },
        };

        let apiUrl = "";
        if (user.cpf) {
            apiUrl = `http://localhost:8080/api/reporters/updateReporter/${user.userId}`;
        } else {
            apiUrl = `http://localhost:8080/api/firefighters/${user.userId}`;
        }

        try {
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar perfil");
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data)); // Atualiza o localStorage com os dados atualizados
            alert("Perfil atualizado com sucesso!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box className="profile-container">
            <Card sx={{ maxWidth: 500, width: "100%" }}>
                <CardContent>
                    <img
                        src={profilePicture}
                        alt="Foto do Perfil"
                        style={{ width: 100, height: 100, borderRadius: "50%" }}
                    />
                    <Typography variant="h5" sx={{ margin: "20px 0" }}>
                        {isEditing ? "Editar Perfil" : user.name || "Usuário"}
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <Grid2 container spacing={2}>
                            {Object.entries(user).map(([key, value]) => {
                                if (key === "userId" || key === "profilePicture") return null;

                                const labelMap = {
                                    name: "Nome",
                                    email: "E-mail",
                                    phone: "Celular",
                                    address: "Endereço",
                                    zipCode: "CEP",
                                    street: "Rua",
                                    houseNumber: "Número",
                                    neighborhood: "Bairro",
                                    city: "Cidade",
                                    patent: "Patente",
                                    fireHouse: "Quartel",
                                    firefighterRegister: "Registro do Bombeiro",
                                };

                                if (key === "address" && value !== null) {
                                    // Remover o addressId
                                    const { addressId, ...filteredAddress } = value;

                                    return Object.entries(filteredAddress).map(
                                        ([subKey, subValue]) => (
                                            <Grid2 item xs={12} key={`${key}.${subKey}`}>
                                                <TextField
                                                    fullWidth
                                                    label={labelMap[subKey] || subKey}
                                                    name={`${key}.${subKey}`}
                                                    value={subValue || ""}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </Grid2>
                                        )
                                    );
                                }

                                return (
                                    <Grid2 item xs={12} key={key}>
                                        <TextField
                                            fullWidth
                                            label={labelMap[key] || key}
                                            name={key}
                                            value={value || ""}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </Grid2>
                                );
                            })}
                        </Grid2>
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={toggleEditing}
                        sx={{
                            marginTop: 2,
                            backgroundColor: "#0A0A33",
                            '&:hover': {
                                backgroundColor: "#0A0A33",
                            }
                        }}
                    >
                        {isEditing ? "Cancelar" : "Editar Perfil"}
                    </Button>
                    {isEditing && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            sx={{ marginTop: 2, marginLeft: 2 }}
                        >
                            Salvar
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;