import React from 'react'
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'
const SpecialProduct = (props) => {
    const { title,brand,totalrating,price,sold,quantity,id } =props;
    return (
        <div className="col-6">
            <div className="special-product-card">
                <div className="d-flex-justify-content-between">
                    <div>
                        <img src='images/watch.jpg' className="img-fluid" alt='watch' />
                    </div>
                    <div>
                        <div className="special-product-content">
                            <h5 className="brand">{brand}</h5>
                            <h6 className="title">
                            {title}
                            </h6>
                            <ReactStars
                                count={5}
                                // onChange={ratingChanged}
                                size={24}
                                edit={false}
                                value={totalrating}
                                activeColor="#ffd700"
                            />,
                            <p className="price"><span className="red-p">$100</span> &nbsp
                                <strike>${price}</strike>
                            </p>
                            {/* <div className="discount-till d-flex align-items-center gap-10">
                                <p className="mb-0">
                                    <b>5</b> days
                                </p>
                                <div className="d-flex gap-10 align-items-centers">
                                    <span className='badge rounded-circle p-3 bg-danger'>1</span>
                                    <span className='badge rounded-circle p-3 bg-danger'>1</span>
                                    <span className='badge rounded-circle p-3 bg-danger'>1</span>
                                </div>
                                </div> */}
                                <div className="prod-count mt-3">
                                    <p>Product: ${quantity}</p>
                                    <div className="progress">
                                        <div className="progress">
                                            <div className="progress-bar" 
                                                role="progressbar" 
                                                style={{width:(quantity/quantity+sold*100 + '%')}}  
                                                aria-valuenow={(quantity/quantity+sold*100)}
                                                aria-valuemin= {quantity}
                                                aria-valuemax={sold + quantity}>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <Link className='button' to={'/product/'+id}>View</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
}

export default SpecialProduct
