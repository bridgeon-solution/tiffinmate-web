import { Box, Grid, Typography } from "@mui/material";
import { ErrorMessage, Field, Form } from "formik";
import InputField from "../../Atoms/Input";
import StyledButton from "../../Atoms/Button";
import authImage from "../../Assets/authimage.webp";
import { Link } from "react-router-dom";

function ForgotPasswordComponent({ loading }: { loading: boolean }) {
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
        <Box sx={{ width: "100%" }} mt={15}>
          <Typography
            sx={{ fontSize: { xs: "24px", md: "33px" }, fontWeight: 700 }}
          >
            Forgot Password
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" }, fontWeight: 20 }}
          >
            Enter the email address registered with your account. We'll send you
            a otp to reset your password.
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

              <StyledButton
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </StyledButton>

              <Typography sx={{ textAlign: "center", mt: 1 }}>
                Remembered Password?{" "}
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#e6852c" }}
                >
                  Login to your account
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

export default ForgotPasswordComponent;
