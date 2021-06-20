/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.redirect()
  }

  redirect(){
    let user = JSON.parse(localStorage.getItem("user"))
    if(!user){
      return
    }
    if(user.is_super || user.is_superuser){
      this.props.history.push("/admin/dashboard")
    }else{
      this.props.history.push("/")
    }
  }
  

  render() {
    return (
      <>
        <IndexNavbar fixed />
        <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
          <div className="container mx-auto items-center flex flex-wrap">
            <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
              <div className="pt-32 sm:pt-0">
                <h2 className="font-semibold text-4xl text-blueGray-600">
                  Online Custom Packlane - Cardboard Boxs.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Online Custom Packlane - Cardboard Boxs.{" "}
                  <a
                    href="https://tailwindcss.com/?ref=creativetim"
                    className="text-blueGray-600"
                    target="_blank"
                  >
                    Custom Card Boxes
                  </a>
                  . Durable, high quality and inexpensive
                </p>
                <div className="mt-12">
                  <a
                    href="/order"
                    className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    Design Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <img
            className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
            src={require("assets/img/pattern_react.png").default}
            alt="..."
          />
        </section>


        <Footer />
      </>
    );
  }
}
