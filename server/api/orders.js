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

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    const deletedItem = await OrderList.destroy({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    res.json(deletedItem).status(200);
  } catch (error) {
    next(error);
  }
})

module.exports = router


// order number:
// productId:

// const orderData = await Order.findOne({
//   where: {
//     userId: id,
//     isPurchased: false,
//   },
//   include: [Product]
// })
