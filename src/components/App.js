import React from 'react'
import Footer from './Footer'
import AddPackingItem from '../containers/AddPackingItem'
import VisiblePackingItems from '../containers/VisiblePackingItems'
import Header from "./Header"
 //import Form from "./UserSpace"
import UserNow from "../containers/currentuser"


const App = () => (
  <div>
    <Header />
    <UserNow />
    <AddPackingItem />
    <VisiblePackingItems />
    <Footer />
  </div>
)

export default App
