const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express=require('express');
const asyncHandler=require("express-async-handler")
const dbConnect = require('./config/dbConnect');
const app=express();
const dotenv=require('dotenv').config();
const authRouter=require('./routes/authRoute');
dbConnect();
const PORT =process.env.PORT|| 4000     ;
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/api/user',authRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);

})