const router = require('express').Router()
<<<<<<< HEAD
=======
const db = require('../db')
>>>>>>> master
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
<<<<<<< HEAD
=======

>>>>>>> master
    res.json({user: userData, orders: orderData})
  } catch (error) {
    next(error)
  }
})
