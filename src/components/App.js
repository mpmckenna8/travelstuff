import React from 'react'
import Footer from './Footer'
import AddPackingItem from '../containers/AddPackingItem'
import VisiblePackingItems from '../containers/VisiblePackingItems'
import Header from "./Header"

const App = () => (
  <div>
    <Header />
    <AddPackingItem />
    <VisiblePackingItems />
    <Footer />
  </div>
)

export default App
