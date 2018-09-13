const User = require('./user')

const Product = require('./product')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Order.belongsTo(User)
User.hasMany(Order)
// OB/JD: consider name change for OrderList, which could be understood as "each row in this table is itself a list representing an order", but really it is "each row in this table represents an entry in a full order list"
Product.belongsToMany(Order, {through: 'OrderList'})

// OB/JD: bury undead code, commented out code should never be in master, instead put that commented code into an issue somewhere
//Order.hasMany(Product)

module.exports = {
  User,
  Product,
  Order
}
