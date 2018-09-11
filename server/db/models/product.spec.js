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
          description: 'This is a test description.',
          image:
            'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
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
          description: 'This is a test description.',
          image:
            'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
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
        const product = Product.build({
          name: 'Cody',
          price: 100.0,
          image:
            'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
        })
        try {
          await product.validate()
          throw Error(
            'validation was successful but should have failed without `description`'
          )
        } catch (err) {
          expect(err.message).to.contain('description cannot be null')
        }
      })
      it('requires image', async () => {
        const product = Product.build({
          name: 'Cody',
          price: 100.0,
          description: 'This is a test description.'
        })
        try {
          await product.validate()
          throw Error(
            'validation was successful but should have failed without `image`'
          )
        } catch (err) {
          expect(err.message).to.contain('image cannot be null')
        }
      })
    })
  })
})
