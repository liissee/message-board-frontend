import { createSlice } from '@reduxjs/toolkit'
import { ui } from 'reducers/ui'

export const messages = createSlice({
  name: 'messages',
  initialState: {
    messages: []
  },
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload
    },
    setPostedMessage: (state, action) => {
      // state.messages = action.payload
      state.messages.push(action.payload)
    },
    deleteMessage: (state, action) => {
      // Filter out all message but the message with matching id
      state.messages = state.messages.filter(message => message._id !== action.payload)
    },
    editMessage: (state, action) => {
      // To find the message we want to update (message data = action.payload)
      // If message found, return the message with updated data
      state.messages = state.messages.map((message) => {
        if (message._id === action.payload._id) {
          return action.payload
        } else {
          // Otherwhise return message as is
          return message
        }
      })
    },
  }
})

//GET MESSAGES
export const fetchMessages = () => {
  return dispatch => {
    dispatch(ui.actions.setLoading(true))
    fetch('http://localhost:8080/messages')
      .then((res) => res.json())
      .then((json) => {
        console.log("1", json)
        if (json[0]) {
          const replies = function (json, root) {
            const nestedMessages = {};
            json.forEach(message => {
              Object.assign(nestedMessages[message._id] = nestedMessages[message._id] || {}, message);
              nestedMessages[message.parentId] = nestedMessages[message.parentId] || {};
              nestedMessages[message.parentId].children = nestedMessages[message.parentId].children || [];
              nestedMessages[message.parentId].children.push(nestedMessages[message._id]);
            });
            return nestedMessages[root].children;
          }(json, null);
          dispatch(messages.actions.setMessage(replies));
          dispatch(ui.actions.setLoading(false))
        } else {
          dispatch(messages.actions.setMessage(json));
          dispatch(ui.actions.setLoading(false))
        }
      });
  };
};


//POST MESSAGES
export const postMessages = ({ message, author, parentId }) => {
  return dispatch => {
    const accessToken = localStorage.getItem('accessToken')
    fetch("http://localhost:8080/messages", {
      method: "POST",
      body: JSON.stringify({ message, author, parentId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken
      }
    })
      .then(() => {
        return dispatch(messages.actions.setPostedMessage(author, message, parentId));
      })
      .catch(() => {
        dispatch(messages.ui.setErrorMessage({ error: 'can not post message' }));
      });
    // fetch('http://localhost:8080/messages')
    //   .then((res) => res.json())
    //   .then((json) => {
    //     dispatch(messages.actions.setMessage(json));
    //   })
    //   .catch(() => {
    //     dispatch(messages.ui.setErrorMessage({ error: 'can not fetch message' }));
    //   });
  }
};

// DELETE MESSAGE
export const deleteMessages = ({ id, author }) => {
  return dispatch => {
    dispatch(ui.actions.setErrorMessage(false))
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')

    fetch(`http://localhost:8080/messages/${id}`, {
      method: 'DELETE',
      statusCode: 204,
      body: JSON.stringify({ id, author, userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken
      }
    })
      .then(() => {
        if (author === userId) {
          console.log(id)
          dispatch(messages.actions.deleteMessage(id))
          dispatch(ui.actions.setLoading(false))
          dispatch(ui.actions.setErrorMessage(false))
        } else {
          console.log("not your message")
          dispatch(ui.actions.setErrorMessage(true))
        }
      })
  }
}

//EDIT MESSAGE
export const editMessages = ({ id, author, newValue }) => {
  return dispatch => {
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')
    fetch(`http://localhost:8080/messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ message: newValue, userId: userId, author: author }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    })
      .then((res) => res.json())
      .then((updatedMessage) => {
        console.log("updated", updatedMessage)
        dispatch(messages.actions.editMessage(updatedMessage))
      })
  }
}