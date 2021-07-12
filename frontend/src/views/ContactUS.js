/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';

import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Footer from 'components/Footers/Footer.js';
import axios from 'axios';
import FeedBack from './admin/FeedBack';

export default class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <IndexNavbar fixed />
        <section className='header relative pt-16 flex h-screen max-h-860-px'>
          <div className='container mx-auto mt-10 flex flex-wrap w-3/6'>
            <Tabs></Tabs>
          </div>
          <img
            className='absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px'
            src={require('assets/img/pattern_react.png').default}
            alt='...'
          />
        </section>
        <Footer />
      </>
    );
  }
}

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      email:"",
      feedback:"",
      error_feedback:"",
      error_username:"",
      error_email:"",
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
      .post('/user/messages/', {
        username,email,feedback
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
      });
      this.setState({username:"",
      email:"",
      feedback:""})
  }
  validateandSend(){
    const {username,email,feedback} = this.state
    var error = false;
    if(!username){
      this.setState({ error_username: "Username is Required." });
      error = true
    }else{
      this.setState({ error_username: "" });
    }
    if(!email){
      this.setState({ error_email: "Email Address is Required." });
      error = true
    }else{
      this.setState({ error_email: "" });
    }
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
    const { color } = this.props;
    return (
      <>
        <div className='flex flex-wrap' style={{ width: '50%' }}>
          <div className='w-full'>
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
              <div className='px-4 py-5 flex-auto'>
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
                          Username
                        </label>
                        <input
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                          id='username'
                          type='text'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Name'
                          value={this.state.username}
                        />
                      </div>
                      
                      <div className='relative w-full mb-3'>
                          <label className='block uppercase  text-red-500 text-xs font-bold mb-2'>
                          {this.state.error_username}
                          </label>
                      </div>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Email
                        </label>
                        <input
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                          id='email'
                          type='text'
                          value={this.state.email}
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Email'
                        />
                      </div>
                      
                      <div className='relative w-full mb-3'>
                          <label className='block uppercase  text-red-500 text-xs font-bold mb-2'>
                          {this.state.error_email}
                          </label>
                      </div>
                    <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Message
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
          </div>
        </div>
      </>
    );
  }
}
