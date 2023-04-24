import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CustomInput from './CustomInput';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlide';
const Login = () => {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  let userSchema = Yup.object({
    email: Yup.string().email("Moi nhap dung email").required("Email is Required"),
    password: Yup.string().required("Password is Required")
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const {user,isLoading,isError,isSuccess,message}=useSelector(
    (state)=>state.auth
  );
  useEffect(()=>{
    if(!user==null || isSuccess)
    {
    navigate('admin');
    }else{
    navigate('');
    }
  },[user,isLoading, isError,isSuccess,message]);
  return (
    <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type="text" className='email' label="Email Address" id="email" val={formik.email} onChng={formik.handleChange('email')}
          />
          <div className='error'>
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          </div>
          <CustomInput type="password" className='password' label="Password" id="pass" val={formik.password} onChng={formik.handleChange('password')}
          />
          <div className="error">
          {formik.touched.password&& formik.errors.password? (
            <div>{formik.errors.password}</div>
          ) : null}
          </div>
            
          <button to="/admin" className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5" style={{ background: "#ffd333" }} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login