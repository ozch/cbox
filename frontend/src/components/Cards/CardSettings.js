import React from "react";
import axios from "axios";

// components

export default class CardSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {},
      email: "",
      password:"",
      first_name:""
    }
    this.updateUserData = this.updateUserData.bind(this)
    this.fetchMeData()
    
  }

  fetchMeData(){
    axios.get("/user/me/").then((response)=>{
      this.setState({
        me: response.data
      })
    }).catch((error)=>{
      this.setState({error: "Sorry Could not fetch user data"})
    })
  }

  updateUserData(){
    const {first_name,email,password} = this.state;
    let data = {}
    if(first_name.trim()){
      data['first_name'] = first_name.trim()
    }
    if(email.trim()){
      data['email'] = email
    }
    if(password.trim()){
      data['password'] = password
    }
    axios.post("/user/me/",data).then((response)=>{
      this.fetchMeData()
    }).catch((error)=>{
      this.setState({error: "Sorry Could not fetch user data"})
    })
  }

  onChange(e){
    let target = e.target
    this.setState({[target.id]: target.value})
  }

  render() {
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
              <button
              onClick={(e)=>{this.updateUserData()}}
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
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
                      defaultValue={this.state.me.first_name}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
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
                      defaultValue={this.state.me.email}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
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
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>

           </form>
          </div>
        </div>
      </>
    );
  }
}
