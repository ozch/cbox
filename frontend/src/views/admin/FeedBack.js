import React from "react";
import axios from "axios";
import _ from 'lodash'
// components

import CardTable from "components/Cards/CardTableFeedBack.js";

export default class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
    this.fetchFeedBack()
    this.deleteRow = this.deleteRow.bind(this)
  }

  fetchFeedBack(){
    axios.get("/user/feedback/").then((response)=>{
      this.setState({
        feedback: response.data})
    }).catch((error)=>{
      this.setState({error: "Sorry Could not fetch stats"})
    })
  }

  deleteRow(id){
    axios.delete("/user/feedback/?id="+id,{id:id}).then((response)=>{
      this.fetchFeedBack()
    }).catch((error)=>{
      this.setState({error: "Sorry Could not delete"})
    })
  }

  render() {
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardTable data={this.state.feedback} deleteRow={this.deleteRow}/>
          </div>
        </div>
      </>
    );
  }
}
