import { Box, Typography,Grid } from '@mui/material';
import authImage from '../../Assets/authimage.webp'
import InputField from '../../Atoms/Input';
import StyledButton from '../../Atoms/Button';
import { Form, Field, ErrorMessage } from 'formik';
import './index.css'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignupComponent() {
  const[passwordVisible,setPasswordVisible]=useState<boolean>(false)
  const[confirmpasswordVisible,setconfirmPasswordVisible]=useState<boolean>(false)
  
  const togglePasswordVisibility=()=>{
    setPasswordVisible(!passwordVisible)
  }

  const toggleconfirmPasswordVisibility=()=>{
    setconfirmPasswordVisible(!confirmpasswordVisible)
  }

  return (
    <Grid container>
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


              <Box sx={{position:'relative'}}>
            <Field
              as={InputField}
              name="password"
              label="Password"
              type={passwordVisible?"text":"password"}
              variant="outlined"
              fullWidth
            />
            <Box sx={{position:'absolute',
              top:'30%',
              right:'10px',
              cursor:'pointer'
            }}
            onClick={togglePasswordVisibility}            
            >
              {passwordVisible?(
                <VisibilityOutlinedIcon/>):(<VisibilityOffOutlinedIcon/>)}
              </Box>
            <ErrorMessage name="password" component="div" className='errormessage' />
            
              </Box>

              <Box sx={{position:'relative'}}>
            <Field
              as={InputField}
              name="confirmPassword"
              label="confirm password"
              type={confirmpasswordVisible?"text":"password"}
              variant="outlined"
              fullWidth
            />
            <Box sx={{position:'absolute',
              top:'30%',
              right:'10px',
              cursor:'pointer'
            }}
            onClick={toggleconfirmPasswordVisibility}            
            >
              {confirmpasswordVisible?(
                <VisibilityOutlinedIcon/>):(<VisibilityOffOutlinedIcon/>)}
              </Box>
            <ErrorMessage name="confirmPassword" component="div" className='errormessage' />
            
              </Box>


              <StyledButton type="submit" variant="contained" sx={{mt:2}}>
                Submit
              </StyledButton>
              <Typography sx={{ textAlign: 'center', mt: 1 }}>
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: '#e6852c' }}>Sign In</Link>
              </Typography>
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
