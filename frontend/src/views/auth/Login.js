import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "error": "",
      "email":"",
      "password":"",
    }
    this.redirect()
  }
  
  loginUser(){
    if(!this.state.email || !this.state.password){
      this.setState({error:"Please fill all fields" })
    }
    axios.post("/user/login/",this.state).then((response)=>{
      let data = response.data
      axios.defaults.headers.common['Authorization'] = "Token "+data.token
      localStorage.setItem("token",data.token)
      localStorage.setItem("user",JSON.stringify(data))
      setTimeout(this.redirect(),1000)
    }).catch((error)=>{
      console.log(error)
      this.setState({error: "Invalid Email or Password"})
    })
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
  
  onChange(e){
    let target = e.target
    this.setState({[target.id]: target.value})
  }

  render() {
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">

                <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        onChange={(e)=>{this.onChange(e)}}
                        type="email"
                        id="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        onChange={(e)=>{this.onChange(e)}}
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                      />
                    </div>
                    <div>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-red-600 text-xs font-bold mb-3"
                      >
                        {this.state.error}
                      </label>
                     
                    </div>
                    <div className="text-center mt-6">
                      <button
                        onClick={()=>{this.loginUser()}}
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/auth/register" className="text-blueGray-200">
                    <small>Create new account</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
