import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postMessages, fetchMessages } from 'reducers/messages';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components/macro'

const Main = styled.div`
}
`
const PostMessage = styled.div`
  margin: 10px;
& {
.input-field {
  width: 100%;
  background: #f1f1f1;
  margin-bottom: 5px;
  }
}
`

export const PostReply = ({ parentId }) => {
  const [message, setMessage] = useState("")
  const dispatch = useDispatch();

  const author = useSelector((state) => state.users.userId)
  const accessToken = useSelector((state) => state.users.accessToken)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postMessages({ message, author, parentId }))
    dispatch(fetchMessages());
    setMessage("")
  }

  return (
    <Main>
      <PostMessage>
        <TextField
          color="secondary"
          label="New comment"
          className="input-field"
          id="outlined-multiline-static"
          multiline
          rows={1}
          variant="outlined"
          type="message"
          required
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <Button size="small" disabled={!accessToken || message.length < 1} variant="contained" type="submit" onClick={handleSubmit}>
          Post reply
            </Button>
      </PostMessage>
    </Main>
  )
}
