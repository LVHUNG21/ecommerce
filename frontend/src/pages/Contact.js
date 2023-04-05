import React from 'react'
import {AiOutlineHome,AiOutlineMail} from 'react-icons/ai';
import {BiPhoneCall,BiInfoCircle} from 'react-icons/bi';
import Container from '../components/Container';
import * as yup from 'yup'
import {useFormik} from 'formik'
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/contactSlice';
let contactSchema = yup.object({
  name:yup.string().required('name is required'),
  email:yup.string().nullable().email('email should be valid').required('Email is required'),
  mobile:yup.string().default('').nullable().required('moblie is required'),
  comments:yup.string().default('').nullable().required('comment is required')
});

const Contact = () => {
  const dispatch=useDispatch()
  const formik= useFormik({
     initialValues: {
       name:'',
       mobile:'',
       email: '',
       comments:'',
     },
     validationSchema:contactSchema,
     onSubmit: values => {
       dispatch(createQuery(values))  
       alert(JSON.stringify(values, null, 2));
     }})

  return (
  <>
    <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44659.43848619756!2d105.81856801045495!3d20.95954385021451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acef8ad5350f%3A0x89435a3528118ff5!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaMSDbmcgTG9uZw!5e0!3m2!1svi!2s!4v1677938718109!5m2!1svi!2s" 
            width="600" height="450" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        <div className="col-12  mt-5">
          <div className="contact-inner-wrapper d-flex justify-content-between">
           <div>
            <h3 className='contact-title'>
              Contact
            </h3>
            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'> 
              <div>
                <input type="text" className="form-control" placeholder='Name' name='name' onChange={formik.handleChange('name')} onBlur={formik.handleBlur('name')} value={formik.values.name}/>
                  <div className='errors'>
                    {
                      formik.touched.name &&formik.errors.name
                    }

                  </div>
              </div>
              <div>
                <input type="text" className="form-control" placeholder='email' name='email' onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')} value={formik.values.email}/>
                  <div className='errors'>
                    {
                      formik.touched.email&&formik.errors.email
                    }

                  </div>
              </div>
              <div>
                <input type="text" className="form-control" placeholder='mobile' name='mobile' onChange={formik.handleChange('mobile')} onBlur={formik.handleBlur('mobile')} value={formik.values.mobile}/>
                  <div className='errors'>
                    {
                      formik.touched.mobile &&formik.errors.mobile
                    }

                  </div>
              </div>
              <div>
                <textarea name="comments" id="" placeholder='Comments' onChange={formik.handleChange('comments')} onBlur={formik.handleBlur('comments')} value={formik.values.comments} className="w-100 form-control" cols="30" row="4"/>
                <div className='errors'>
                    {
                      formik.touched.comments &&formik.errors.comments
                    }

                  </div>
              </div>
              <div>
                <button className="button border-0">

                  Submit

                </button>
              </div>
            </form>
           </div>
            <div>
              <h3 className='contact-title'>
               Get in Touch with Us 
              </h3>
              <div>
                <ul className='ps-0'>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiOutlineHome className='fs-5'/>
                          <address>Hno:277,near village</address>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                          <BiPhoneCall className='fs-5'/>
                          <a href ="hung@gmail.com">hung@gmail.com</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiOutlineMail className='fs-5'/>
                          <a href="tel:+91 34234234">+91 4324343242</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                          <BiInfoCircle className='fs-5'/>
                          <p className='mb-0'>Monday-Friday-10AM-8PM</p>
                    </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
        </div>
      </Container> 
  </>
  )
}

export default Contact
