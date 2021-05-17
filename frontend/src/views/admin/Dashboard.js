import React from "react";
import _ from 'lodash';
import axios from 'axios';
// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    }
    axios.get("/user/orders/").then((response)=>{
      const cur = new Date().getYear()
      let data = response.data
      data = _.filter(data,(e)=>{return new Date(e.created).getYear() === cur})
      const stats = []
      for(let i=0;i<5;i++){
        stats.push(_.filter(data,(e)=>{return new Date(e.created).getMonth() === i}).length)
      }
      this.setState({
        stats: stats
      })
    }).catch((error)=>{
      this.setState({error: "Sorry Could not fetch stats"})
    })
  }

  render() {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardLineChart stats={this.state.stats}/>
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardBarChart stats={this.state.stats}/>
          </div>
        </div>
      </>
    );
  }
}
