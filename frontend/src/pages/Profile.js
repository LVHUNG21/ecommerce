import React, { useState } from 'react'
import Container from '../components/Container'
import {useFormik} from 'formik'
import * as yup from 'yup';
import {FiEdit} from 'react-icons/fi'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
 
let profileSchema= yup.object({
    firstname:yup.string().required('Firt name is required'),
    lastname:yup.string().required('last name is required'),
    email: yup.string().email("Moi nhap dung email").required("Email is Required"),
    mobile:yup.string().required("mobile number is required"),

  });
const Profile = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userState=useSelector(state=>state.auth.user)
    const [edit,setEdit]=useState(true)
    const formik = useFormik({
        enableReinitialize:true,
      initialValues: {
        firstname:userState?.firstname,
        lastname:userState?.lastname,
        email: userState?.email,
        mobile:userState?.mobile,

      },
      validationSchema:profileSchema,

      onSubmit: (values) => {
               dispatch(updateProfile(values));
        // if(isSuccess && createdUser){
        //     toast.info('User Createdd successfullly')
        // }
        setTimeout(()=>{
                navigate('/')
            
        },500)
      }});
    return (
        <>
            <Container class1='cart-wrapper home-wrapper-w py-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h3 className='my-3'>
                                Update Profile
                            </h3>
                            <FiEdit className='fs-3' onClick={()=>setEdit(false)}/>

                            <img 
                            src='' alt='' 
                            ></img>

                        </div>

                    </div>
                    <div className='col-12'>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label for="example1" className="form-label">First Name</label>
                                <input type="text" name='firstname' className="form-control" id="example1"
                                    value={formik.values.firstname} 
                                    onChange={formik.handleChange('firstname')}
                                    onBlur={formik.handleBlur('firstname')}
                                />
                                <div className='error'>
                                        {formik.touched.firstname && formik.errors.firstname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="example2" className="form-label">Last Name</label>
                                <input type="text" name='lastname' className="form-control" id="example2"
                                    value={formik.values.lastname} 
                                    onChange={formik.handleChange('lastname')}
                                    onBlur={formik.handleBlur('lastname')}
                                />
                                <div className='error'>
                                        {formik.touched.lastname&& formik.errors.lastname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    value={formik.values.email} 
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}/>
                                <div className='error'>
                                        {formik.touched.email&& formik.errors.email}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword2" className="form-label">Mobile No</label>
                                <input type="number" name='mobile' className="form-control" id="exampleInputPassword2"
                                    value={formik.values.mobile} 
                                    onChange={formik.handleChange('mobile')}
                                    onBlur={formik.handleBlur('mobile')}/>
                                <div className='error'>
                                        {formik.touched.mobile&& formik.errors.mobile}
                                </div>
                            </div>
                            {
                                edit===false && 
                            <button type="submit" className="btn btn-primary">Save</button>
                            }
                        </form>

                    </div>
                </div>

            </Container>
        </>
    )
}
export default Profile
