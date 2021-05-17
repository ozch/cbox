/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
// components

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    const loggedin = localStorage.getItem('token') == null || localStorage.getItem('token') == ''
    this.state = {
      navbarOpen: false,
      loggedin: !loggedin
    }
  }

  loginLogoutButton(){
    if(this.state.loggedin){
      return (
        <li className='flex items-center'>
        <button
          onClick={(e) => {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            axios.defaults.headers.common['Authorization'] = "";
            window.location.href = "/auth/login"
          }}
          className='bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150'
          type='button'
        >
          <i className='fas fa-logout'></i> Logout
        </button>
        </li>
      )
    }
    return (
      <li className='flex items-center'>
      <Link
        className='bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150'
        type='button'
        to="/auth/login"
      >
        <i className='fas fa-logout'></i> Login
      </Link>
      </li>
    )
  }

  render() {
    return (
      <>
        <nav className='top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow'>
          <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
            <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
              <Link
                to='/'
                className='text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase'
              >
                Cardi
              </Link>
              <button
                className='cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
                type='button'
                onClick={() => this.setState({navbarOpen: !this.state.navbarOpen})}
              >
                <i className='fas fa-bars'></i>
              </button>
            </div>
            <div
              className={
                'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none' +
                (this.state.navbarOpen ? ' block' : ' hidden')
              }
              id='example-navbar-warning'
            >
              <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              { this.state.loggedin &&<li className="flex items-center">
                <Link
                  to="/admin/tables"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="#"
                >
                  <i className="text-blueGray-400 fa fa-shopping-bag text-lg leading-lg mr-2" />{" "}
                  Orders
                </Link>
              </li>
            }
              { this.state.loggedin &&  <li className="flex items-center">
                <Link
                  to="/admin/settings"
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="#"
                >
                  <i className="text-blueGray-400 fa fa-cog text-lg leading-lg mr-2" />{" "}
                  Account
                </Link>
              </li>
              }

              {
                this.loginLogoutButton()
              }
                
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

