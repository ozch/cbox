import React from "react";
// components

import CardSettings from "components/Cards/CardSettings.js";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {}
    }
  }



  render() {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4">
            <CardSettings />
          </div>
        </div>
      </>
    );
  }
}
