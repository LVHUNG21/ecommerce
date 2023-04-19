const cookieParser = require('cookie-parser');
const express=require('express');
const bodyParser = require('body-parser');
const asyncHandler=require("express-async-handler")
const dbConnect = require('./config/dbConnect');
const ProductModel = require('./models/ProductModel');
const app=express();
const session = require('express-session')
const {errorHandler,notFound}=require('./middlewares/errorHandler')
const dotenv=require('dotenv').config();
const authRouter=require('./routes/authRoute');
const paypal = require('paypal-rest-sdk');
const colorRouter=require('./routes/colorRoute');
const uploadRoute=require('./routes/uploadRoute');  
const enqRouter=require('./routes/enqRoute');
const blogRouter=require('./routes/blogRoute');
const productRouter=require('./routes/productRoute');
const categoryRouter=require('./routes/categoryRoute');
const blogcatRouter=require('./routes/blogcatRoute');
const brandRouter=require('./routes/brandRoute');
const couponRouter=require('./routes/couponRoute');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfT_REkfUa62lduFkJPzowdDrxIv3YhZ2Xg6rlT--TDnB5VR7j_fuu_VKvk6FyeADUWNp5ghg2QmA8bn',
    'client_secret': 'AfT_REkfUa62lduFkJPzowdDrxIv3YhZ2Xg6rlT--TDnB5VR7j_fuu_VKvk6FyeADUWNp5ghg2QmA8bn'
  });
// const config=require('./con')
const cors=require('cors')
const morgan=require("morgan");
const PORT =process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
dbConnect();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());
app.use(morgan());

// app.use(session({ secret: 'anything' }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(bodyParser.json());

app.use(cors());
app.use('/api/user',authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter);
app.use('/api/category',categoryRouter);
app.use('/api/blogCategory',blogcatRouter);
app.use('/api/brand',brandRouter);
app.use('/api/color',colorRouter);
app.use('/api/enq',enqRouter);
app.use('/api/coupon',couponRouter);
app.use('/api/upload',uploadRoute);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);

})