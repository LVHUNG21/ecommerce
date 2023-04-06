import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link, useLocation} from 'react-router-dom'
import prodcompare from "../images/prodcompare.svg";
import wish from '../images/wish.svg';
import wishlist from '../images/wishlist.svg'
import watch from '../images/watch.jpg'
import watch2 from '../images/watchrl.jpg';
import addcart from '../images/add-cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import view from '../images/view.svg';
import { addToWishList } from '../features/product/productSlice';
const ProductCard = (props) => {
    const  {grid,data}  = props;
    let location = useLocation();
    const dispatch=useDispatch();
    const addToWishListt =(id)=>{
        dispatch(addToWishList(id))
    }
    // alert(location);
    return (

            <>
            {
                data?.map((item,index)=>{
                    return (
                        <div key ={index} className={`${location.pathname == "/product" ? `col-${grid}` : "col-3"}`}>

                        <div className="product-card position-relative">
                            <div className="wishlist-icon position-absolute">
                                <button className='border-0 bg-transparent 'onClick={(e)=>{
                                    addToWishListt(item?._id)
                                }}>
                                    <img src="images/wish.svg" alt="wishlist" />
                                </button>
                            </div>
                            <div className="product-image">
                                <img src={item?.images[index]?.url} className='img-fluid mx-auto' alt='product-image' width={160} />

                                <img src={watch2} className='img-fluid  mx-auto' width={160} alt='product image' />
                            </div>
                            <div className="product-details">
                                <h6 className="brand">{item?.brand}</h6>
                                <h5 className="product-title">
                                {item?.title}
                                </h5>
                                <ReactStars
                                    count={5}
                                    // onChange={ratingChanged}
                                    size={24}
                                    edit={false}
                                    value={item?.totalrating?.toString()}
       
                                    activeColor="#ffd700"
                                />,
                                <p className={`description ${grid == 12 ? "d-block" : "d-none"}`} dangerouslySetInnerHTML={{__html:item?.description}}>
                                </p>
                                <p className="price">{item?.price}</p>
                            </div>
                            <div className="action-bar position-absolute">
                                <div className="d-flex flex-column gap-15">
                                    <button  className="border-0 bg-transparent">
                                        <img src={prodcompare} alt='compare' />
                                    </button>
                                    <Link to={'/product/'+item?._id} className="border-0 bg-transparent">
                                        <img src={view} alt='view' />
                                    </Link>
                                    <button className="border-0 bg-transparent">
                                        <img src={addcart} alt='addcart' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
            {/* <div className={`${location.pathname == "/store" ? `col-${grid}` : "col-3"}`}>

                <Link to={`${location.pathname=="/" ? "product/:id": location.pathname== "/product/:id" ? "product/:id" :":id"}`} className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                            <img src={wish} alt="wishlist" />
                        </button>
                    </div>
                    <div className="product-image">
                        <img src={watch} className='img-fluid' alt='product image' />
                        <img src={watch2} className='img-fluid' alt='product image' />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">Havels</h6>
                        <h5 className="product-title">
                            Kids headphone bulk 10 pack multi colored for students
                        </h5>
                        <ReactStars
                            count={5}
                            // onChange={ratingChanged}
                            size={24}
                            edit={false}
                            value={3}

                            activeColor="#ffd700"
                        />,
                        <p className={`description ${grid == 12 ? "d-block" : "d-none"}`}>
                            device that uses either a system of wires along which electrical signals are sent or a system of radio signals to make it possible for you to speak to someone in another place who has a similar device: Just then, his phone rang

                        </p>

                        <p className="price">$1000</p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                            <button className="border-0 bg-transparent">
                                <img src={prodcompare} alt='compare' />
                            </button>
                            <button className="border-0 bg-transparent">
                                <img src={view} alt='view' />
                            </button>
                            <button className="border-0 bg-transparent">
                                <img src={addcart} alt='addcart' />
                            </button>
                        </div>
                    </div>
                </Link>
            </div> */}
           
            </>
    )
}

export default ProductCard
