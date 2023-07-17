const express = require("express");
const {isAdmin,authMiddleware}=require("../middlewares/authMiddleware");
const { createorder, captureorder, cancelorder } = require("../controller/paymentCtrl");
const router=express.Router();

router.get('/create-order',createorder)
router.get('/capture-order',captureorder)
router.get('/cancel-order',cancelorder)

module.exports=router;