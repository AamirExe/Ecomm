const express = require('express')

const router = express.Router();

router.get('/testApi', (req,res,next)=>{
    res.send('<h1>Api working</h1>')
})

module.exports = router;