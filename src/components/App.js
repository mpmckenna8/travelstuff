import React from 'react'
import Footer from './Footer'
import AddPackingItem from '../containers/AddPackingItem'
import VisiblePackingItems from '../containers/VisiblePackingItems'

const App = () => (
  <div>
    <AddPackingItem />
    <VisiblePackingItems />
    <Footer />
  </div>
)

export default App
