const router = require('express').Router()
const db = require('../db')
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const {id} = req.params
  try {
    const userData = await User.findById(id)
    const orderData = await Order.findAll({
      where: {userId: id},
      include: [Product]
    })

    // console.log(orderDetails);
    // const productDetails = await Product.findAll({
    //   where: {id: 1 || 2}
    // })

    res.json({user: userData, orders: orderData})
  } catch (error) {
    next(error)
  }
})

// [options.include[].through.where]

// name
