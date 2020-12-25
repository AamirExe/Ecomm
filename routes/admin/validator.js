const userResp = require('../../repository/users');
const {check} = require('express-validator');




module.exports = {
    requireTitle: check('title')
    .trim()
    .isLength({min:4,max:40})
    .withMessage("Must be between 4 and 40 characters"),
    requirePrice: check('price')
    .trim()
    .toFloat()
    .isInt({min:1})
    .withMessage('Price must be 1 or greater'),
    validateEmail : check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid Email')
    .custom(async email => {
        const existingUser = await userResp.getOneBy({email});
        
        if(existingUser)
           throw new Error('Email in use');
        

    }),
    validatePassword : check('pwd')
    .trim()
    .isLength({min:4,max:20})
    .withMessage("Password must be between 4 and 20 character"),

    validateCnfirmPass: check('cnfPwd')
    .trim()
    .isLength({min:4,max:20})
    .withMessage('Password must be between 4 and 20 character')
    .custom((cnfPwd,{req}) => {
        if(cnfPwd !== req.body.pwd)
            throw new Error("Password must match")
        else
            return true;
        
    }) ,

    valSignInEmail:check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a Valid Email")
    .custom(async(email)=> {
        const user = await userResp.getOneBy({email});

        if(!user)
            throw new Error("Please Sign Up First")
        else
            return true;
    }),
    valPwdSignin:check('password')
    .trim()
    .custom(async (password,{req})=>{
        const user = await userResp.getOneBy({email:req.body.email});
        if(!user)
            throw new Error('invalid password')
        console.log(user)
        if(user.password !== password)
            throw new Error("Invalid Password")

    }
    )

    
 
}