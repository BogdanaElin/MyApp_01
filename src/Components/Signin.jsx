import React, { Component } from 'react';
import Axios from 'axios'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import Index from './Index'
import './Signin.css';
// import { exists } from 'fs';
class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '', value1: '', data: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value !== '' & this.state.value1 !== '') {
      Axios.get('/users/', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          res.data.map((val, index) => {
            if (val.name == this.state.value && val.password == this.state.value1) {
              localStorage.setItem("name", val.name)
              localStorage.setItem("password", val.password)
              localStorage.setItem("id", val.id)
              localStorage.setItem("api_token", "aaaaaaaa")
              ReactDOM.render(<Index />, document.getElementById('root'));
              return 
            }
          })
        }).catch((error) => {
          console.log(error)
        })
    } else {
      alert("Please input correctly")
    }
  }
  handleSignUp() {
    ReactDOM.render(<SignUp />, document.getElementById('root'));
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleChange1(event) {
    this.setState({ value1: event.target.value });
  }
  render() {
    return (
      <div className="container">
        <div id="login">
          <form>
            <h1>Sign In</h1>
            <input type="text" value={this.state.value} onChange={this.handleChange} id="name" placeholder="Username" />
            <input type="password" value={this.state.value1} onChange={this.handleChange1} id="email" placeholder="Password" />
            <button onClick={this.handleSubmit}>Sign in</button>
            <button onClick={this.handleSignUp}>Sign Up</button>
          </form>
        </div>
      </div>
    )
  }
}
export default Signin






