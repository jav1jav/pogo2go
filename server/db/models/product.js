const Sequelize = require('sequelize')
const db = require('../db')

// OB/JD: consider (not urgent) additional validations and defaults
const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    // OB/JD: best practice for financial data is to use INTEGERs and measure in cents, then convert to decimal on the frontend
    type: Sequelize.DECIMAL(7, 2),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product
