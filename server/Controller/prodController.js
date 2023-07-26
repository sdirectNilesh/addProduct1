const Nilproduct_obj = require('../Models/prodModel');
const { Op } = require("sequelize");

exports.addProduct = async (req, res) => {
    try {
        console.log(req.body);

        const prdt = {
            product1: req.body.product1,
            productPrice: req.body.productPrice,
            category: req.body.category,
            userId: req.body.userId
        };
        let created_product = await Nilproduct_obj.create(prdt);
        res.status(201).json({ product: created_product });
    } catch (error) {
        console.log(error)
    }
}


exports.getProduct = async (req, res) => {
    try {
        console.log(req.body);

        const data = await Nilproduct_obj.findAll({ where: { userId: req.query.userId } });
        res.status(201).json({ product: data });
    } catch (error) {
        console.log(error)
    }
}


exports.getSearch = async (req, res) => {
    try {
        const { product1 } = req.query;
        console.log(req.query);

        const results = await Nilproduct_obj.findAll({
            where: {
                userId: {
                    [Op.like]: `%${req.query.userId}%`
                },
                product1: {
                    [Op.like]: `%${req.query.product1}%`
                }
            }
        })
        return res.json({ success: true, items: results })
    } catch (error) {

    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Nilproduct_obj.destroy({
            where: {
                id: productId
            }
        });
        // Respond with a success message
        res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'An error occurred while deleting the product.' });
    }
}

exports.updateProduct = async (req, res) => {
    console.log(req.body)
    try {
      
        const prdt = {
            product1: req.body.product1,
            productPrice: req.body.productPrice,
            category: req.body.category,
        };
       const response=await Nilproduct_obj.update(prdt,{
            where: {
                id: req.body.id
            }
        })
      
        res.json({response});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the product.' });
    }
}