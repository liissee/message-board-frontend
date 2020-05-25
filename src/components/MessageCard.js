import React, { useState } from 'react'
import { Card } from '@material-ui/core';
import styled from 'styled-components/macro'
import { PostReply } from './PostReply';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DeleteMessage } from './DeleteMessage';
import { EditMessage } from './EditMessage';
import moment from "moment"

const Main = styled.div`
  margin-bottom: 30px;
& {
.replyContainer {
  padding-bottom: 0;
  margin: 0px;
  }
.replyContainer:last-child {
  padding: 0px;
  padding-bottom: 0;
  margin: 0px;
  }
.expand-icon-wrapper {
  display:flex;
  align-items: center;
  }
.replyCard {
  background: lightgrey;
  border: white solid 1px;
  }
.messageContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  }
}
`
const CardStyle = styled(Card)`
  margin: 10px;
  width: 400px;
  background-color: #E4BFAF;
   @media (max-width: 576px) {
    width: 100%;
    margin: 0px;
  }
`
const Rotate = styled.div`
& {
  .expand {
    transform: rotate(0deg);
    margin-left: auto;
  }
  .expandOpen {
    transform: rotate(180deg);
  }
}
`

export const MessageCard = ({ id, message, author, createdAt, children }) => {
  const [expanded, setExpanded] = useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Main>
      <CardStyle>
        <CardHeader
          avatar={
            <Avatar aria-label="author">
              T
          </Avatar>
          }
          title={author}
          subheader={createdAt}
        />
        <CardContent className="messageContent">
          <EditMessage id={id} author={author} message={message} />
          <DeleteMessage id={id} author={author} />
        </CardContent>
        <PostReply parentId={id} />
        {children && children.length && children.length > 0 &&
          <div className="expand-icon-wrapper">
            <Rotate>
              <IconButton
                className={expanded ? "expandOpen" : "expand"}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Rotate>
            <Typography onClick={handleExpandClick}
              variant="body2" color="textSecondary">{children.length} {children.length > 1 ? "replies" : "reply"}</Typography>
          </div>
        }
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="replyContainer">
            {children && children.length && children.length > 0 && children.map((reply) => (
              <CardContent key={reply._id} id={reply._id} className="replyCard">
                <CardHeader
                  avatar={
                    <Avatar aria-label="author">
                      R
                  </Avatar>
                  }
                  title={author}
                  subheader={moment(message.createdAt).format('ll')}
                />
                <CardContent className="messageContent">
                  <EditMessage id={reply._id} author={reply.author} message={reply.message} />
                  <DeleteMessage id={reply._id} author={reply.author} />
                </CardContent>
              </CardContent>
            ))}
          </CardContent>
        </Collapse>
      </CardStyle>
    </Main>
  )
}