const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
  products: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

})

module.exports = Order
