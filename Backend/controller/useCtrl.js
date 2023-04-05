const { generateToken } = require('../config/jwtToken');

const { generateRefreshToken } = require('../config/refreshToken');
const uniqid=require('uniqid');
const User = require('../models/userModel')
const Cart= require('../models/cartModel')
const Product=require('../models/ProductModel')
const Order=require('../models/orderModel');
const asyncHandler=require("express-async-handler");
const Coupon=require("../models/couponModel"); 
const crypto=require("crypto");
const validateMongodbId=require('../untils/validateMongodbId')
const jwt=require("jsonwebtoken");

const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = User.create(req.body);
        res.json(newUser);

    } else {
        throw new Error("user already exits");
    }
};
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken= await generateRefreshToken(findUser?._id);

        const updateuser=await User.findByIdAndUpdate(findUser.id,
            {
                refreshToken:refreshToken
            },
        );
        res.cookie('refreshToken',refreshToken,
         {httpOnly:true,
         maxAge:72*60*60*1000, 
         }
        )
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),

        });
    } else {
        throw new Error("Invalid Credentials");
    }
});
// adminlogin
const loginAdmin= asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if(findAdmin?.role!== 'admin') {throw Error("You khong phai la Admin ")};
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken= await generateRefreshToken(findAdmin?._id);

        const updateuser=await User.findByIdAndUpdate(findAdmin.id,
            {
                refreshToken:refreshToken
            },
        );
        res.cookie('refreshToken',refreshToken,
         {httpOnly:true,
         maxAge:72*60*60*1000, 
         }
        )
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),

        });
    } else {
        console.log('error login backend');
        throw new Error("Invalid Credentials");
    }
});


const handleRefreshToken=asyncHandler(async(req,res)=>{
    const cookie=req.cookies;
    console.log(cookie);
    if(!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken=cookie.refreshToken;
    const user= await User.findOne({
        refreshToken
    });
    if(!user) throw new Error("No Refresh token present in db or  not matched");
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded =>{
        if(err || user.id !== decoded.id){
            throw new Error("there is something wrong with refresh token ")
        }
        const accessToken=generateToken(user?._id);
        res.json({accessToken});
        
    }))

})
//logout functionality
const logout=asyncHandler(async(req,res)=>{
    const cookie=req.cookies;
    if(!cookie.refreshToken) throw new Error ("No Refresh Token in Cookies");
    const refreshToken=cookie.refreshToken;
    const user=await User.findOne({refreshToken});
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true,
        });
        return res.status(204);

    }
    await User.findOneAndUpdate(refreshToken,{
        refreshToken:"",
    });
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true,
    });
    return res.status(204);
})

// get a user
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        console.log('getall user error backedn')
        throw new Error(error);
    }
}

);
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    validateMongodbId(id);
    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        })
    } catch (error) {
        throw new Error(error);
    }
});

const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    validateMongodbId(id);
    try {
        const getaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        })
    } catch (error) {
        throw new Error(error);
    }
});
//Update a user
const updatedaUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
     console.log(req.user);
    validateMongodbId(_id);
    console.log(_id);
    // try {
    //     const updatedaUser = await User.findByIdAndUpdate(_id, {
    //         firstname: req?.body?.firstname,
    //         lastname: req?.body?.lastname,
    //         email: req?.body?.email,
    //         mobile: req?.body?.mobile,
    //     });
    //     res.json({
    //         updatedaUser,
    //     })
    // } catch (error) {
    //     throw new Error(error);
    // }
});
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            { isBlocked: true, }
            , { new: true }
        );
        res.json({
            message:"User Blocked",
        })
    } catch (error) {
        throw new Error(error);

    }
});
const unblockUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    validateMongodbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            { isBlocked: true, }
            , { new: true }
        );
        res.json({
            message:"user unblocked"
        })
    } catch (error) {
        throw new Error(error);

    }
});
const updatePassword=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    const {password}=req.body;
    validateMongodbId(_id);
    const user=await User.findById(_id);
    if(password){
        user.password=password;
        const updatePassword=await  user.save();
        res.json(updatePassword);

    }else{
        res.json(user);
    }
})
const forgotPasswordToken=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user) throw new Error("User not found with this email");
    try{
        const token=await user.createPasswordResetToken();
        await user.save();

        const resetURL=`hi,PLEASE FOLLOW THIS LINK TO RESET PASSWORD,<a href='http://localhost:5000/api/user/reset-password/${token}'>Clich Hia`
         
        const data={
            to:email,
            text:"Hey user",
            subject:"Forgot Password Link",
            him:resetURl,
        }
        sendEmail(data);
        res.json(token);
    }catch(error){
        throw new  Error(error);

    }
});
const resetPassword=asyncHandler(async(req,res)=>{
    const {password} =req.body;
    const {token}=req.params;
    const hashedToken=crypto.createHash('sha256').update(token).digest('hex');
    const user=await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpires:{$gt:Date.now()},
    })
})
const getWishlist=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    try{
        const findUser=await User.findById(_id).populate("wishlist");
        res.json(findUser);
    }catch(error){
        throw new Error(error);

    }
})
//save address
const saveAddress=asyncHandler(async(req,res,next)=>{
    const {_id}=req.user;
    console.log(_id);
    validateMongodbId(_id);
    try {
        const updatedaUser = await User.findByIdAndUpdate(_id, {
            address: req?.body?.address,
        });
        res.json({
            updatedaUser,
        })
    } catch (error) {
        throw new Error(error);
    }
})

