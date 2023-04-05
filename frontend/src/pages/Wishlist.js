import React, { useEffect } from 'react'
import { getWishlist } from '../../../Backend/controller/useCtrl';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
const Wishlist = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        getWishlistFromDb();

    })
  const wistlistState=useSelector((state)=>{
      state?.auth?.wishlist?.wishlist
  })
  return (
  <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
            <div className="col-3">
                <div className="wishlist-card position-relative">

                <img src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                    <div className="wishlist-card-image">
                        <img src="images/watch.jpg" className='img-fluid w-100' alt ="watch"/>

                    </div>
                    <div className='px-3 py-3'>
                    <h5 className="title">Nokia</h5>
                    <h6 className="price">$100</h6>

                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="wishlist-card position-relative">

                <img src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                    <div className="wishlist-card-image">
                        <img src="images/watch.jpg" className='img-fluid w-100' alt ="watch"/>

                    </div>
                    <div className='px-3 py-3'>
                    <h5 className="title">Nokia</h5>
                    <h6 className="price">$100</h6>

                    </div>
                </div>

            </div>
            <div className="col-3">
                <div className="wishlist-card position-relative">

                <img src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                    <div className="wishlist-card-image">
                        <img src="images/watch.jpg" className='img-fluid w-100' alt ="watch"/>

                    </div>
                    <div className='px-3 py-3'>
                    <h5 className="title">Nokia</h5>
                    <h6 className="price">$100</h6>

                    </div>
                </div>

            </div>
        </div>
  </Container>
  )
}

export default Wishlist
