// want to test the reducers


import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'

import user from '../src/reducers/user_reducer.js'
import selectedItemClass from '../src/reducers/selected_item_class_reducer.js'

describe('>>>>> testing reducer user :)', () => {
  it('+++ reducer for SET_USER', () => {
    let state = {name:"blabber", id: 1000}

    state = user(state, {type:"SET_USER", name:"test"})

    expect(state).toEqual({name:"test", id: 1000})

  })

  it('+++ reducer for SET_USER_ID', () => {
    let state = {name:"blabber", id: 1000}

    state = user(state, {type:"SET_USER_ID", id:5})

    expect(state).toEqual({name:"blabber", id: 5})

  })

})


describe('>>>>> testing reducer selectedItemClass: ', () => {
  it('+++ reducer for SELECT_ITEM_CLASS, used to set bag currently using', () => {
    let state = 'boo';
    state = selectedItemClass(state, {type:"SELECT_ITEM_CLASS", itemClass:"trashbag"})

    expect(state).toEqual("trashbag")
  })
})

describe(">>>>>>> testing db connectivity. ")
