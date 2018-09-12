/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')

describe('Order model', () => {
  // beforeEach(async () => {

  // })

  let cart

  beforeEach(async () => {
    // db.sync({force: true})
    // await User.create({
    //   name: 'Cody McCodester',
    //   email: 'cody@puppybook.com',
    //   password: 'bones'
    // })
    cart = await Order.create({
      userId: 1
    })
  })

  it('creates a cart entry in the db with a default value of false for isPurchased', () => {
    expect(cart.isPurchased).to.be.equal(false)
  })
}) // end describe('Order model')
