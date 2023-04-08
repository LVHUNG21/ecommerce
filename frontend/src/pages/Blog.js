import { React, useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import Container from '../components/Container';
import  moment  from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
const Blog = () => {
    const blogState = useSelector((state) => state?.blog?.blog);
    const dispatch = useDispatch();
    useEffect(() => {
        getBlogs();
    }, [])
    const getBlogs = () => {
        dispatch(getAllBlogs());

    }
    return (
        <>
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3"><div className="filter-card mb-3">
                        <h3 className="filter-title">
                            Shop By Categories
                        </h3>
                        <di>
                            <ul className="ps-0">
                                <li>Watch</li>
                                <li>TV</li>
                                <li>Camera</li>
                                <li>Laptop</li>
                            </ul>
                        </di>
                    </div></div>
                    <div className="col-9">
                        <div className="row">
                            {blogState &&
                                blogState.map((item, index) => {
                                    return (
                                        <div className="col-6 mb-3" key={index}>
                                            <BlogCard
                                                id={item?._id}
                                                title={item?.title}
                                                description={item?.description}
                                                image={item?.image}
                                                date={moment(item?.createdAt).format("MMMM Do YYYY,h:mm:ss a")}
                                            />
                                            </div>


                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )

}

export default Blog
