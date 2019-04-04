import React from 'react'
import {Provider} from 'react-redux'
import {StripeProvider} from 'react-stripe-elements';
import store from './store'
import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <Provider store={store}>
      <StripeProvider apiKey="pk_test_Eryop2hm2EDMCXBVoPDaeKLI">
        <div className="wrapper">
          <Navbar />
          <Routes />
          <Footer />
        </div>
      </StripeProvider>
    </Provider>
  )
}

export default App
