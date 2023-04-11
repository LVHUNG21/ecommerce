const express=require('express');
const {removeProductFromCart,userCart,createOrder,createUser,updatePassword,updateOrderStatus,applyCoupon, loginAdmin,loginUserCtrl,getallUser ,getaUser, deleteaUser, updatedaUser, unblockUser, blockUser ,handleRefreshToken, logout,forgotPasswordToken, resetPassword, getWishlist, saveAddress, getUserCart, emptyCart, getAllOrders, getlOrderByUserId, updateProductQuantityFromCart,  } = require('../controller/useCtrl');
const router=express.Router();
const {authMiddleware,isAdmin}= require("../middlewares/authMiddleware");

router.post('/register',createUser);
router.post('/login',loginUserCtrl);
router.post('/admin-login',loginAdmin);
router.post('/cart',authMiddleware,userCart);
router.get("/cart",authMiddleware,getUserCart);
// router.post('/edit-user',authMiddleware,updatedaUser)
// router.post('/cart/applycoupon',authMiddleware,applyCoupon);
router.post('/cart/cash-order',authMiddleware,createOrder);
router.get("/all-users",getallUser);
// router.get("/get-orders",authMiddleware,getOrders);
// router.get("/getallorders",authMiddleware,isAdmin,getAllOrders);
// router.post("/getorderbyuser/:id",authMiddleware,isAdmin,getlOrderByUserId);

router.post("/forgot-password-token",forgotPasswordToken);
router.put("/password",authMiddleware,updatePassword);
router.put("/reset-password/:token",resetPassword);

// router.put("/order/update-order/:id",authMiddleware,isAdmin,updateOrderStatus);
router.get("/:id",authMiddleware,isAdmin,getaUser);
// router.get("/wishlist",authMiddleware,getWishlist);

router.delete("/empty-cart",authMiddleware,emptyCart);
router.delete("/delete-product-cart/:cartItemId",authMiddleware,removeProductFromCart);
router.put("/updata-product-cart/:cartItemId/:newQuantity",authMiddleware,updateProductQuantityFromCart);
router.delete("/:id",deleteaUser);
router.get("/logout",logout);

router.put("/edit-user",authMiddleware,updatedaUser);
// router.put("/edit-user",authMiddleware,updatedaUser);
router.put("/save-address/:id",authMiddleware,isAdmin,saveAddress);
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser);
router.put("/refresh",handleRefreshToken);
module.exports=router;