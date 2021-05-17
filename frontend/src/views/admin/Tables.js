import React from "react";
import axios from "axios";
import _ from 'lodash'
// components

import CardTable from "components/Cards/CardTable.js";

export default class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
    this.fetchOrders()
    this.updateStatus = this.updateStatus.bind(this)
  }

  fetchOrders(){
    axios.get("/user/orders/").then((response)=>{
      this.setState({
        orders: _.filter(response.data,(e)=>{return e.status != 'Delivered'})
      })
    }).catch((error)=>{
      this.setState({error: "Sorry Could not fetch stats"})
    })
  }

  updateStatus(id,status){
    console.log(id,status,"<<<<")
    axios.put("/user/orders/",{id:id,status:status}).then((response)=>{
      this.fetchOrders()
    }).catch((error)=>{
      this.setState({error: "Sorry Could not update status"})
    })
  }

  render() {
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardTable orders={this.state.orders} updateStatus={this.updateStatus}/>
          </div>
        </div>
      </>
    );
  }
}
