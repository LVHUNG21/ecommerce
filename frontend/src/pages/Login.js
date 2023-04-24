import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { useFormik } from 'formik'
import {useNavigate} from 'react-router-dom';
import CustomInput from '../components/CustomInput'
import { loginUser } from '../features/user/userSlice';
import * as yup from 'yup';
let loginSchema= yup.object({
    email: yup.string().email("Moi nhap dung email").required("Email is Required"),
    password:yup.string().required('password is required'),

  });
const Login = () => {
    const authState=useSelector(state=> state.auth)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const formik = useFormik({
      initialValues: {
        email: '',
        password:'',

      },
      validationSchema:loginSchema,

      onSubmit: values => {
               dispatch(loginUser(values));
        // if(isSuccess && createdUser){
        //     toast.info('User Createdd successfullly')
        // }
        setTimeout(()=>{
                navigate('/')
            
        },500)
      }});
  return (

  <>
        <Container class1="login-wrapper  py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className="text-center mb-3">Login</h3>
                            <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15" >
                        <CustomInput type="email" name='email' placeholder='Email' 
                        value={formik.values.email} 
                        onChange={formik.handleChange('email')}
                         onBlur={() => formik.handleBlur('email')}
                         />
                        <div className='error'>{formik.touched.email&& formik.errors.email}</div>
                        <CustomInput type="password" name='password' placeholder='Password' value={formik.values.password} onChange={formik.handleChange('password')} onBlur={() =>formik.handleBlur('password')}/>
                        <div className='error'>{formik.touched.password&& formik.errors.password}</div>
                                <div>
                                    <Link to='/forgot-password'>Forgot Password</Link>
                                    <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                        <button className='button border-0' type='submit'>
                                            Login
                                        </button>
                                        <Link to='/signup' className='button signup'>
                                        SignUp
                                        </Link>
                                         
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>

       </Container>
  </>

  )
}

export default Login
