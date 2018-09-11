/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe.only('Product model', () => {
    describe('Validations', () => {
      it('requires name', async () => {
        const product = Product.build({
          price: 100.0,
          description: 'This is a test description.'
        })
        try {
          await product.validate()
          throw Error(
            'validation was successful but should have failed without `name`'
          )
        } catch (err) {
          expect(err.message).to.contain('name cannot be null')
        }
      })
      it('requires price', async () => {
        const product = Product.build({
          name: 'Cody',
          description: 'This is a test description.'
        })
        try {
          await product.validate()
          throw Error(
            'validation was successful but should have failed without `price`'
          )
        } catch (err) {
          expect(err.message).to.contain('price cannot be null')
        }
      })
      it('requires description', async () => {
        const product = Product.build({name: 'Cody', price: 100.0})
        try {
          await product.validate()
          throw Error(
            'validation was successful but should have failed without `description`'
          )
        } catch (err) {
          expect(err.message).to.contain('description cannot be null')
        }
      })
    })
  })
})
