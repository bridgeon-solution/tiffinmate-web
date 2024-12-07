import React from 'react'
import LoginComponent from '../../Components/LoginComponent'
import * as Yup from 'yup';
import { Formik } from 'formik';
import LoginService from '../../Services/LoginService';

interface loginValues{
  email:string;
  password:string;
}

const validationSchema = Yup.object({  
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
function LoginContainer() {

    const initialValues:loginValues={email:'',password:''}
    

    const handleSubmit = async(values: loginValues) => {
  
      const res=await LoginService(values)
      console.log(res.data);
      console.log("successfully loggined");     
    }

  return (
    
        <>
    <Formik<loginValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
    
      {() => <LoginComponent />}
      </Formik>
      </>

    
  )
}

export default LoginContainer