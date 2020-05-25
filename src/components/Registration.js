import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import styled from 'styled-components/macro'

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

export const Registration = ({ handleClick }) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [registred, setRegistred] = useState(false)
  const [failure, setFailure] = useState(false)

  //URL - localhost or deployed version
  const url = "https://linda-messageboard-api.herokuapp.com"
  //const url = "http://localhost:8080"

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`${url}/users`, {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status !== 201) {
          return (
            res.json().then(json => console.log(json.message)), setFailure(true)
          )
        } else {
          setRegistred(true)
        }
      })
      .catch(err => console.log("Error:", err))
  }


  return (
    <Main>
      {registred &&
        <Text>Your account has been created. Please log in with your user name.</Text>
      }
      {!registred && (
        <div>
          {!failure && <Text>Please create an account to post a message</Text>}
          {failure && (
            <Text>
              User not created. Try using another name or email!
            </Text>
          )}
          {userName.length < 2 && userName.length !== 0 && " is too short"}
          {userName.length > 20 && " is too long"}
          <TextField
            color="secondary"
            size="small"
            variant="outlined"
            margin="dense"
            id="name"
            label="User name"
            name="name"
            required
            fullWidth
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
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            type="text"
            value={email}
            onChange={event => setEmail(event.target.value.toLowerCase())}
          />
          <div>
            {password.length < 5 && password.length !== 0 && " is too short"}
            <TextField
              color="secondary"
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              size="small"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <ButtonWrapper>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              size="small"
              disabled={
                userName.length > 1 &&
                  userName.length < 21 &&
                  password.length > 4 &&
                  email
                  ? false
                  : true
              }
              onClick={handleSubmit}
            >
              SIGN UP
            </Button>
            <Button
              size="small"
              variant="contained"
              type="button" onClick={handleClick}>
              Already a member?
            </Button>
          </ButtonWrapper>
        </div>
      )}
    </Main>
  )
}