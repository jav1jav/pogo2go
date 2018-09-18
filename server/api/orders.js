const router = require('express').Router()
const db = require('../db')
const {Product, User, Order} = require('../db/models')
const OrderList = db.model('OrderList')

// routes all start with /api/orders

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

// need to protect this route with determining if user is logged in,
// and make sure the order updated has isPurchased = false
router.post('/:orderId/:productId', async (req, res, next) => {
  const orderId = req.params.orderId
  const productId = req.params.productId
  try {
    await OrderList.create({orderId, productId})
    const updatedOrder = await Order.findById(orderId)
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})



module.exports = router
