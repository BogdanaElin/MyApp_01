import React, { Component } from 'react';
import Axios, * as others from 'axios'
import Update from './Update'
import Delete from './Delete'
import ReactDOM from 'react-dom';

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '', value1: '', value2: '', data: [], sel_id: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }
  componentDidMount() {
    Axios.get('/todolist/', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log(res.data)
        console.log(localStorage.id)
        var userList = [], num = 0;
        var user_id = localStorage.id;
        console.log("user_id=", user_id);
        res.data.map((val, index) => {
          console.log("user id of list = ", val['user_id']);
          if (val['user_id'] == user_id) {
            userList[num] = val;
            num++;
          }
        })
        console.log(userList);



        this.setState({ data: userList })
      }).catch((error) => {
        console.log("test--------->" + error)
      }
      )
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value !== '' && this.state.value1 !== '' && this.state.value2 !== '') {

      const data = { itemname: this.state.value, description: this.state.value1, deadline: this.state.value2 }
      Axios.post('/todolist/', data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          this.setState({ institute: res.data })

        }).catch((error) => {
          console.log("test--------->" + error)
        }
        )
      return
    }
    alert("please input conrrectly!")
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleChange1(event) {
    this.setState({ value1: event.target.value });
  }
  handleChange2(event) {
    this.setState({ value2: event.target.value });

  }
  handleUpdate(event) {

    const data = {
      id: this.state.data[this.state.sel_id].id,
      user_id: "2",
      itemname: this.state.value,
      description: this.state.value1,
      deadline: this.state.value2,
      status: 1

    }
    console.log(data);
    Axios.put('/todolist/', data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {

      }).catch((error) => {
        console.log("test--------->" + error)
      }
      )
  }
  handleDelete(event) {
    alert(this.state.data[this.state.sel_id].id);
    Axios.delete('/todolist/' + this.state.data[this.state.sel_id].id, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {

      }).catch((error) => {
        console.log("test--------->" + error)
      }
      )
  }
  handleRefresh(event) {
    Axios.get('/todolist/', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log(res.data)
        this.setState({ data: res.data })
      }).catch((error) => {
        console.log("test--------->" + error)
      }
      )
  }
  handleClick(id) {
    this.setState({ sel_id: id })
    console.log(this.state.data[id])
    this.setState({ value: this.state.data[id].itemname })
    this.setState({ value1: this.state.data[id].description })
    this.setState({ value2: this.state.data[id].deadline })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>To-Do List</h2>
            <form onSubmit={this.handleSubmit} >
              <div className="form-group">
                <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} id="itemname" placeholder="itemName" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" value={this.state.value1} onChange={this.handleChange1} id="description" placeholder="Description" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" value={this.state.value2} onChange={this.handleChange2} id="deadline" placeholder="Deadline" />
              </div>
              <div className="form-group">
                <button className='btn btn-primary' type="submit" value="Submit">Additem</button>&nbsp;
                <button className='btn btn btn-secondary' type="button" onClick={this.handleUpdate}>Update</button>&nbsp;
                <button className='btn btn btn-info' type="button" onClick={this.handleDelete}>Delete</button>&nbsp;
                <button className='btn btn btn-info' type="button" onClick={this.handleRefresh}>Refresh</button>&nbsp;
              </div>
            </form>
          </div>
        </div>
        <table className='table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>itemName</th>
              <th>Description</th>
              <th>deadline</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map((val, index) => {
                {/* return  <tr key={index} onClick={() => {this.handleClick(val.id)}}> <td>{index+1}</td> <td>{val.name}</td>  <td>{val.email}</td>  <td>{val.description}</td></tr>  */ }
                return <tr key={index} onClick={() => { this.handleClick(index) }}> <td>{index + 1}</td> <td>{val.itemname}</td> <td>{val.description}</td>  <td>{val.deadline}</td></tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
export default Index


