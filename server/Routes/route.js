const express = require('express');
const router = express.Router();
const { signup, signin } = require('../Controller/userController');
const { addProduct, getProduct, getSearch, deleteProduct, updateProduct } = require('../Controller/prodController');
const { userValidation } = require('../Middleware/user.validate');
const { forgotPassword, updatePassword } = require('../Controller/passwordController');



router.post('/sign-up', userValidation, signup);
router.post('/sign-in', signin);
router.post('/forgot-password', forgotPassword);
router.post('/update-password', updatePassword);

router.post('/add-product', addProduct);
router.get('/get-product', getProduct);
router.get('/search-product', getSearch);
router.delete('/delete-product/:id', deleteProduct);
router.post('/update-product', updateProduct);

module.exports = router;