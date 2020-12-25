const express = require('express');
const cartRepo = require('../repository/carts');
const productRepo = require('../repository/products')
const showCartTemplate = require('../htmlTemplate/carts');

const router = express.Router();


router.post('/cart/products',async (req,res) => {
    let cart;
    if(!req.session.cartId){
        
        cart = await cartRepo.create({items:[]});
        req.session.cartId = cart.id;
    }else{
        cart = await cartRepo.getOne(req.session.cartId);
    }

    const existingItem = cart.items.find(item => item.id === req.body.productId)
    if(existingItem){
        console.log('item Exists')
        existingItem.quantity++;
    }
    else{
        cart.items.push({id:req.body.productId,quantity:1});
    }
    await cartRepo.updateRecord(req.session.cartId,{items:cart.items})
    res.redirect('/cart')
})

router.get('/cart', async (req,res)=> {
    if(!req.session.cartId){
        return res.redirect('/');
    }

    const cart = await cartRepo.getOne(req.session.cartId);
    
    for(let item of cart.items){
         const product = await productRepo.getOne(item.id);

        item.product = product;
    }
    

    return res.send(showCartTemplate({items:cart.items}))

})


router.post('/cart/delete',async(req,res)=>{
    const {itemId} = req.body;
    const cart = await cartRepo.getOne(req.session.cartId);
    console.log(cart.items)
    const newItems = cart.items.filter(item => item.id !== itemId)
    await cartRepo.updateRecord(req.session.cartId,{items:newItems});
    return res.redirect('/cart')

})
module.exports = router;

