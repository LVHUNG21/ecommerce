const Product = require("../models/ProductModel");
const slugify = require("slugify");
const asyncHandler=require("express-async-handler");
const validateMongoDbId=require("../untils/validateMongodbId")
const {cloudinaryDeleteImg,cloudinaryUploadImg}=require('../untils/cloundinary')
const fs=require('fs');
const createProduct = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
    console.log(req.body)
});

//update aproduct
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
            new: true,
        });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);

    }
})
//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        const deleteProduct = await Product.findOneAndDelete(id);
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);

    }
})


// get a product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id).populate('color');
        console.log(findProduct)
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
})
// get all product
const getallProduct = asyncHandler(async (req, res) => {
    try {
        const queryObj = { ...req.query };
        // Filering 
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        console.log(queryObj);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt")
        }
        //limiting the filters
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);

        } else {
            query = query.select("-__v")
        }
        //pagination

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("this Page does not  exits");
        }
        console.log(page, limit, skip);
        const product = await query;
        res.json(product);
        // const getallProduct=await Product.where("category").equals(req.query.category );
        // res.json(getallProduct);
    } catch (error) {
        console.log('error backend pctrl')
        throw new Error(error);
    }
});
const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
        if (alreadyadded) {
            let user = await User.findByIdAndUpdate(_id, {
                $pull: { wishlist: prodId },
            },
                { new: true, })
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(_id, {
                $push: { wishlist: prodId },
            },
                { new: true, })
            res.json(user);

        }
    } catch (error) { throw new Error(error) }
});
const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const { start, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString()
        );
        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: { "ratings.$.star": star, "ratings.$.comment": comment },
                }, {
                new: true,
            }
            );
            res.json(updateRating);

        } else {
            const rateProduct = await Product.findByIdAndUpdate(prodId, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: _id
                    }
                },
            },
                { new: true, }
            );
            res.json(rateProduct);
        }
        const getallratings = await Product.findById(prodId);
        let totalRating = getallratings.ratings.length;
        let ratingsum = getallratings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await Product.findByIdAndUpdate(prodId, {
            totalrating: actualRating,
        },
            {
                new: true,
            });
        res.json(finalproduct);
    } catch (error) {
        throw new Error(error)
    }


})
const uploadImages=asyncHandler(async(req,res)=>{
    // const {id}=req.params;
    // validateMongoDbId(id);
    try{
        const uploader=(path)=> cloundinaryUploadImg(path,"images");
        const urls=[];
        const files=req.files;
        for(const file of file){
            const {path}=file;
            const newpath=await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const images=urls.map((file)=>{
            return file;
        })
        res.json(images);
    }catch(error){
            throw new Error(error)
    }
})
const deleteImages=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    // validateMongoDbId(id);
    try{
        const deleted= cloundinaryDeleteImg(id,"images");
      res.json({message:"Deleted"});
    }catch(error){
            throw new Error(error)
    }
})
module.exports = { rating, createProduct, getaProduct, getallProduct, updateProduct, deleteProduct, addToWishlist,uploadImages,deleteImages};
