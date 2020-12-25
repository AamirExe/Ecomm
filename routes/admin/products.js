const express = require('express');

const multer = require('multer');
const {handleError,requireAuth} = require('./middlware');



const productRepo = require('../../repository/products');
const productUpload = require('../../htmlTemplate/admin/productUpload');
const productEditTemplate = require('../../htmlTemplate/admin/productEdit');
const {requireTitle,requirePrice} = require('./validator');
const productTemplate = require('../../htmlTemplate/admin/index');
const productEdit = require('../../htmlTemplate/admin/productEdit');

const router = express.Router();
const upload = multer({Storage:multer.memoryStorage()})

router.get('/admin/products',[requireAuth],async (req,res)=>{
    const products = await productRepo.getAll();
    res.send(productTemplate({products}))
});

router.get('/admin/products/new',[requireAuth],(req,res)=>{
    res.send(productUpload({}))
});

router.post('/admin/products/new',[requireAuth],upload.single('image'),[requireTitle,requirePrice],handleError(productUpload),async (req,res)=>{
   
    const image = req.file.buffer.toString('base64');
    const {title,price}=req.body;
    await productRepo.create({title,price,image});
    res.redirect('/admin/products/');
})

router.get('/admin/products/:id/edit',requireAuth,async (req,res) => {
    const product = await productRepo.getOne(req.params.id);
    if(!product){
        return res.send("product not found");
    }

    res.send(productEditTemplate({product}));
})

router.post('/admin/products/:id/edit',requireAuth,upload.single('image'),
[requireTitle,requirePrice],
handleError(productEdit,async (req) => {
    const product = await productRepo.getOne(req.params.id)
    if(product){
        return {product};
    }
}),
async(req,res)=>{
    const changes = req.body;
    if(req.file){
        changes.file = req.file.buffer.toString('base64');
    }
    
    try{
        await productRepo.updateRecord(req.params.id,changes);
    }catch(e){
        return res.send("Couldnt Find the product");
    }
    res.redirect('/admin/products')

    })


router.post('/admin/products/:id/delete',requireAuth,async(req,res)=>{
    await productRepo.deleteOne(req.params.id)
    res.redirect('/admin/products/')

})
module.exports=router;