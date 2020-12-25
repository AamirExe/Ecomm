const express = require('express');

const router = express.Router();

const productRepo = require('../repository/products');
const homePageTemp = require('../htmlTemplate/products');


router.get('/',async (req,res) => {
    const products = await productRepo.getAll();
    console.log(products.length)
    res.send(homePageTemp({products}))
})







module.exports=router;