import React from 'react'
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'
const SpecialProduct = () => {
    return (
        <div className="col-6">
            <div className="special-product-card">
                <div className="d-flex-justify-content-between">
                    <div>
                        <img src='images/watch.jpg' className="img-fluid" alt='watch' />
                    </div>
                    <div>
                        <div className="special-product-content">
                            <h5 className="brand">Havels</h5>
                            <h6 className="title">
                                Samsung galaxy note +10 mobile phone; Sim...
                            </h6>
                            <ReactStars
                                count={5}
                                // onChange={ratingChanged}
                                size={24}
                                edit='false'
                                value={3}
                                activeColor="#ffd700"
                            />,
                            <p className="price"><span className="red-p">$100</span> &nbsp
                                <strike>$200</strike>
                            </p>
                            <div className="discount-till d-flex align-items-center gap-10">
                                <p className="mb-0">
                                    <b>5</b> days
                                </p>
                                <div className="d-flex gap-10 align-items-centers">
                                    <span className='badge rounded-circle p-3 bg-danger'>1</span>
                                    <span className='badge rounded-circle p-3 bg-danger'>1</span>
                                    <span className='badge rounded-circle p-3 bg-danger'>1</span>
                                </div>
                                <div className="prod-count mt-3">
                                    <p>Product: 5</p>
                                    <div className="progress">
                                        <div className="progress">
                                            <div className="progress-bar" 
                                                role="progressbar" 
                                                style={{width: '25%'}} 
                                                aria-valuenow="25" 
                                                aria-valuemin="0" 
                                                aria-valuemax="100">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <Link className='button'>Add to Card</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProduct
