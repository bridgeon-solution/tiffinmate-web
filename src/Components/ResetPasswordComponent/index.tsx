import { Box, Typography, Grid } from "@mui/material";
import authImage from "../../Assets/authimage.webp";
import InputField from "../../Atoms/Input";
import StyledButton from "../../Atoms/Button";
import { Form, Field, ErrorMessage } from "formik";
import "./index.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPasswordComponent({ loading }: { loading: boolean }) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmpasswordVisible, setconfirmPasswordVisible] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleconfirmPasswordVisibility = () => {
    setconfirmPasswordVisible(!confirmpasswordVisible);
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
            Reset Password
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
              <Box sx={{ position: "relative" }}>
                <Field
                  as={InputField}
                  name="password"
                  label="new Password"
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
              </Box>

              <Box sx={{ position: "relative" }}>
                <Field
                  as={InputField}
                  name="confirmPassword"
                  label="confirm password"
                  type={confirmpasswordVisible ? "text" : "password"}
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
                  onClick={toggleconfirmPasswordVisibility}
                >
                  {confirmpasswordVisible ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </Box>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="errormessage"
                />
              </Box>

              <StyledButton
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? "submitting" : "submit"}
              </StyledButton>
              <Typography sx={{ textAlign: "center", mt: 1 }}>
                remembered password?{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#e6852c" }}
                >
                  Sign In
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

export default ResetPasswordComponent;
