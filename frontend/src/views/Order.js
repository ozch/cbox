/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';

import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Footer from 'components/Footers/Footer.js';
import axios from 'axios';

export default class Order extends React.Component {
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
    }
  }

  render() {
    return (
      <>
        <IndexNavbar fixed />
        <section className='header relative pt-16 flex h-screen max-h-860-px'>
          <div className='container mx-auto mt-10 flex flex-wrap w-3/6'>
            <Tabs color='lightBlue' />
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
      error: '',
      openTab: 1,
      length:"",
      width:"",
      height:"",
      contact:"",
      address:"",
      number:"",
      note:"",
      image:"",
      price:"",
      error_dim:"",
      error_cont:"",
      error_add:"",
      error_qnt:"",
    };
  }

  onChange(e) {
    let target = e.target;
    this.setState({ [target.id]: target.value });
  }

  placeOrder() {
    let {length,width,height,contact,address,number,note,price} = this.state;
    console.log({length,width,height,contact,address,number,note,price})
    axios
      .post('/user/orders/', {
        length,width,height,contact,address,number,note,price,status:'Pending'
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      });
  }
  validateTabOne(){
    const {length,width,height,number} = this.state
    const per_inch_sql_price = 2; 
    console.log({length,width,height,number})
    var error = false;
    if(!length || !width || !height){
      this.setState({ error_dim: "All dimension fields are required." });
      error = true
    }else{
      this.setState({ error_dim: "" });
    }
    if(!number){
      this.setState({ error_qnt: "Quantity field is required" });
      error = true
    }else{
      this.setState({ error_qnt: "" });
    }
    if(error){
      this.setState({ openTab: 1 });
    }else{
      let price = parseFloat(width).toFixed(1) * parseFloat(height).toFixed(1) * parseFloat(length).toFixed(1) * parseFloat(number) * per_inch_sql_price;
      this.setState({openTab:2, price})
    }
  }
  validateTabTwo(){
    const {contact,address} = this.state
    console.log({length,width,height,number})
    var error = false;
    if(!contact){
      this.setState({ error_cont: "Contact Information is Required." });
      error = true
    }else{
      this.setState({ error_cont: "" });
    }
    if(!address){
      this.setState({ error_add: "Address is Required." });
      error = true
    }else{
      this.setState({ error_add: "" });
    }
    if(error){
      this.setState({ openTab: 2 });
    }else{
      this.setState({openTab:3})
      this.placeOrder()
    }
  }
  setOpenTab(tab) {
    if(tab < this.state.openTab){
      this.setState({openTab:tab})
    }else{
      if(tab == 2){
        this.validateTabOne()
      }
      if(tab == 3){
        this.validateTabTwo()
      }
    }
    
   // this.setState({ openTab: tab });
  }

  render() {
    const { color } = this.props;
    return (
      <>
        <div className='flex flex-wrap' style={{ width: '50%' }}>
          <div className='w-full'>
            <ul
              className='flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row'
              role='tablist'
            >
              <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
                <a
                  className={
                    'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (this.state.openTab === 1
                      ? 'text-white bg-' + color + '-600'
                      : 'text-' + color + '-600 bg-white')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  data-toggle='tab'
                  href='#link1'
                  role='tablist'
                >
                  Box Design
                </a>
              </li>
              <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
                <a
                  className={
                    'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (this.state.openTab === 2
                      ? 'text-white bg-' + color + '-600'
                      : 'text-' + color + '-600 bg-white')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  data-toggle='tab'
                  href='#link2'
                  role='tablist'
                >
                  Delivery Address
                </a>
              </li>
              <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
                <a
                  className={
                    'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (this.state.openTab === 3
                      ? 'text-white bg-' + color + '-600'
                      : 'text-' + color + '-600 bg-white')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  data-toggle='tab'
                  href='#link3'
                  role='tablist'
                >
                  Complete
                </a>
              </li>
            </ul>
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
              <div className='px-4 py-5 flex-auto'>
                <div className='tab-content tab-space w-3/6'>
                  <div
                    className={this.state.openTab === 1 ? 'block' : 'hidden'}
                    id='link1'
                  >
                    <form>
                      <div className='flex flex-row'>
                        <div className='relative mb-3' style={{ width: '33%' }}>
                          <label
                            className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                            htmlFor='grid-password'
                          >
                            Length
                          </label>
                          <input
                            onChange={(e) => {
                              this.onChange(e);
                            }}
                            id='length'
                            type='number'
                            className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                            placeholder='Inch'
                          />
                        </div>
                        <div
                          className='relative mb-3'
                          style={{ width: '33%', marginLeft: '30px' }}
                        >
                          <label
                            className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                            htmlFor='grid-password'
                          >
                            Width
                          </label>
                          <input
                            onChange={(e) => {
                              this.onChange(e);
                            }}
                            id='width'
                            type='number'
                            className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                            placeholder='Inch'
                          />
                        </div>
                        <div
                          className='relative mb-3'
                          style={{ width: '33%', marginLeft: '30px' }}
                        >
                          <label
                            className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                            htmlFor='grid-password'
                          >
                            Height
                          </label>
                          <input
                            onChange={(e) => {
                              this.onChange(e);
                            }}
                            id='height'
                            type='number'
                            className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                            placeholder='Inch'
                          />
                        </div>
                      </div>
                      <div className='relative w-full mb-3'>
                          <label className='block uppercase  text-red-500 text-xs font-bold mb-2'>
                          {this.state.error_dim}
                          </label>
                      </div>

                      <div className='flex flex-row'>
                        <div
                          className='relative w-full mb-3'
                          style={{ width: '50%' }}
                        >
                          <label
                            className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                            htmlFor='grid-password'
                          >
                            Cover Design (Optional)
                          </label>
                          <input
                            onChange={(e) => {
                              this.onChange(e);
                            }}
                            id='image'
                            type='file'
                            className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          />
                        </div>

                        <div
                          className='relative w-full mb-3'
                          style={{ width: '50%', marginLeft: '30px' }}
                        >
                          <label
                            className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                            htmlFor='grid-password'
                          >
                            Quantity
                          </label>
                          <input
                            onChange={(e) => {
                              this.onChange(e);
                            }}
                            id='number'
                            type='number'
                            className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                            placeholder='Quantity of Boxes'
                          />
                          <div className='relative w-full mb-3'>
                          <label className='block uppercase text-red-500 text-xs font-bold mb-2'>
                          {this.state.error_qnt}
                          </label>
                      </div>
                        </div>
                        
                      </div>
                      
                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Note
                        </label>
                        <input
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                          id='note'
                          type='text'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Extra Note'
                        />
                      </div>

                      <div className='text-center mt-6'>
                        <button
                          onClick={(el) => {
                            this.setOpenTab(2);
                          }}
                          className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                          type='button'
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                  <div
                    className={this.state.openTab === 2 ? 'block' : 'hidden'}
                    id='link2'
                  >
                    <form>
                      <div className='relative mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Total Price
                        </label>
                        <input
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                          id='price'
                          value={parseFloat(this.state.price).toFixed(0)}
                          disabled
                          type='number'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        />
                      </div>

                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Address
                        </label>
                        <textarea
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                          id='address'
                          type='text'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Full Address'
                        />
                      </div>
                      <div className='relative w-full mb-3'>
                          <label className='block uppercase  text-red-500 text-xs font-bold mb-2'>
                          {this.state.error_add}
                          </label>
                      </div>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Contact
                        </label>
                        <input
                          onChange={(e) => {
                            this.onChange(e);
                          }}
                          id='contact'
                          type='number'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Phone Number'
                        />
                      </div>
                      <div className='relative w-full mb-3'>
                          <label className='block uppercase  text-red-500 text-xs font-bold mb-2'>
                          {this.state.error_cont}
                          </label>
                      </div>
                      <div className='text-center mt-6'>
                        <div className='flex flex-row'>
                          <button
                            onClick={(el) => {
                              this.setOpenTab(1);
                            }}
                            className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                            type='button'
                          >
                            Back
                          </button>
                          <button
                            onClick={(el) => {
                              this.setOpenTab(3);
                            }}
                            className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                            type='button'
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    className={this.state.openTab === 3 ? 'block' : 'hidden'}
                    id='link3'
                  >
                    <form>
                      <p>
                        Your Order has been place, you can check your order
                        progress by going to Orders tab
                      </p>

                      <br />
                      <button
                        href="/"
                        className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                      >
                        Done
                      </button>
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
