import React, { Component } from 'react';
import Signin from './Signin';
import ReactDOM from 'react-dom';
import Axios from 'axios';
 import './SignUp.css';
class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '', value1: '', value2: '', value3: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
componentDidMount(){ 
  Axios.get('/users/',{
  }).then(res=>{
   console.log(res.data)
  }).catch(error=>{
      console.log(error)
  })

}
handleSubmit(event) {
   event.preventDefault();
    if (this.state.value == "") { return }
    if (this.state.value1 == "") { return }
    if (this.state.value2 == "") { return }
    if (this.state.value3 == "") { return }
    if (this.state.value2 !== this.state.value3) { alert('Wrong Password!'); return; }
    // console.log(this.state.value1)
    const data ={
        name:this.state.value,
        email:this.state.value1,
        password:this.state.value2,
    } 
    Axios.post('/users/',data,{
    }).then(res=>{
       ReactDOM.render(<Signin />, document.getElementById('root'));
    }).catch(error=>{
        console.log(error)
    })
  }
  handleSignin() {
    ReactDOM.render(<Signin />, document.getElementById('root'));
  }
  handleChange(event) {
    this.setState({ value: event.target.value});
  }
  handleChange1(event) {
    this.setState({ value1: event.target.value});
  }
  handleChange2(event) {
    this.setState({ value2: event.target.value});
  }
  handleChange3(event) {
    this.setState({ value3: event.target.value});
  }
  render() {
    return (
      <div className="container">
        <div id="login-box">
          <div class="left">
            <h1>Sign up</h1>
            <input type="text" value={this.state.value} onChange={this.handleChange}  placeholder="Username" />
            <input type="text" value={this.state.value1} onChange={this.handleChange1}  placeholder="E-mail" />
            <input type="password" value={this.state.value2} onChange={this.handleChange2} placeholder="Password" />
            <input type="password" value={this.state.value3} onChange={this.handleChange3}placeholder="Retype password" />
            <div className="row">
              <div className="col-md-4"><input type="submit" value="Sign me up" onClick={this.handleSubmit} />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="col-md-4"><input type="submit" value="Sign in" onClick={this.handleSignin} /></div></div>
          </div>
          <div class="right">
            <span class="loginwith">Sign in with<br />social network</span>
            <button class="social-signin facebook">Log in with facebook</button>
            <button class="social-signin twitter">Log in with Twitter</button>
            <button class="social-signin google">Log in with Google+</button>
          </div>
          <div class="or">OR</div>
        </div>
      </div>
    )
  }
}
export default SignUp