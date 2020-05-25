import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../reducers/users.js'
import styled from 'styled-components/macro'
import { Button, TextField } from '@material-ui/core'

const Main = styled.div`
  width: 350px;
  margin: 10px;
  background: lightgrey;
  padding: 10px;
`
const ButtonWrapper = styled.div`
  margin-top: 5px;
  display: flex; 
  justify-content: space-between;
`
const Text = styled.div`
  font-size: 13px;
`


export const Login = ({ handleClick }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const failed = useSelector(state => state.ui.isLoginFailed)

  const handleSignin = (event) => {
    event.preventDefault()
    dispatch(fetchUser({ userName, password }))
  }


  return (
    <Main>
      <Text>Please identify yourself to post a message</Text>
      <div>
        <TextField
          className="text-fields"
          color="secondary"
          variant="outlined"
          margin="dense"
          label="User name"
          required
          fullWidth
          size="small"
          type="text"
          value={userName}
          onChange={event => setUserName(event.target.value)}
        />
        <TextField
          color="secondary"
          variant="outlined"
          margin="dense"
          size="small"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      {failed && <Text>Incorrect user and/or password.</Text>}
      <ButtonWrapper>
        <Button
          size="small"
          variant="contained"
          type="submit"
          onClick={handleSignin}
        >
          SIGN IN
        </Button>
        <Button
          size="small"
          variant="contained"
          type="button" onClick={handleClick}>
          Not a member?
        </Button>
      </ButtonWrapper>
    </Main>
  )
}
