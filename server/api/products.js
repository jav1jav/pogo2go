const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  const productId = req.params.id
  try {
    const aProduct = await Product.findById(productId)
    res.json(aProduct)
  } catch (error) {
    next(error)
  }
})

// routes all start with /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

module.exports = router
