import React, { useState, useEffect } from 'react'
import ReactStars from 'react-rating-stars-component';
import BreadCrumb from '../components/BreadCrumb';
import { Helmet } from 'react-helmet';
import Meta from '../components/Meta';
import { Link, getLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/product/productSlice';
const OurStore = () => {

    const [grid, setGrid] = useState(4);
    const productState = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    const [brands, setBrands] = useState([]);
    const [categoryies, SetCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [color,setColor]=useState([]);

    //filter States
    const [tag,setTag]=useState(null);
    const [brand,setBrand]=useState(null);
    const [category, Setcategory] = useState(null);
    const [minPrice,SetminPrice]=useState(null);
    const [maxPrice,SetmaxPrice]=useState(null);
    const [sort,setSort]=useState(null);
    useEffect(() => {
        let newBrands = [];
        let category = [];
        let newtags=[];
        let newColor=[];

        for (let index = 0; index < productState.length; index++) {
            const element = productState[index];
            newBrands.push({ brand: element.brand })
            category.push(element.category);
            newtags.push(element.tags);
            newColor.push(element.color)
        }
        setBrands(newBrands);
        SetCategories(category);
        setTags(newtags);
    }, [productState])
    console.log([...new Set(brands)], [...new Set()], [...new Set(tags)])
    useEffect(() => {
        getProducts();
    },[sort,tag,brand,category,minPrice,maxPrice])
    const getProducts = () => {
        dispatch(getAllProducts(sort,tag,brand,category,minPrice,maxPrice));
    }
    const gridSetter = (i) => {
        setGrid(i)
    }
    return (
        <>
            {/* <Meta title= {"OurStore"}/>
  <BreadCrumb title='Our Store'/> */}
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">

                        <div className="filter-card mb-3">
                            <h3 className="filter-title">
                                Shop By Categories
                            </h3>
                            <div>
                                <ul className='ps-0'>
                                    {
                                        categoryies && [...new Set(categories).map((item, index) => {
                                            return <li key={index} onClick={() => {
                                                Setcategory(item)
                                            }}>
                                                {item}

                                            </li>
                                        })]
                                    }

                                </ul>

                                <ul className="ps-0">
                                    <li>Watch</li>
                                    <li>TV</li>
                                    <li>Camera</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">
                                Filter By
                            </h3>
                            <div>
                                <h5 className="sub-title">Avalability</h5>
                                <div>
                                    <div className="form-check">
                                        <input className='form-check-input' type="checkbox" value='' id='' />
                                        <label className=" form-check-label" htmlFor="">
                                            In Stock(1)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value='' id='' />
                                        <label className="form-check-label" htmlFor="">
                                            Out of Stock(2)
                                        </label>
                                    </div>
                                </div>
                                <h5 className="sub-title">Price</h5>
                                <div className="d-flex align-items-center gap-10">
                                    <div className="form-floating">
                                        <input type="number" className="form-control py-1" id="floatingInput" placeholder="From" onChange={(e)=>SetminPrice(e.target.value)} />
                                        <label htmlFor="floatingInput"> From</label>
                                    </div>
                                    <div className="form-floating ">
                                        <input type="number" className="form-control py-1" id="floatingInput" placeholder="To" onChange={(e)=>SetmaxPrice(e.target.value)}/>
                                        <label htmlFor="floatingInput1"> To</label>
                                    </div>
                                </div>
                                {/* <h5 className="sub-title">Colors</h5>
                                <div>
                                    <Color />
                                </div>
                                <h5 className="sub-title">Size</h5>
                                <div>
                                    <div className="form-check">
                                        <input className='form-check-input'
                                            type="checkbox" value='' id='color-1' />
                                        <label className=" form-check-label" htmlFor="color-1">
                                            S(2)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className='form-check-input'
                                            type="checkbox" value='' id='color-2' />
                                        <label className=" form-check-label" htmlFor="color-2">
                                            M(2)
                                        </label>
                                    </div>
                                </div> */}

                            </div>
                         
                        </div>
                        <div className="mt-4 mb-3">
                                <h3 className="sub-title">
                                    Product tags
                                </h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                        {
                                            tags && [...new Set(tags).map((item, index) => {
                                                return (
                                                    <span onClick={()=>setTags(item)} className="text-capilize badge bg-light text-secondary rounded-3 py-2 px-3">
                                                        {item}
                                                    
                                                    </span>
                                                )
                                            })]
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className=" mb-3">
                                <h3 className="sub-title">
                                    Product Brand
                                </h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                        {
                                            brands && [...new Set(brands).map((item, index) => {
                                                return (
                                                    <span onClick={()=>setBrands(item)} className="text-capilize badge bg-light text-secondary rounded-3 py-2 px-3">
                                                        {item}
                                                    
                                                    </span>
                                                )
                                            })]
                                        }
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-4">
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className="mb-0 d-block " style={{ width: "100px" }}>Sort by</p>

                                    <select defaultValue={"manual"} name="" id="" className="form-control form-select" onChange={(e)=>setSort(e.target.value)}>
                                        <option value="manual">Featured</option>
                                        {/* <option value="best-selling">Best selling</option> */}
                                        <option value="title">Alphabettically, A-Z</option>
                                        <option value="-title">Alphabettically, z-a</option>
                                        <option value="price"> Price, low to high</option>
                                        <option value="-price"> Price, high to low</option>
                                        <option value="createdAt"> Date, old to new</option>
                                        <option value="-createdAt"> Date, new to old</option>
                                    </select>
                                </div>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className="totalProducts">21 Products</p>
                                    <div className="d-flex gap-10 align-items-center grid">

                                        <img onClick={() => { setGrid(4); }} src="images/gr4.svg" className='d-block img-fluid' alt='grip'></img>
                                        <img onClick={() => { setGrid(3); }} src="images/gr3.svg" className='d-block img-fluid' alt='grip'></img>
                                        <img onClick={() => { setGrid(2); }} src="images/gr2.svg" className='d-block img-fluid' alt='grip'></img>
                                        <img onClick={() => { setGrid(1); }} src="images/gr.svg" className='d-block img-fluid' alt='grip'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5">
                            <div className="d-flex gap-10 flex-wrap">
                                <ProductCard data={productState ? productState : []} grid={grid} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

<>
</>
export default OurStore