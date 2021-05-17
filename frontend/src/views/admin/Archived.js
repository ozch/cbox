import React from "react";
import axios from "axios";
import _ from 'lodash'

// components

import CardTableLimited from "components/Cards/CardTableLimited.js";

export default class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
    this.fetchOrders()
  }

  fetchOrders(){
    axios.get("/user/orders/").then((response)=>{
      this.setState({
        orders: _.filter(response.data,(e)=>{return e.status == 'Delivered'})
      })
    }).catch((error)=>{
      this.setState({error: "Sorry Could not fetch stats"})
    })
  }
  render() {
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
            <CardTableLimited orders={this.state.orders}/>
          </div>
        </div>
      </>
    );
  }
}
