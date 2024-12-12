import * as Yup from 'yup';
import { Formik } from 'formik';
import { useLocation, useNavigate} from 'react-router-dom';
import ResetPasswordComponent from '../../Components/ResetPasswordComponent';
import { ResetPasswordService } from '../../Services/AuthService';

interface FormValues {
    password: string;
}

const validationSchema = Yup.object({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
function ResetPasswordContainer() {
    const location = useLocation();


    const initialValues: FormValues = { password: '' }
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)
    const email = params.get("email") as string
    const handleSubmit = async (values: FormValues) => {
        const data = { email, ...values }
        await ResetPasswordService(data)
        navigate('/login')
    }
    return (
        <>
            <Formik<FormValues>
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>

                {() => <ResetPasswordComponent />}
            </Formik>
        </>
    )
}

export default ResetPasswordContainer