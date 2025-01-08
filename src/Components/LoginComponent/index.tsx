import { Box, Grid, Typography } from "@mui/material";
import { ErrorMessage, Field, Form } from "formik";
import InputField from "../../Atoms/Input";
import StyledButton from "../../Atoms/Button";
import authImage from "../../Assets/authimage.webp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginComponent({ loading }: { loading: boolean }) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          p: { xs: "2rem", md: "8rem" },
        }}
      >
        <Box sx={{ width: "100%" }} mt={10}>
          <Typography
            sx={{ fontSize: { xs: "24px", md: "33px" }, fontWeight: 700 }}
          >
            Welcome back
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" }, fontWeight: 20 }}
          >
            Enter your Credentials to access your account
          </Typography>
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              <Field
                as={InputField}
                name="email"
                label="Email"
                variant="outlined"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="errormessage"
              />
              <Box sx={{ position: "relative" }}>
                <Field
                  as={InputField}
                  name="password"
                  label="Password"
                  type={passwordVisible ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "30%",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </Box>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="errormessage"
                />
                <Box sx={{ textAlign: "end" }}>
                  <span
                    style={{
                      textDecoration: "none",
                      color: "#e6852c",
                      fontSize: "10px",
                      cursor: "pointer",
                      display: "inline",
                    }}
                    onClick={() => navigate("/forgotpassword")}
                  >
                    Forgot Password
                  </span>
                </Box>
              </Box>

              <StyledButton type="submit" variant="contained">
                {loading ? "Logging in..." : "Login"}
              </StyledButton>

              <Typography sx={{ textAlign: "center", mt: 1 }}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#e6852c" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Form>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <img
          src={authImage}
          alt="auth-image"
          style={{ objectFit: "cover", width: "100%", maxHeight: "100vh" }}
        />
      </Grid>
    </Grid>
  );
}

export default LoginComponent;
