const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'))

router.get('/', (req,res) =>{
    //#swagger.tags=['hello world']
    res.send("hello world")
});

// ✅ Mount the users router properly
router.use('/users', require('./users'));
router.use('/cars', require('./cars'));

module.exports = router;