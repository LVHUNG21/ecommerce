import  { useEffect } from 'react'
import watch from '../images/watch.jpg';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductCart, getUserCart, updateProductCart } from '../features/user/userSlice';
import { useState } from 'react';
import React, { Component } from 'react';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
const Cart = () => {
    const dispatch=useDispatch();
    const [productUpdateDetail,setProductUpdateDetail]=useState(null)
    const [totalAmount,setTotalAmount]=useState(null);
    
    const userCartState=useSelector(state=>state?.auth?.cartProducts);
    console.log(userCartState)
    // console.log(`quantity${quantity}`)

    useEffect(()=>{
        dispatch(getUserCart());
    },[userCartState])
    useEffect( ()=>{
        if(productUpdateDetail!==null){
           dispatch(updateACartProduct({cartItemId:productUpdateDetail?.cartItemId,quantity:productUpdateDetail?.quantity}))
    }},[productUpdateDetail])
    const deleteACartProduct= async(id)=>{
        dispatch(deleteProductCart(id))
        dispatch(getUserCart());
    }
    const updateACartProduct= async(productUpdateDetail)=>{
        dispatch(updateProductCart({cartItemId:productUpdateDetail?.cartItemId,quantity:productUpdateDetail?.quantity}))
        dispatch(getUserCart())
    }
    useEffect(()=>{
        let sum=0;
        for (let index = 0; index < userCartState?.length; index++) {
            sum=sum+(Number(userCartState[index].quantity)*userCartState[index].price)
            setTotalAmount(sum)
            // console.log()
        }
    },[userCartState])
    return (
        <>
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                    <ErrorBoundary>
                    <div className="row">
                        <div className="col-12">
                            <div className="cart-data py-3 d-flex justify-content-between align-items-center">
                                <h4 className="cart-col-1">Product</h4>
                                <h4 className="cart-col-2">Price</h4>
                                <h4 className="cart-col-3">Quantity</h4>
                                <h4 className="cart-col-4">Total</h4>
                            </div>
                            {
                                userCartState && userCartState?.map((item,index)=>{
                                    return (
                                        <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                        <div className="cart-col-1 gap-15 d-flex align-items-center">
                                            <div>
                                                <img src={watch} alt="product image" className="w-25" />
                                            </div>
                                            <div className="w-75">
                                                <p>
                                                    {item?.productId.title}
                                                </p>
                                                <p className="d-flex gap-3">Color:
                                               <ul className='colors ps-0'>
                                                   <li style={{backgroundColor:item?.color.title}}></li>

                                                   </ul> 
                                                </p>

                                                <p className="size"></p>
                                            </div>
                                        </div>
                                        <div className="cart-col-2">
                                            <h5 className="price">${item?.price}</h5>
                                        </div>
                                        <div className="cart-col-3 d-flex align-items-center gap-15">
                                            <div>
                                                <input className="form-control" type='number'
                                                 name='' 
                                                 id='' 
                                                 min={1} 
                                                 max={10}
                                                  value={productUpdateDetail?.quantity ? productUpdateDetail.quantity :item?.quantity}
                                                   onChange={(e)=>{setProductUpdateDetail({cartItemId:item?._id,quantity:e.target.value})
                                                }}/>
                                            </div>
                                            <div>
                                                <AiFillDelete onClick={()=>deleteACartProduct(item?._id)} className='text-danger' />
                                            </div>
                                        </div>
                                        <div className="cart-col-4">
                                            <h5 className="price">${item?.price* item?.quantity}</h5>

                                        </div>
                                    </div>
                                    )
                                })
                            }
                         
                            {/* <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                <div className="cart-col-1 gap-15 d-flex align-items-center">
                                    <div>
                                        <img src={watch} alt="product image" className="w-25" />
                                    </div>
                                    <div className="w-75">
                                        <h5>Kid Phone</h5>
                                        <p >Size:MM</p>
                                        <p >Color:</p>
                                    </div>
                                </div>
                                <div className="cart-col-2">
                                    <h5 className="price">$100</h5>
                                </div>
                                <div className="cart-col-3 d-flex align-items-center gap-15">
                                    <div>
                                        <input className="form-control" type='number' name='' id='' min={1} max={10} />
                                    </div>
                                    <div>
                                        <AiFillDelete className='text-danger' />
                                    </div>
                                </div>
                                <div className="cart-col-4">
                                    <h5 className="price">$100</h5>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-12 py-2">
                            <div className="d-flex justify-content-between align-items-baseline">
                            <Link to="/product"className='button'>Continue to Shopping</Link>
                            {
                                    (totalAmount !==null  || totalAmount !==0 )&&   <div className="d-flex flex-column align-items-end">

                                    <h4>Subtotal:${totalAmount}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to='/checkout' className='button'> Checkout</Link>
                                   
                                </div>
                                }
                          
                        </div>
                        </div>
                    </div></ErrorBoundary>
            </Container>
        </>
    )
}


export default Cart