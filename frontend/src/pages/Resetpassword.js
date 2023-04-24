import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import { resetPassword } from '../features/user/userSlice';
let passwordSchema= yup.object({
    password:yup.string().required('password is required'),

  });
const Resetpassword = () => {
    const location=useLocation();
    const getToken=location.state.pathname.split("/")[2];
    const formik = useFormik({
      initialValues: {
        password:'',
      },
      validationSchema:passwordSchema,
      onSubmit: values => {
               dispatch(resetPassword({token:getToken,password:values.password}));
        // setTimeout(()=>{
        //         navigate('/')
        // },500)
      }});



    return (
        <>
            <Container class1="login-wrapper  py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3"></h3>
                            <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                        <CustomInput type="password" name='password' placeholder='Password' value={formik.values.password} onChange={formik.handleChange('password')} onBlur={() =>formik.handleBlur('password')}/>
                        <div className='error'>{formik.touched.password&& formik.errors.password}</div>
                                <CustomInput type="password" name='confpassword' placeholder='Confirm Password'/>
                                <div>
                                    <div className='mt-3 d-flex jusitfy-content-center gap-15 align-items-center'>
                                        <button className='botton border-0'>
                                            OK
                                        </button>

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

export default Resetpassword