const userCart=asyncHandler(async(req,res,next)=>{ 
    const {productId,color,quantity,price}=req.body;
    const {_id}=req.user;
    console.log(_id);
validateMongodbId(_id);
 try{
    let newCart=await new Cart({
        userId:_id,productId,
        color,price,quantity
    }).save();
    res.json(newCart);
    console.log(products);
 }catch(error){
    console.log('error cart backedn');
    throw new Error(error);
 }
});
const getUserCart=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongodbId(_id);
    try{
        const cart=await Cart.find({userId:_id}).populate("productID").populate("color");
        res.json(cart);
    }catch(error){
        throw new Error(error);
    }
})
const removeProductFromCart =asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    const {cartItemId} =req.params;
    validateMongodbId(_id);
    try{
        const deleteProductFromCart=await Cart.deleteOne({userId:_id,_id:cartItemId})
        res.json(deleteProductFromCart);
    }catch(error){
        throw new Error(error);
    }


})
const updateProductQuantityFromCart=asyncHandler(
    async(req,res)=>{
        const {_id}=req.user;
        const {cartItemId,newQuantity} =req.params;
        validateMongodbId(_id);
        try{
            const cartItem=await Cart.findOne({userId:_id,_id:cartItemId})
            cartItem.quantity=newQuantity,
            cartItem.save();
            res.json(cartItem);
        }catch(error){
            throw new Error(error);
        }
    }
)
const emptyCart=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongodbId(_id);
    try{
    const user=await User.findOne({_id}) ;
    const cart=await Cart.findOneAndRemove({orderby:user._id});
    res.json(cart);
    }catch(error){
        throw new Error(error);
    }
})
const applyCoupon=asyncHandler(async(req,res)=>{
    const{coupon}=req.body;
    const validCoupon=await Coupon.findOne({name:coupon});
    if(validCoupon===null){
        throw new Error("Invalid Coupon");

    };
    const user= await User.findOne({_id});
    let {products,cartTotal}=await Cart.findOne({
        orderby:user._id,
    }).populate("products.product");
    let totalAfterDiscount=(
        cartTotal-(cartTotal*vaildCoupon.discount)/100).toFixed(2);
    await Cart.findOneAndUpdate(
        {orderby:user._id},
        {totalAfterDiscount},
        {new:true},
    );
    
        res.json(totalAfterDiscount);
});
const createOrder=asyncHandler(async(req,res)=>{
    const {COD,couponApplied}=req.body;
    const{_id}=req.user;
    validateMongodbId(_id);
    try{
        if(!COD) throw new Error("Create cash order failed");
        const user=await User.findById(_id);
        let userCart=   await Cart.findOne({orderby:user._id});
        let finalAmout=0;
        if(couponApplied && userCart.totalAfterDiscount){
            finalAmout=userCart.totalAfterDiscount;

        }else{
            finalAmout=userCart.cartTotal;

        }
        let newOrder=await new Order({
            products:userCart.products,
            paymentIntent:{
                id:uniqid(),
                method:"COD",
                amount:finalAmout,
                status:"Cash on Delivery",
                created:Date.now(),
                currency:"USD",

            },
            orderby:user._id,
            orderStatus:"Cash On Delivery"
        }).save();
        let update=userCart.products.map((item)=>{
            return{
                updateOne:{
                    filter:{_id:item.product._id},
                    update:{$inc:{quantity:-item.count,sold:+item.count}},

                }
            }
        })
        const updated=await Product.bulkWrite(update,{});
        res.json({message:'success'})

    }catch(error){
        throw new Error(error);
    }
})
const getOrders=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongodbId(_id);
    try{
    const userorders= await Order.findOne({orderby:_id}).populate("products.product").populate('orderby').exec();
        res.json(userorders);
    }catch(error){
        throw new Error(error);

    }
})
const getAllOrders=asyncHandler(async(req,res)=>{
    try{
    const userorders= await Order.find().populate("products.product").populate('orderby').exec();
        res.json(userorders);

    }catch(error){
        throw new Error(error);

    }
})
const getlOrderByUserId=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
    const userorders= await Order.findOne({orderby:id}).populate("products.product").populate('orderby').exec();
        res.json(userorders);
    }catch(error){
        throw new Error(error);

    }
})
const updateOrderStatus=asyncHandler(async(req,res)=>{
    const {status}=req.body;
    const {id}=req.params;
    validateMongodbId(id);
    try{
    const updateOrderStatus=await Order.findByIdAndUpdate(
        id,
        {
            orderStatus:status,
            paymentIntent:{
                status:status,
            }
        },
        {new:true}
    );
    res.json(updateOrderStatus);

    }catch(error){
        throw new Error(error);
    }
})
module.exports = {removeProductFromCart,updateProductQuantityFromCart,createOrder,getlOrderByUserId,applyCoupon,emptyCart,getAllOrders, createUser,getWishlist, userCart,loginAdmin,saveAddress,loginUserCtrl, getallUser, getaUser, deleteaUser, updatedaUser, blockUser,forgotPasswordToken, unblockUser,handleRefreshToken,logout,updatePassword,forgotPasswordToken,resetPassword,getUserCart,getOrders,updateOrderStatus};