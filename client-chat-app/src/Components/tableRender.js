import React from 'react';

class TableRender extends React.Component {
   render() {
        var names = this.props.data ;
        var namesList = names.map(function(name){
                        return <li><p> {name} </p> </li>;});
      return (
        <ul> {namesList} </ul>
      );
   }
}

export default TableRender;
