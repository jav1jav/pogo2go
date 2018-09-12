import React from 'react'
import {Provider} from 'react-redux'
import store from './store'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Routes />
      </div>
    </Provider>
  )
}

export default App
