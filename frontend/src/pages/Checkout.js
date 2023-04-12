import React from 'react'
import watch from '../images/watch.jpg';
import { Link } from 'react-router-dom'
import Container from '../components/Container';
import { BiArrowBack } from 'react-icons/bi'
import{useDispatch,userSelector} from  'react-redux'
import {useFormik} from 'formik'
import * as yup from 'yup';
let shippingSchema= yup.object({
    firstName:yup.string().required('first name is required'),
    lastName:yup.string().required('Last Name is required'),
    address :yup.string().required('string is required'),
    state:yup.string().required('state is required'),
    city:yup.string().required('city is required'),
    country:yup.string().required('country is required'),
    pincode:yup.number().required('Pindcode is required')

  });
const Checkout = () => {
    const dispatch=useDispatch();
    const cartState=userSelector(state=>state.auth.cartProdcuts)
    const [totalAmount,setTotalAmount]=useState(null);
    const [shippingInfo,setShippingInfo]=useState(null);
    useEffect(()=>{
        let sum=0;
        for (let index = 0; index < cartState?.length; index++) {
            sum=sum+(Number(cartState[index].quantity)*cartState[index].price)
            setTotalAmount(sum)
            // console.log()
            
        }
    },[cartState])
    const formik = useFormik({
      initialValues: {
        firstName:'',
        lastName:'',
        address:'',
        state:'',
        country:'',
    pincode:'',
    other:'',
      },
      validationSchema:shippingSchema,

      onSubmit: values => {
        setShippingInfo(values) 
      }});
    return (
        <>
            <Container class1="checkout-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-7">
                            <div className="checkout-left-data">
                                <h3 className="website-name">Dev</h3>
                                <nav style={{ "--bs-breadcrumb-divider:": ">" }} aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item total-price"><Link className="text-dark" to="/cart" href="#">Cart</Link></li>&nbsp;/&nbsp;
                                        <li className="breadcrumb-item active total-price" aria-current="page">Information</li>&nbsp;
                                        <li className="breadcrumb-item active total-price">Shipping</li>&nbsp;/
                                        <li className="breadcrumb-item active total-price" aria-current="page">Payment</li>
                                    </ol>
                                </nav>
                                <h4 className="title total">
                                    Contact Information
                                </h4>
                                <p className="user-details total">
                                    hun@gmail.com
                                </p>
                                <h4 className="mb-3">
                                    Shipping Address
                                </h4>
                                <form action="" onSubmit={formik.handleSubmit} className='d-flex gap-15 flex-wrap justify-content-between'>
                                <div className="w-100">
                                    <select name="country" 
                                    value={formik.values.country}
                                    onChange={formik.handleChange("country")} 
                                    onBlur={formik.handleBlur("country")}
                                     className="form-control form-select" id="">
                                        <option value="" selected disabled>Seclect country</option>
                                        <option value="VietNAM" >Seclect country</option>
                                    </select>
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.country && formik.errors.country
                                        }
                                    </div>
                                
                                    </div>
                                <div className="flex-grow-1">
                                    <input type="text" placeholder='First Name' onChange={formik.handleChange("firstName")} 
                                    onBlur={formik.handleBlur('firstName')}
                                     name='country' value={formik.values.firstName} className="form-control" />
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.firstName&& formik.errors.firstName
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1" >
                                    <input type="text" placeholder="Last Name"className="form-control" 
                                    onChange={formik.handleChange("lastName")} 
                                    onBlur={formik.handleBlur('lastName')}
                                     name='lastName' value={formik.values.lastName}
                                    />
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.lastName && formik.errors.lastName
                                        }
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input type="text" placeholder="Address" className="form-control"
                                   onChange={formik.handleChange("address")} 
                                    onBlur={formik.handleBlur('address')}
                                     name='country' value={formik.values.address} 
                                    />
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.address&& formik.errors.address
                                        }
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input type="text" placeholder="Apartment, Suite" className="form-control" 
                                   onChange={formik.handleChange("other")} 
                                    onBlur={formik.handleBlur('other')}
                                     name='other' value={formik.values.other} 
                                    />
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.other&& formik.errors.other
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text" placeholder="City"className="form-control"
                                   onChange={formik.handleChange("city")} 
                                    onBlur={formik.handleBlur('city')}
                                     name='city' value={formik.values.city} 
                                    />
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.city&& formik.errors.ctiy
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select name="" className="form-control form-select" id=""
                                   onChange={formik.handleChange('state')}
                                   onBlur={formik.handleBlur('state')}
                                        value={formik.values.state}
                                    >
                                        <option value="" selected disabled>Select State</option>
                                        <option value="Hanoi">Hanoi</option>
                                    </select>
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.state&& formik.errors.state
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text" placeholder='Zipcode' className="form-control"
                                    name='pincode' 
                                   onChange={formik.handleChange('pincode')}
                                   onBlur={formik.handleBlur('pincode')}
                                        value={formik.values.pincode}
                                    />
                                    <div className='error ms-2 my-1'>
                                        {
                                            formik.touched.pincode&& formik.errors.pincode
                                        }
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                    <Link to='/cart'className="text-dark"><BiArrowBack className="me-2"/>Return to Cart</Link>
                                    <Link to='/cart' className="button">Continue to shipping</Link>
                                    <button className="button" type='submit'>Place Order</button>
                                    </div>
                                </div>
                                </form>
                                <div></div>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="border-bottom py-4">
                                {
                                    cartState && cartState?.map((item,index)=>{
                                        return (
                                            <div key='index' className="d-flex gap-10 mb-2 align-items-center ">
                                            <div className="w-75 d-flex gap-10">
                                                <div className="w-25 position-relative"> 
                                                <span style={{top:"-10px",right:"2px"}}className="badge bg-secondary text-white rounded-circle p-2 position absolute">
                                                    {item?.quantity}
                                                </span>
            
                                                    <img className="img-fluid" height={100} width={100} src={item?.productid?.images[0]?.url} alt="product"/>
                                                </div>
                                                <div>
                                                    <h5 className="total-price">{item?.productId?.title}</h5>
                                                    <p className="total-price">{item?.color?.title}</p>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="total">{item?.price * item?.quantity}</h5>
            
                                            </div>
                                            </div>
                                        )
                                    })
                                }
                             
                            </div>
                            <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p>Subtotal</p>
                                <p>$100000</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='mb-0'>Shipping</p>
                                <p className='mb-0'>$5</p>
                            </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                                <h4>Total</h4>
                                <h5>{totalAmount?totalAmount+5: '0' }</h5>
                            </div>
                        </div>
                    </div>
            </Container>
        </>
    )

}

<>

</>
export default Checkout