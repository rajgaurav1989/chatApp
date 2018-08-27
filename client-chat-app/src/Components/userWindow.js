import React, { Component } from 'react';
import TableRender from './tableRender'

class UserWindow extends React.Component {
    constructor(props) {
        super(props) ;
        this.state = {
            socketInfo : this.props.socketInfo,
            selectedFriend : "",
            selectColor : "pink",
            personSelected : false
        }

        this.leaveChatRoom = this.leaveChatRoom.bind(this) ;
        this.selectPerson = this.selectPerson.bind(this) ;
    }

    leaveChatRoom(e){
        this.state.socketInfo.emit('leave',this.props.userInfo) ;
    }

    selectPerson(e){
        if (this.props.allUsers.indexOf(this.state.selectedFriend) < 0){
            window.confirm("The person is not in the chat room") ;
        }
        else {

            var colorState = !this.state.personSelected ;

            if (colorState) {
                this.setState({ personSelected : true , selectColor : "green"},() => {
                console.log("raju in if "+this.state.selectColor+"\t"+this.state.selectedFriend+"\t"+this.state.personSelected);
            }) ;

            }
            else {
                this.setState({personSelected : false ,selectedFriend : "",selectColor : "pink"},() => {
                    console.log("raju in else "+this.state.selectColor+"\t"+this.state.selectedFriend+"\t"+this.state.personSelected);
                }) ;

            }

            // colorState ? this.setState({personSelected : false ,selectedFriend : "",selectColor : "pink"}) :
            //     this.setState({ personSelected : true,selectColor : "green"}) ;

            console.log("raju userWindow "+this.state.selectColor+"\t"+this.state.selectedFriend+"\t"+this.state.personSelected);
            this.props.sendData(this.state.selectedFriend) ;


        }
    }

    render() {
        const styles = {
            containerStyle: {
                color: this.state.selectColor,
            }
        };
        const { containerStyle } = styles;
        return (
            <div id="user-window">
            	<div id = "member-info">
                    <TableRender data = {this.props.allUsers} />

            	</div>
                <input value = {this.state.selectedFriend} type="text" style = {containerStyle} id="toChatWith" placeholder="Type Your Friend To Choose" onChange={ev => this.setState({selectedFriend: ev.target.value})} />
            	<button id="selectPerson" onClick = {(e) => this.selectPerson(e)} style = {containerStyle} >Select Toggle</button><hr />
                <button id="leaveChat" onClick={(e) => { if (window.confirm('Are you sure you wish to leave chat room?')) this.leaveChatRoom(e) } } >Leave</button>
            </div>
        );
    }
}

export default UserWindow;
