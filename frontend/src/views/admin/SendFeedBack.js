import React from "react";
import axios from "axios";
import _ from 'lodash'
// components

import CardTable from "components/Cards/CardTableFeedBack.js";

export default class SendFeedBack extends React.Component {
  constructor(props) {
    let user = JSON.parse(localStorage.getItem("user"))
    super(props);
    this.state = {
      username:user.name,
      email:user.email,
      feedback:"",
      error_feedback:"",
      openTab:1
    };
  }

  onChange(e) {
    let target = e.target;
    this.setState({ [target.id]: target.value });
  }

  sendMessage() {
    let {username,email,feedback} = this.state;
    axios
      .post('/user/feedback/', {
        username,email,feedback
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
      });
      this.setState({feedback:""})
  }
  validateandSend(){
    const {feedback} = this.state
    var error = false;
    if(!feedback){
      this.setState({ error_feedback: "Message is Required." });
      error = true
    }else{
      this.setState({ error_feedback: "" });
    }
    if(error){
      return;
    }else{
      this.sendMessage()
    }
  }


  render() {
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
                <div className='tab-content tab-space w-3/6'>
                  <div
                    className={this.state.openTab === 1 ? 'block' : 'hidden'}
                    id='link1'
                  >
                    <form>
                    <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Feedback
                        </label>
                        <textarea
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                          id='feedback'
                          value={this.state.feedback}
                          type='text'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Message'
                        />
                      </div>
                      
                      <div className='relative w-full mb-3'>
                          <label className='block uppercase  text-red-500 text-xs font-bold mb-2'>
                          {this.state.error_feedback}
                          </label>
                      </div>

                      <div className='text-center mt-6'>
                        <button
                          onClick={(el) => {
                            this.validateandSend()
                          }}
                          className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                          type='button'
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
          </div>
        </div>
      </>
    );
  }
}
