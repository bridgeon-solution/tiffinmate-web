import { useState } from 'react';
import SignupComponent from '../../Components/SignupComponent';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Modal, Typography } from '@mui/material';
import OTPInput, { ResendOTP } from "otp-input-react";
import SignupService, { ResendOtpService, VerifyOtpService } from '../../Services/SignupService';
import StyledButton from '../../Atoms/Button';
import { useNavigate } from 'react-router-dom';

interface formData{
  name:string,
  email:string,
  phone:string,
  password:string
}
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password')],'password must match').required('confirm password is required')
  });

function SignupContainer() {
    const[modal,setModal]=useState<boolean>(false)
    const [OTP, setOTP] = useState("");
    const[phone,setPhone]=useState<string>('')
  const initialValues:formData= { name: '', email: '', phone: '', password: '' };
  const navigate=useNavigate()

  const handleSubmit = async(values:formData) => {
    const res=await SignupService(values);
    setPhone(values.phone)
    setModal(true) ;    
    return res.data
    }
    
  const handleClose=()=>{
    setModal(false)
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
    outline: 'none',
  };

  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => <SignupComponent />}
    </Formik>
    
    
     
    <Modal open={modal} onClose={handleClose} sx={backdropStyle}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
            Verify Your Phone Number
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 3, textAlign: 'center' }}>
            We've sent an SMS with an activation code to your phone <strong>+231675831475</strong>.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              inputStyles={{
                width: 50,
                height: 50,
                fontSize: '1.2rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            />
            <ResendOTP onResendClick={() => ResendOtpService(phone)} />

            <StyledButton type="submit" variant="contained" sx={{mt:2}} onClick={()=>{
              VerifyOtpService({phone,otp:OTP})
              navigate('/login')
              }}>
                verify
              </StyledButton>
          </Box>
        </Box>
      </Modal>
       
    </>
    
  );
}

export default SignupContainer;
