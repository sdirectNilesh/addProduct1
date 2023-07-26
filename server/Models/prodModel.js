const { Sequelize } = require("sequelize")
const sequelize = require("../Database/db")

const Nilproduct_obj = sequelize.define('Nilproduct_obj', {
    // Model attributes are defined here
    userId: {
        type: Sequelize.STRING,
    },
    product1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productPrice: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        defaultValue: "Electronics",
        allowNull:true
    }
})



module.exports = Nilproduct_obj;