import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import './Login.css'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props) 
        this.state = {
             username: '',
             password: '',
             redirect: false,
             errorMessage: ''
        }
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    //if the submitted username and password returns a match from the database server then sign in
    submitHandler = e => {
        e.preventDefault()
        console.log(this.state);
        axios.post('https://allrecipes-api.herokuapp.com/login',this.state)
            .then(response => {
                console.log(response)
                if((response.status === 200)&&(response.data[0].username !== undefined)) {                   
                    window.sessionStorage.clear()
                    window.sessionStorage.setItem('loggedIn', true)
                    window.sessionStorage.setItem('username', response.data[0].username)
                    window.sessionStorage.setItem('userID', response.data[0]._id)
                    this.setState({ redirect: true })
                }
                else {
                    this.setState({
                        errorMessage: 'Incorrect username or password'
                    });
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Incorrect username or password'
                });
            });
    }

    render() {
        const { username, password, redirect } = this.state;
        if(redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <div>
                <header>
                    <h2 id='loginH2'>
                        <a href="/">allRecipes</a>
                    </h2>
                </header>
                <form id='loginForm' onSubmit={this.submitHandler}>
                    <input type="text" placeholder="Username" name='username' value={username} onChange={this.changeHandler}/>
                    <input type="password" placeholder="Password" name='password' value={password} onChange={this.changeHandler}/>
                    <input type="submit" id='submitLogin' value="Login"/>
                </form>
                <p id='errorMessage'>{this.state.errorMessage}</p>
                <section>
                    <p id='loginP'>
                        Demo account Username:demo Password:password<br />
                        Need an account? Sign up 
                        <a href="/signup"> here</a>
                    </p>
                </section>
            </div>
        )
    }
}
export default Login;
