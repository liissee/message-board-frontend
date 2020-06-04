import { createSlice } from '@reduxjs/toolkit'
import { ui } from 'reducers/ui'


const initialState = {
  users: [],
  userName: localStorage.userName || "",
  accessToken: localStorage.accessToken || "",
  userId: localStorage.userId || ""
}


export const users = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
      window.localStorage.setItem('accessToken', action.payload)
    },
    removeAccessToken: (state, action) => {
      state.accessToken = ""
      window.localStorage.removeItem('accessToken', action.payload)
    },
    setUserId: (state, action) => {
      state.userId = action.payload
      window.localStorage.setItem('userId', action.payload)
    },
    removeUserId: (state, action) => {
      state.userId = ""
      window.localStorage.removeItem('userId', action.payload)
    },
    setUserName: (state, action) => {
      state.userName = action.payload
      window.localStorage.setItem('userName', action.payload)
    },
    removeUserName: (state, action) => {
      state.userName = ""
      window.localStorage.removeItem('userName', action.payload)
    }
  }
})

//URL - localhost or deployed version
//const url = "https://linda-messageboard-api.herokuapp.com"
const url = "http://localhost:8080"

//LOGIN 
export const fetchUser = ({ userName, password }) => {
  return dispatch => {
    fetch(`${url}/sessions`, {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Your user name and/or password was incorrect")
        } else {
          return res.json();
        }
      })
      .then(({ accessToken, userId, userName }) => {
        console.log("acc", accessToken, "id", userId, "name", userName)
        if (accessToken && userId && userName) {
          dispatch(users.actions.setAccessToken(accessToken))
          dispatch(users.actions.setUserName(userName))
          dispatch(users.actions.setUserId(userId))
          dispatch(ui.actions.setLoginFailed(false))
        }

      })
      .catch(err => dispatch(ui.actions.setLoginFailed(true)))
  }
}
