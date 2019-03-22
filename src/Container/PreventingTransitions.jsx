import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";
import SignUp from "../Components/SignUp";
import Index from "../Components/Index";
import Signin from '../Components/Signin';

function PreventingTransitions() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={SignUP} />
        <Route path="/SignUp" component={Signin} />
        <Route path="/Index" component={Index}/>
      </div>
    </Router>
  );
}
export default PreventingTransitions;

