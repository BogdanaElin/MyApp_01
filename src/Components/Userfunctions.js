import axios, * as others from 'axios'
import { Backendserver } from '../routes/Backendserver'

export const register = newUser => {
    return axios
        .post(Backendserver + 'api/register', newUser, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export const signin = user => {
    return axios
        .post( Backendserver + 'api/signin', {
            email: user.email,
            password: user.password
        },{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data.api_token)
            console.log(res)
        })
        .catch(err => {
            return "notoken"
            console.log(err)
        })
}


