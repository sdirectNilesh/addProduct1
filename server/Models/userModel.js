const {DataTypes} = require("sequelize")
const sequelize = require("../Database/db")

const NilProduser_obj =  sequelize.define('NilProduser_obj', {
    // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
})

module.exports = NilProduser_obj;