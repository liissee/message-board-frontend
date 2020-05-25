import React from 'react'
import { ShowMessages } from 'components/ShowMessages'
import { PostMessage } from 'components/PostMessage'
import styled from 'styled-components/macro'
import { Header } from './Header'


const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const MessageBoard = () => {

  return (
    <>
      <Header />
      <Main>
        <PostMessage />
        <ShowMessages />
      </Main>
    </>
  )
}
