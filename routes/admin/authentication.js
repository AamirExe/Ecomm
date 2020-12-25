const express = require('express');
const userResp = require('../../repository/users');

const {handleError} = require('./middlware');
const signupTemplate = require('../../htmlTemplate/admin/signup');
const signinTemplate = require('../../htmlTemplate/admin/signin');
const {check,validationResult} = require('express-validator');
const {validateEmail,validatePassword,validateCnfirmPass, valSignInEmail,valPwdSignin} = require('./validator');
const signin = require('../../htmlTemplate/admin/signin');
const router = express.Router();

router.get("/signup",(req,res) => {
    res.send(signupTemplate({}))
});

router.post('/signup',[validateEmail,validatePassword,validateCnfirmPass],handleError(signupTemplate),
async (req,res) => {
    const {email,pwd,cnfPwd} = req.body;
    
    const userInfo = await userResp.create({email,password : pwd});
    req.session.userId = userInfo.id;
    res.redirect('/admin/products');
    

    

});

router.get('/signin',(req,res) => {
   res.send(signinTemplate({}))
});

router.post('/signin',[valSignInEmail,valPwdSignin],handleError(signinTemplate),
    async(req,res)=>{
        const {email,password} = req.body;
        const user = await userResp.getOneBy({email});
        req.session.userId = user.id;
        
        res.redirect('/admin/products')
               
        }

);

router.get('/signout',(req,res)=>{
    req.session = null;
    res.send('You are signed Out '+req.session)
})

module.exports = router;