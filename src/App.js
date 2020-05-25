import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { messages } from 'reducers/messages'
import { ui } from 'reducers/ui'
import { users } from 'reducers/users'
import { MessageBoard } from './components/MessageBoard'

const reducer = combineReducers({
  messages: messages.reducer,
  users: users.reducer,
  ui: ui.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <MessageBoard />
      </Provider>
    </>
  )
}
