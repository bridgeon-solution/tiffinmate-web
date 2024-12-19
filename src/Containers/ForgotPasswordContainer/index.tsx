import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordComponent from '../../Components/ForgotPasswordComponet';
import { Box, Modal, Typography } from '@mui/material';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from 'react';
import StyledButton from '../../Atoms/Button';
import { ForgotPasswordService, ResendMailOtp, VerifyEmailOtp } from '../../Services/AuthService';
import { EmailValue } from './type';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),

});
function ForgotPasswordContainer() {
    const [modal, setModal] = useState<boolean>(false)
    const [otp, setOtp] = useState('')
    const [email, setEmail] = useState<string>('');
    const initialValues: EmailValue = { email: '' }
    const navigate = useNavigate()

    const handleSubmit = async (values: EmailValue) => {
        await ForgotPasswordService(values)
        setEmail(values.email)
        setModal(true)

    }
    const handleClose = () => {
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
            <Formik<EmailValue>
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>

                {() => <ForgotPasswordComponent />}
            </Formik>

            <Modal open={modal} onClose={handleClose} sx={backdropStyle}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                        Verify Your Email
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mb: 3, textAlign: 'center' }}>
                        We've sent an email with an activation code to your email <strong>example@gmail.com</strong>.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
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
                        <ResendOTP onResendClick={() => ResendMailOtp({email})} />

                        <StyledButton type="submit" variant="contained" sx={{ mt: 2 }} onClick={async() => {
                            const res=await VerifyEmailOtp({ email, otp: otp })
                            if(res?.data?.status=="success"){
                                navigate(`/resetpassword?email=${email}`)
                            }                          
                        }}>
                            verify
                        </StyledButton>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ForgotPasswordContainer