import React from "react";
import axios from 'axios';
import _ from 'lodash';
// components

import isSuper from "../../common.js"

import CardStats from "components/Cards/CardStats.js";

export default class HeaderStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: 0,
      in_progress: 0,
      delivered: 0,
      user: 0,
    }
    axios.get("/user/orders/").then((response)=>{
      const data = response.data
      this.setState({
        pending: _.filter(data,(e)=>{return e.status === "Pending"}).length+"",
        in_progress: _.filter(data,(e)=>{return e.status === "In Progress"}).length+"",
        delivered: _.filter(data,(e)=>{return e.status === "Delivered"}).length+"",
      })
    }).catch((error)=>{
      this.setState({error: "Sorry Could not fetch stats"})
    })
    axios.get("/user/users/").then((response)=>{
      const data = response.data
      this.setState({
        user: _.filter(data,(e)=>{return e.is_super == false}).length+"",
      })
    }).catch((error)=>{
      this.setState({error: "Sorry Could not fetch stats"})
    })
  }

  render() {
    return (
      <>
        {/* Header */}
        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
          {isSuper() && 

            <div>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Orders Pending"
                    statTitle={this.state.pending}
                    statPercentColor="text-emerald-500"
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-red-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Orders In Progress"
                    statTitle={this.state.in_progress}
                    statPercentColor="text-red-500"
                    statIconName="fas fa-chart-pie"
                    statIconColor="bg-orange-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Delivered"
                    statTitle={this.state.delivered}
                    statPercentColor="text-orange-500"
                    statIconName="fas fa-percent"
                    statIconColor="bg-pink-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Total Users"
                    statTitle={this.state.user}
                    statPercentColor="text-emerald-500"
                    statIconName="fas fa-users"
                    statIconColor="bg-lightBlue-500"
                  />
                </div>
              </div>
            </div>
            }
          </div>
        </div>
      </>
    );
  }
}
