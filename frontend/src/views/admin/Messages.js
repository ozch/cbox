import React from "react";
import axios from "axios";
import _ from 'lodash'
// components

import CardTable from "components/Cards/CardTableMessages.js";

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
    this.fetchMessages()
    this.deleteRow = this.deleteRow.bind(this)
  }

  fetchMessages(){
    axios.get("/user/messages/").then((response)=>{
      this.setState({
        Messages: response.data})
    }).catch((error)=>{
      this.setState({error: "Sorry Could not fetch stats"})
    })
  }

  deleteRow(id){
    axios.delete("/user/messages/",{id:id}).then((response)=>{
      this.fetchMessages()
    }).catch((error)=>{
      this.setState({error: "Sorry Could not delete"})
    })
  }

  render() {
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardTable data={this.state.Messages} deleteRow={this.deleteRow}/>
          </div>
        </div>
      </>
    );
  }
}
