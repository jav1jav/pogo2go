import React from 'react'
import {Provider} from 'react-redux'
import {StripeProvider} from 'react-stripe-elements';
import store from './store'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <Provider store={store}>
      <StripeProvider apiKey="pk_test_12345">
        <div>
          <Navbar />
          <Routes />
        </div>
      </StripeProvider>
    </Provider>
  )
}

export default App
