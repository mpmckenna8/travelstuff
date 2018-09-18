// want to test the reducers


import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import { Thunk } from 'redux-testkit';

import {fetchItems, requestItems, itemAddDBresponse} from '../actions/actions.js'
import {attemptLogIn , signupUser} from '../actions/useracts.js'

import user from '../reducers/user_reducer.js'
import selectedItemClass from '../reducers/selected_item_class_reducer.js'


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


  it("+++ Test to log a user on, ", () => {
    let state = {name:"test", id: 1, returnHome: false, loggingIn: false, needsRefresh: false}

    state = user(state, {type:"LOGIN_SUCCESS",  user:{email:'admin', u_id: 4}})

    expect(state).toEqual({"id": 4, "loggingIn": true, "name": "admin", "needsRefresh": false, "returnHome": false})

    })

    it("+++ Test to a log a on with the db, ", async () => {
      const Signon = await Thunk(attemptLogIn).execute({name: "admin", password:"pass"})

      //console.log(Signon)
      expect( Signon.length ).toBe(1);
    })


  })



describe('>>>>> testing reducer selectedItemClass: ', () => {
  it('+++ reducer for SELECT_ITEM_CLASS, used to set bag currently using', () => {
    let state = selectedItemClass(state, {type:"SELECT_ITEM_CLASS", itemClass:"trashbag"})

    expect(state.onCollection).toEqual("trashbag")
  })
})

describe(">>>>>>> testing db connectivity. ", () => {
  it('+++ test to make sure the database is working properly', async () => {
    const fetchstuff = await Thunk(fetchItems).execute('all', 'test')

    expect( fetchstuff.length).toBe(2)
    expect( fetchstuff[0].isPlainObject()).toBe(true)
    //console.log('trying to test fetching', fetchstuff)
  });

})

describe(">>>>>>> Testing signing up a user.  ", () => {

  it('+++ test to sign up a new user', async () => {
    const SignupUser = await Thunk(signupUser).execute({name:'bob', password: "pass"})

  })



})
