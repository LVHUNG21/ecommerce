import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik'
import * as yup from 'yup';
import Container from '../components/Container'
import { forgotPasswordToken } from '../features/user/userSlice';
let emailSchema= yup.object({
    email: yup.string().email("Moi nhap dung email").required("Email is Required"),
  });
const Forgotpassword = () => {
    const formik = useFormik({
      initialValues: {
        email: '',

      },
      validationSchema:emailSchema,
      onSubmit: values => {
               dispatch(forgotPasswordToken(ivalues));
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
                            <h3 className="text-center mb-3">Reset Your Password</h3>
                            <p className="text-center my-2 mb-3">
                                We will send you  an email to reset  your password
                            </p>
                            <form action="" onSubmit={} className="d-flex flex-column gap-15" >
                                <CustomInput type="email" name='email' placeholder='email' 
                        value={formik.values.email} 
                        onChange={formik.handleChange('email')}
                         onBlur={() => formik.handleBlur('email')}/>
                                <div>
                                    <div className='mt-3 d-flex jusitfy-content-center flex-column gap-15 align-items-center'>
                                        <button className='botton border-0 ' type='submit'>
                                            Submit
                                        </button>
                                        <Link to='/login'>Cancel</Link>

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

export default Forgotpassword
