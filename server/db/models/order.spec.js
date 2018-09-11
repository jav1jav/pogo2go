/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let cart

  beforeEach(async () => {
    cart = await Order.create({
      products: [1, 2, 3],
      userId: 1
    })
  })

  it('creates a cart entry in the db with an array of product ids', () => {
    expect(cart.products[0]).to.be.equal(1)
    expect(cart.products[1]).to.be.equal(2)
  })

  it('creates a cart entry in the db with a default value of false for isPurchased', () => {
    expect(cart.isPurchased).to.be.equal(false)
  })
}) // end describe('Order model')
