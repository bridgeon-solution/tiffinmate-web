import { Box, Grid, Typography, IconButton, TextField } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Field } from "formik";
import { AccountCircle, Edit } from "@mui/icons-material";
import { useRef } from "react";
import { ProfileValues } from "./type";

interface ProfileProps {
  handleSubmit: () => void;
  values: ProfileValues;
  handleUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function ProfileComponent({
  handleSubmit,
  values,
  handleUploadImage,
}: ProfileProps) {
  const inputFile = useRef<HTMLInputElement | null>(null);
  return (
    <Box sx={{ padding: "2rem", backgroundColor: "white", minHeight: "100vh" }}>
      <Grid container spacing={4} alignItems="center" mb={4}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "18px", md: "20px" }, fontWeight: 600 }}
          >
            Welcome, <span style={{ color: "#f98e2b" }}>{values.fullName}</span>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <IconButton>
              <NotificationsIcon sx={{ color: "#666", fontSize: "24px" }} />
            </IconButton>
            <IconButton>
              {values.profileImage ? (
                <img
                  src={values.profileImage}
                  alt="Profile"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              ) : (
                <Typography
                  sx={{ fontSize: "24px", fontWeight: 600, color: "#666" }}
                >
                  {values.fullName[0]}
                </Typography>
              )}
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              padding: "1.5rem",
              borderRadius: "10px",
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: "14px", fontWeight: 400, color: "gray" }}
              >
                Welcome to your profile! Here you can update your personal
                information
              </Typography>
              <Box
                sx={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  onClick={() => inputFile.current?.click()}
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={inputFile}
                    onChange={handleUploadImage}
                  />
                  {values.profileImage ? (
                    <img
                      src={values.profileImage}
                      alt="Profile"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        marginRight: "1rem",
                        transition: "opacity 0.3s",
                      }}
                    />
                  ) : (
                    <AccountCircle
                      sx={{
                        fontSize: "40px",
                        color: "#666",
                        marginRight: "1rem",
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: "70px",
                      height: "70px",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      opacity: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                      transition: "opacity 0.3s",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <Edit sx={{ fontSize: "24px", color: "white" }} />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#000" }}
                  >
                    {values.fullName}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: 400, color: "gray" }}
                  >
                    {values.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          paddingTop: 4,
          backgroundColor: "#fff",
          minHeight: "100vh",
          marginLeft: 4,
        }}
      >
        <Grid container spacing={4}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                      Full Name
                    </Typography>
                    <Field
                      name="fullName"
                      as={TextField}
                      variant="filled"
                      fullWidth
                      value={values.fullName}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          backgroundColor: "#f9f9f9",
                          borderRadius: "4px",
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                      Phone Number
                    </Typography>
                    <Field
                      name="phoneNumber"
                      as={TextField}
                      variant="filled"
                      fullWidth
                      value={values.phoneNumber}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          backgroundColor: "#f9f9f9",
                          borderRadius: "4px",
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                      Email
                    </Typography>
                    <Field
                      name="email"
                      as={TextField}
                      variant="filled"
                      fullWidth
                      value={values.email}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          backgroundColor: "#f9f9f9",
                          borderRadius: "4px",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                      Address
                    </Typography>
                    <Field
                      name="address"
                      as={TextField}
                      variant="filled"
                      fullWidth
                      value={values.address}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          backgroundColor: "#f9f9f9",
                          borderRadius: "4px",
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                      City
                    </Typography>
                    <Field
                      name="city"
                      as={TextField}
                      variant="filled"
                      fullWidth
                      value={values.city}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          backgroundColor: "#f9f9f9",
                          borderRadius: "4px",
                        },
                      }}
                    />
                  </Box>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "1.5rem",
                    }}
                  >
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
