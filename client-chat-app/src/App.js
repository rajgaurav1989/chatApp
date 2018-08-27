import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import Chat from './Components/chat'
// Making the App component
class App extends Component {

  render() {
    return (
      <Chat />
    )
  }
}

export default App
