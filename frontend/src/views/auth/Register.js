import React from "react";
import axios from 'axios';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "error": "",
      "first_name":"",
      "email":"",
      "password":"",
    }
  }

  onChange(e){
    let target = e.target
    this.setState({[target.id]: target.value})
  }

  createUser(){
    console.log(this.state)
    if(!this.state.email || !this.state.password || !this.state.first_name){
      this.setState({error:"Please fill all fields" })
      return
    }
    axios.post("/user/signup/",{
      first_name: this.state.first_name,
      last_name: "",
      email: this.state.email,
      password:this.state.password
    }).then((response)=>{
      this.props.history.push("/auth/login")
    }).catch((error)=>{
      this.setState({error: "Invalid Email or Password"})
    })
  }


  render() {
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
        
                <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
                  
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Name
                      </label>
                      <input
                        onChange={(e)=>{this.onChange(e)}}
                        id="first_name"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        onChange={(e)=>{this.onChange(e)}}
                        id="email"
                        type="email"
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
                       onChange={(e)=>{this.onChange(e)}}
                       id="password"
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      >
                        {this.state.error}
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        onClick={(el)=>{this.createUser()}}
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
