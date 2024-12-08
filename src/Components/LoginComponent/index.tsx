import { Box, Grid, Typography } from '@mui/material';
import { ErrorMessage, Field ,Form} from 'formik';
import InputField from '../../Atoms/Input';
import StyledButton from '../../Atoms/Button';
import authImage from '../../Assets/authimage.jpg';

function LoginComponent() {
  return (
    <Grid container>
      <Grid item xs={12} md={6} sx={{ display: "flex",justifyContent: "center",p: { xs: "2rem", md: "8rem" }}}>
      <Box sx={{ width: "100%" }}>
        <Typography sx={{ fontSize:{ xs:"24px",md:"33px"}, fontWeight: 700 }}>Welcome back</Typography>
        <Typography sx={{ fontSize:{ xs:"12px",md:"16px"}, fontWeight: 20 }}>Enter your Credentials to access your account</Typography>
        <Form>
          <Box sx={{ display: 'flex', flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
            

            <Field
              as={InputField}
              name="email"
              label="Email"
              variant="outlined"
            />
            <ErrorMessage name="email" component="div" className='errormessage' />

            
            <Field
              as={InputField}
              name="password"
              label="Password"
              type="password"
              variant="outlined"
            />
            <ErrorMessage name="password" component="div" className='errormessage' />

            <StyledButton type="submit" variant="contained">
              Login
            </StyledButton>
            <a style={{textAlign: 'end', fontSize: '10px' ,color:'#e6852c'}} onClick={()=>'clicked'}>
                Forgot Password?
              </a>
          </Box>
        </Form>
      </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <img
          src={authImage}
          alt="auth-image"
          style={{ objectFit: "cover", width: "100%", maxHeight:"100vh" }}
        />
      </Grid>
    </Grid>
);

}

export default LoginComponent