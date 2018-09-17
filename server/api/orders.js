const router = require('express').Router()
const db = require('../db')
const {Product, User, Order} = require('../db/models')
const OrderList = db.model('OrderList')

// routes all start with /api/orders

// OB: possible security issue in terms of user privacy
/*
before doing any DB querying, check if the logged in user exists AND that they are the "owner" of this order; if not, send back a 401 / 403 status
*/
router.get('/:id', async (req, res, next) => {
  const orderId = req.params.id
  try {
    const anOrder = await Order.findById(orderId, {
      include: [Product]
    })
    const total = anOrder.products
      .map(el => Number(el.price))
      .reduce(function(accumulator, currentValue) {
        return accumulator + currentValue
      }, 0)

    res.json({anOrder, total})
  } catch (error) {
    next(error)
  }
})

// OB: probably should be for admins only (when that role exists)
router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
