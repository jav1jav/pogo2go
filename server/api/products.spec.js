const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(async () => {
      // OB/JD: consider removing some of these example data (as little as possible)
      await Promise.all([
        Product.create({
          name: 'The Commuter',
          price: 199.99,
          description: 'Taiyaki portland enamel pin trust fund',
          image:
            'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
        }),
        Product.create({
          name: 'The Fixed Stick',
          price: 149.99,
          description:
            'Jianbing jean shorts direct trade, poke butcher ethical cliche helvetica dreamcatcher.',
          image:
            'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
        }),
        Product.create({
          name: 'The Urban Stick',
          price: 299.99,
          description:
            'Vexillologist occupy bicycle rights cray humblebrag DIY, plaid poutine dreamcatcher typewriter jianbing.',
          image:
            'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
        }),
        Product.create({
          name: 'The Offroader',
          price: 399.99,
          description: 'Hella polaroid vegan tumblr.',
          image:
            'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
        }),
        Product.create({
          name: 'The Deluxe Stick',
          price: 9999.0,
          description:
            'Sartorial locavore subway tile celiac tumblr health goth tousled 8-bit cliche asymmetrical narwhal kitsch squid.',
          image:
            'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
        })
      ])
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      // OB/JD: order *might* not always be reliable, if so you could use chai-things plugin, e.g. `expect(res.body).to.contain.a.thing.with.property('name', 'The Commuter');`
      expect(res.body[0].name).to.be.equal('The Commuter')
    })

    it('GET /api/products/2', async () => {
      const res = await request(app)
        .get('/api/products/2') // OB/JD: beware the id might not correspond properly due to a race condition in your `beforeEach`
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('The Fixed Stick')
    })
  }) // end describe('/api/products')
}) // end describe('Products routes')
