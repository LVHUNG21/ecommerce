import React from 'react'
import Container from '../components/Container';
import { getUserProductWishlist} from '../features/user/userSlice';
import { addToWishList } from '../features/product/productSlice';

const Wishlist = () => {
    const [grid,setGrid]=useState(4);
    const productState=useSelector((state)=>state.product.product); 
    const dispatch=useDispatch();
    useEffect(()=>{
        getWishlistFromDb()
    })
    const getWishlistFromDb=()=>{
        dispatch(getUserProductWishlist());
    }
    const wishlistState=useSelector(state=>state.user.wishlist)
    const removeFromWishlist= async (id)=>{
        dispatch(addToWishlist(id))
        await dispatch(getUserProductWishlist(id))
    }
  return (
  <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
            {
                wishlistState.length  ===0 && <div className='text-center fs-3'>
                    NoData
                </div>

            }
            {
                wishlistState.map((item,index)=>{

                    <div className="col-3" key={index}>
                    <div className="wishlist-card position-relative">
    
                    <img onClick={()=>{
                        removeFromWishlist(item?._id);
                    }} src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                        <div className="wishlist-card-image bg-white">
                            <img src={item?.images[0].url ? item?.images[0].url :"images/watch.jpg"} 
                            className='img-fluid  d-block mx-auto' alt ="watch" width={160}/>
    
                        </div>
                        <div className='px-3 py-3'>
                        <h5 className="title">{item?.title}</h5>
                        <h6 className="price">{item?.price}</h6>
    
                        </div>
                    </div>
                </div>
                })
                
            }
            {/* <div className="col-3">
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
            </div> */}
           
        </div>
  </Container>
  )
}

export default Wishlist
