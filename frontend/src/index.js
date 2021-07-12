import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Index from "views/Index.js";
import Order from "views/Order.js";
import FAQ from "views/FAQ.js"
import ContactUS from "views/ContactUS.js"

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
if(localStorage.getItem('token'))
  axios.defaults.headers.common['Authorization'] = "Token "+localStorage.getItem('token');
else
  axios.defaults.headers.common['Authorization'] = "";

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/order" exact component={Order} />
      <Route path="/landing" exact component={Landing} />
      <Route path="/faq" exact component={FAQ} />
      <Route path="/contact-us" exact component={ContactUS} />
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
