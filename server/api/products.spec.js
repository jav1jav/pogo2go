const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product');

describe.only('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {

    beforeEach(() => {
      return Product.create({
        name: 'The Commuter',
        price: 199.99,
        description: 'Test description',
        image: 'http://www.fillmurray.com/200/200'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('The Commuter')
    })
  }) // end describe('/api/products')
}) // end describe('Products routes')
