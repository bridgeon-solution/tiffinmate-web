import { Box, Typography,Grid } from '@mui/material';
import authImage from '../../Assets/authimage.jpg';
import InputField from '../../Atoms/Input';
import StyledButton from '../../Atoms/Button';
import { Form, Field, ErrorMessage } from 'formik';
import './index.css'

function SignupComponent() {

  return (
    <Grid container sx={{}}>
      <Grid item xs={12} md={6} sx={{ display: "flex",justifyContent: "center",p: { xs: "2rem", md: "8rem" }}}>
     <Box sx={{ width: "100%" }}>
          <Typography sx={{ fontSize:{ xs:"24px",md:"33px"}, fontWeight: 700 }}>Get Started Now</Typography>
          <Form>
            <Box sx={{ display: 'flex', flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
            <Field as={InputField} name="name" label="Name" variant="outlined" />
              <ErrorMessage name="name" component="div" className='errormessage' />

              <Field as={InputField} name="email" label="Email" variant="outlined" />
              <ErrorMessage name="email" component="div" className='errormessage' />

              <Field as={InputField} name="phone" label="Phone Number" variant="outlined" />
              <ErrorMessage name="phone" component="div" className='errormessage' />

              <Field as={InputField} name="password" label="Password" type="password" variant="outlined" />
              <ErrorMessage name="password" component="div" className='errormessage' />


              <StyledButton type="submit" variant="contained" sx={{mt:2}}>
                Submit
              </StyledButton>
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

export default SignupComponent;
