'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')
const OrderList = db.model('OrderList')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Cody',
      email: 'cody@email.com',
      password: '123',
      imageUrl: 'http://www.fillmurray.com/275/275'
    }),

    User.create({
      name: 'Murphy',
      email: 'murphy@email.com',
      password: '123',
      imageUrl: 'http://www.fillmurray.com/250/250'
    }),

    User.create({
      name: 'Bill Murray',
      email: 'bill@email.com',
      password: '123',
      imageUrl: 'http://www.fillmurray.com/300/300'
    }),

    User.create({
      name: 'Nick Cage',
      email: 'bees@email.com',
      password: '123',
      imageUrl: 'http://www.placecage.com/300/300'
    })
  ])

  const products = async () => {
    const product1 = await Product.create({
      name: 'The Commuter',
      price: 199.99,
      description:
        'Taiyaki portland enamel pin trust fund, cardigan cred whatever vice chicharrones roof party kale chips pabst venmo. Wayfarers air plant wolf everyday carry shaman whatever raclette distillery umami blog ennui thundercats direct trade. Gochujang selfies heirloom thundercats everyday carry occupy, cray freegan organic sartorial yuccie. Flannel polaroid vape, XOXO photo booth pork belly migas woke enamel pin portland cold-pressed truffaut farm-to-table pug.',
      image:
        'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
    })
    const product2 = await Product.create({
      name: 'The Fixed Stick',
      price: 149.99,
      description:
        'Jianbing jean shorts direct trade, poke butcher ethical cliche helvetica dreamcatcher. Succulents shabby chic schlitz truffaut raw denim, cardigan swag jianbing fashion axe poutine lomo ethical mlkshk chia plaid. Portland blog godard af, blue bottle tbh actually literally pop-up edison bulb poke biodiesel.',
      image:
        'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
    })
    const product3 = await Product.create({
      name: 'The Urban Stick',
      price: 299.99,
      description:
        'Vexillologist occupy bicycle rights cray humblebrag DIY, plaid poutine dreamcatcher typewriter jianbing. Palo santo meditation blog tilde bicycle rights kale chips whatever bushwick cold-pressed authentic echo park enamel pin tattooed hot chicken synth. Migas unicorn cold-pressed, raclette tumeric tousled roof party heirloom church-key fanny pack paleo deep v. Cliche pinterest tote bag, flannel kinfolk succulents heirloom blog dreamcatcher cray man bun.',
      image:
        'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
    })
    const product4 = await Product.create({
      name: 'The Offroader',
      price: 399.99,
      description:
        'Hella polaroid vegan tumblr. Distillery banjo health goth tacos chambray waistcoat vexillologist trust fund kombucha cold-pressed. Ethical messenger bag tbh yr intelligentsia lyft activated charcoal truffaut jean shorts poke plaid mumblecore neutra coloring book.',
      image:
        'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
    })
    const product5 = await Product.create({
      name: 'The Deluxe Stick',
      price: 9999.0,
      description:
        'Sartorial locavore subway tile celiac tumblr health goth tousled 8-bit cliche asymmetrical narwhal kitsch squid. Deep v selfies neutra offal, truffaut pitchfork pour-over craft beer banjo meditation vegan umami actually vexillologist twee. Farm-to-table enamel pin microdosing, adaptogen hashtag kitsch heirloom franzen gochujang chicharrones tumblr brunch poutine offal chartreuse.',
      image:
        'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
    })
    return [product1, product2, product3, product4, product5]
  }

  const productsSeed = await products()

  const orders = await Promise.all([
    Order.create({userId: 1, isPurchased: true}),
    Order.create({userId: 1, isPurchased: true}),
    Order.create({userId: 1, isPurchased: false}),
    Order.create({userId: 2, isPurchased: true}),
    Order.create({userId: 3, isPurchased: true}),
    Order.create({userId: 3, isPurchased: true}),
    Order.create({userId: 3, isPurchased: false})
  ])

  const orderLists = await Promise.all([
    OrderList.create({orderId: 1, productId: 1}),
    OrderList.create({orderId: 1, productId: 4}),
    OrderList.create({orderId: 2, productId: 1}),
    OrderList.create({orderId: 2, productId: 2}),
    OrderList.create({orderId: 2, productId: 3}),
    OrderList.create({orderId: 3, productId: 3}),
    OrderList.create({orderId: 3, productId: 1}),
    OrderList.create({orderId: 4, productId: 3}),
    OrderList.create({orderId: 4, productId: 1}),
    OrderList.create({orderId: 4, productId: 5}),
    OrderList.create({orderId: 5, productId: 3}),
    OrderList.create({orderId: 5, productId: 1}),
    OrderList.create({orderId: 5, productId: 2}),
    OrderList.create({orderId: 5, productId: 4}),
    OrderList.create({orderId: 6, productId: 1}),
    OrderList.create({orderId: 6, productId: 2}),
    OrderList.create({orderId: 7, productId: 4})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${productsSeed.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderLists.length} orderLists`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
