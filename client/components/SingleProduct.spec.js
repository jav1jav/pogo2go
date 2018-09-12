/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let fakePage

  beforeEach(() => {
    fakePage = shallow(<SingleProduct />)
  })

  xit('renders the price in an span', () => {
    expect(fakePage.find('h3').text()).to.be.equal('$199.99')
  })
})
