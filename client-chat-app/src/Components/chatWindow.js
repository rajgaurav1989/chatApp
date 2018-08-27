import React, { Component } from 'react';

class ChatWindow extends React.Component {
   render() {
      return (
        <div id="super-chat">
           <div id="chat-window">
               <div id="output"></div>
               <div id="feedback"></div>
           </div>
           <input type="text" id="handle" placeholder="Handle" />
           <input type="text" id="message" placeholder="Message" />
           <button id="send">Send</button>
       </div>
      );
   }
}

export default ChatWindow;
