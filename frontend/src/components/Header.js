import React, { useEffect, useState } from 'react'
import Container from './Container';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import user from '../images/user.svg'
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/product/productSlice';
function range(start, end) {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}
const options = range(0, 1000).map((o) => `Item ${o}`);
const Header = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state?.user?.cartProducts);
    const authState = useSelector(state => state?.auth);
    console.log(authState);
    const navigate=useNavigate();
    const productStae=useSelector(state=>state?.product.product)
     const [paginate, setPaginate] = useState(true);
     const [productOpt, setProductOpt] = useState([]);
    const [total, setTotal] = useState(null);
    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < cartState?.length; i++) {
            sum = sum + (Number(cartState[i].quantity) * Number(cartState[i].price));
        }
        setTotal(sum);
    }, [cartState]);
    useEffect(()=>{
        let data=[];
        for (let index = 0; index < productStae.length; index++) {
            const element=productStae[index];
            data.push({id:index,prod:element?._id,name:element?.title})
        }
        setProductOpt(data);
    },[productStae])
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <>
            <header className='header-top-strip py-3'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <p className="text-white mb-0">
                                Free Shipping Over $100 & Free Returns
                            </p>
                        </div>

                        <div className="col-6"> <p className="text-end text-white mb-0">
                            Hotline:<a className="text-white" href='tel:+012342314'>+012342314</a>
                        </p>
                        </div>

                    </div>


                </div>
            </header>
            <header className="header-upper py-3">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-2">

                            <h2>
                                <Link className='text-white'>Developers</Link>
                            </h2>
                        </div>
                        <div className="col-5">
                            <div className="input-group ">
                                <Typeahead
                                    id="pagination-example"
                                    onPaginate={() => console.log('Results paginated')}
                                    onChange={(selected)=>{
                                                navigate(`/product/${selected[0]?.prod}`)
                                                dispatch(getAProduct(selected[0]?.prod));
                                    }}
                                    options={productOpt}
                                    minLength={2}
                                    paginate={paginate}
                                    labelKey={"name"}
                                    placeholder="Serach product hear..."
                                />
                                <span className="input-group-text p-3" id="basic-addon2">
                                    <BsSearch className="fs-5" />
                                </span>
                            </div>

                        </div>
                        <div className="col-5">
                            <div className="header-upper-links d-flex align-items-center justify-content-between">
                                <div>
                                    {/* <Link to='/compare-product' className="d-flex align-items-center gap-10 text-white">
                                        <img src="images/compare.svg" alt="" />
                                        <p className="mb-0">

                                            Compare <br /> Product
                                        </p>

                                    </Link> */}
                                </div>
                                <div>
                                    <Link to='/wishlist' className="d-flex align-items-center gap-10 text-white">
                                        <img src="images/wishlist.svg" alt="wishlist" />
                                        <p className="mb-0">
                                            Fauvorite<br /> My account
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to={authState?.user === null ? "/login" : '/my-profile'} className="d-flex align-items-center gap-10 text-white">
                                        <img src={user} alt="user" />
                                        {
                                            authState?.user === null ?
                                                <p className="mb-0">
                                                    Login<br /> My Acount
                                                </p> :
                                                <p className="mb-0">
                                                    Welcome{authState?.user.firstname}
                                                </p>
                                        }

                                    </Link>

                                </div>
                                <div>
                                    <Link to='/cart' className='d-flex align-items-center gap-10 text-white'>
                                        <img src="images/cart.svg" alt="cart" />
                                        <div className="d-flex flex-column">
                                            <span className='badge bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span>
                                            <p className="mb-0">${total ? total : 0}</p>
                                        </div>

                                    </Link>

                                </div>
                            </div>
                            <div className="col5"></div>
                        </div>

                    </div>

                </div>

            </header>
            <header className="header-bottom py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="menu-bottom d-flex laign-items-center gap-30">
                                <div>
                                    <div className="dropdown">

                                        <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15  d-flex align-items-center"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <img src="images/menu.svg" alt="" />
                                            <span className="me-5 d-inline-block">
                                                Shop Categories
                                            </span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item text-white" to="#">Action</Link></li>
                                            <li><Link className="dropdown-item text-white" to="#">Another action</Link></li>
                                            <li><Link className="dropdown-item text-white" to="#">Something else here</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="menu-links">
                                    <div className="d-flex align-items-center gap-15">

                                        <NavLink className="text-white" to="/">Home</NavLink>
                                        <NavLink className="text-white" to="/product">Our Store</NavLink>
                                        <NavLink className="text-white" to="/blogs">Blogs</NavLink>
                                        <NavLink className="text-white" to="/my-orders">My Orders</NavLink>
                                        <NavLink className="text-white" to="/contact">Contact</NavLink>
                                        <button className='border border-0 bg-transparent text-white text-uppercase' onClick={handleLogout}></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
export default Header
