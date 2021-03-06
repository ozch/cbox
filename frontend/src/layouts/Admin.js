import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import FeedBack from "views/admin/FeedBack.js";
import GiveFeedBack from "views/admin/SendFeedBack.js";

import Messages from "views/admin/Messages.js";

import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Archived from "views/admin/Archived.js";
import Login from 'views/auth/Login';

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
         <AdminNavbar />
        {/* Header */}
        
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/messages" exact component={Messages} />
            <Route path="/admin/feedback" exact component={FeedBack} />
            <Route path="/admin/give-feedback" exact component={GiveFeedBack} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/archived" exact component={Archived} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
