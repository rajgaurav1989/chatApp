import React from 'react';
import io from "socket.io-client";
import Parser from 'html-react-parser';
import UserWindow from './userWindow'

class Chat extends React.Component {
    constructor() {
      super();
      this.state = {
        username : "",
        message : "",
        feedbackSensing:"",
        chatBody : "",
        userEntered : false,
        users : [],
        displayDiv : 'flex',
        leaveChatFlag : false,
        receiver : "",
        firstClient : false
      };

      this.socket = io('http://localhost:8088');

      this.sendMessage = this.sendMessage.bind(this) ;
      //this.senseInput = this.senseInput.bind(this) ;
      this.getData = this.getData.bind(this) ;

      this.socket.on('chat', function(data){
          displayMessage(data) ;
      });

      // this.socket.on('typing', function(data){
      //     senseTypeMessage(data) ;
      // });

      this.socket.on('joinChat', function(data){
          addUser(data) ;
      });

      this.socket.on('leave', function(data){
          shutDownChat(data) ;
      });

      this.socket.on('privateChat',function(data) {
          sendPrivateMsg(data) ;
      }) ;

      this.socket.on('getAllUsers',function(data){
          informUser(data) ;
      });



      const senseTypeMessage = data => {
          this.setState({feedbackSensing : '<p><em>' + data + ' is typing a message...</em></p>' });
      } ;

      const displayMessage = data => {
          this.setState ({feedbackSensing :  "" ,
                        chatBody : this.state.chatBody + '<p><strong>' + data.username + ' : </strong> ' + data.message +'</p>' }) ;
      } ;

      const addUser = data => {
         // console.log("set check init "+data);
          var index = data.indexOf(this.state.username) ;
          if (index >= 0){
              data.splice(index, 1);
          }
          this.setState({users : data });
          //console.log("set check final "+this.state.users);
      } ;

      const shutDownChat = data => {
          this.setState({leaveChatFlag : true}) ;
      } ;

      const sendPrivateMsg = data => {

          this.setState ({feedbackSensing :  "" ,
                        chatBody : this.state.chatBody + '<p><strong>Private Message From ' + data.sender + ' To '+data.receiver +'</strong> ' + data.message +'</p>' }) ;
      } ;

      const informUser = data => {
          this.setState({users : data.info, firstClient : data.chatStart });
      } ;



    }

    getData(value){
        this.setState({receiver : value});
    }

    sendMessage(){
        if (this.state.users.length === 0 && !this.state.firstClient) {
            this.socket.emit('getAllUsers',"") ;
            return ;
        }

        if (this.state.users.length > 0 && this.state.users.indexOf(this.state.username) >= 0){
            return ;
        }


        if (!this.state.userEntered && this.state.username.trim() !== "" && this.state.message.trim() !== ""){
            this.socket.emit('joinChat',this.state.username) ;
            this.setState({userEntered : true});
        }

        console.log("raju chaWindow "+this.state.receiver);
        if (this.state.username.trim() !== "" && this.state.message.trim() !== ""){


            if (this.state.receiver !== ""){
                this.socket.emit('privateChat', {
                    sender : this.state.username ,
                    message : this.state.message ,
                    receiver : this.state.receiver
                });
            }
            else {
                this.socket.emit('chat', {
                    message: this.state.message,
                    username: this.state.username
                });
            }
            this.setState({ message : "",receiver : ""}) ;
        }



    }

    // senseInput(){
    //     this.socket.emit('typing',this.state.username);
    // }

    render() {
        const styles = {
            containerStyle: {
                display: this.state.leaveChatFlag ? "none" : this.state.displayDiv,
            }
        };
        const { containerStyle } = styles;
        return (
            <div id = "main-window" style={containerStyle} >
                  <UserWindow allUsers = {this.state.users} socketInfo = {this.socket} userInfo = {this.state.username} sendData={this.getData} />
                  <div id="super-chat">
                     <div id="chat-window">
                         <div id="output" onChange={ev => this.setState({chatBody: ev.target.value})} > {Parser(this.state.chatBody)} </div>
                         <div id="feedback" onChange={ev => this.setState({feedbackSensing: ev.target.value})} >{Parser(this.state.feedbackSensing)}</div>
                     </div>
                     <input type="text" id="username" placeholder="User Name" onChange={ev => this.setState({username: ev.target.value})} value = {this.state.username} disabled = {(this.state.userEntered) ? "disabled" : ""} />
                     <input type="text" id="message" placeholder="Message" onKeyPress = {this.senseInput} onChange={ev => this.setState({message: ev.target.value})} value = {this.state.message} />
                     <button id="send" onClick = {this.sendMessage} >Send</button>
                 </div>
            </div>
        );
    }
}

export default Chat;
