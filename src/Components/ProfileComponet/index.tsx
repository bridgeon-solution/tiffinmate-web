import { Box, Grid, Typography, IconButton, TextField } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Field } from "formik";
import { AccountCircle } from "@mui/icons-material";
interface ProfileValues {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
}
interface ProfileProps {
    handleSubmit: () => void;
    values: ProfileValues;
}

function ProfileComponent({ handleSubmit, values }: ProfileProps) {
    return (
        <Box sx={{ padding: "2rem", backgroundColor: "white", minHeight: "100vh" }} mt={8}>

            <Grid container spacing={4} alignItems="center" mb={4}>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: { xs: "18px", md: "20px" }, fontWeight: 600 }}>
                        Welcome, <span style={{ color: "#f98e2b" }}>{values.fullName}</span>
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <IconButton>
                            <NotificationsIcon sx={{ color: "#666", fontSize: "24px" }} />
                        </IconButton>
                        <IconButton>
                            <AccountCircle sx={{ color: "#666", fontSize: "24px" }} />
                        </IconButton>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", backgroundColor: "#f5f5f5", padding: "1.5rem", borderRadius: "10px" }}>
                        <Box>
                            <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "gray" }}>
                                Welcome to your profile! Here you can update your personal information
                            </Typography>
                            <Box sx={{ marginTop: "1rem", display: "flex", alignItems: "center" }}>

                                <Box>
                                    <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#000" }}>
                                        {values.fullName}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px", fontWeight: 400, color: "gray" }}>
                                        {values.email}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>


            <Box sx={{ padding: "2rem", backgroundColor: "#fff", minHeight: "100vh" }}>
                <Grid container spacing={4}>
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    <Box>
                                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>Full Name</Typography>
                                        <Field
                                            name="fullName"
                                            as={TextField}
                                            variant="filled"
                                            fullWidth
                                            value={values.fullName}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: { backgroundColor: "#f9f9f9", borderRadius: "4px" },
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>Phone Number</Typography>
                                        <Field
                                            name="phoneNumber"
                                            as={TextField}
                                            variant="filled"
                                            fullWidth
                                            value={values.phoneNumber}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: { backgroundColor: "#f9f9f9", borderRadius: "4px" },
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>Email</Typography>
                                        <Field
                                            name="email"
                                            as={TextField}
                                            variant="filled"
                                            fullWidth
                                            value={values.email}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: { backgroundColor: "#f9f9f9", borderRadius: "4px" },
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    <Box>
                                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>Address</Typography>
                                        <Field
                                            name="address"
                                            as={TextField}
                                            variant="filled"
                                            fullWidth
                                            value={values.address}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: { backgroundColor: "#f9f9f9", borderRadius: "4px" },
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>City</Typography>
                                        <Field
                                            name="city"
                                            as={TextField}
                                            variant="filled"
                                            fullWidth
                                            value={values.city}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: { backgroundColor: "#f9f9f9", borderRadius: "4px" },
                                            }}
                                        />
                                    </Box>
                                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                                        <button
                                            type="submit"
                                            style={{
                                                backgroundColor: "#f98e2b",
                                                border: "none",
                                                borderRadius: "5px",
                                                color: "#fff",
                                                padding: "10px 20px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Box>
        </Box>
    );
}

export default ProfileComponent;
