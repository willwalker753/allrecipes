import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import './Signup.css'
import axios from 'axios'

class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username: '',
             password: '',
             redirect: false
        }
    }
    
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state);
        axios.post('https://allrecipes-api.herokuapp.com/register',this.state)
            .then(response => {
                console.log(response)
                if(response.status === 200){
                    window.sessionStorage.setItem('loggedIn', true)
                    window.sessionStorage.setItem('username', response.data.username)
                    window.sessionStorage.setItem('userID', response.data._id)
                    this.setState({ redirect: true })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { username, password, redirect } = this.state;
        if(redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <div>
                <header>
                    <h2 id='signUpH2'>
                        <a href="/">allRecipes</a>
                    </h2>
                </header>
                <form id='signUpForm' onSubmit={this.submitHandler}>
                    <input type="text" placeholder="Username" name='username' value={username} onChange={this.changeHandler}/>
                    <input type="password" placeholder="Password" name='password' value={password} onChange={this.changeHandler}/>
                    <input type="submit" id='submitSignUp' value="Sign Up"/>
                </form>
                <section>
                    <p id='signUpP'>
                        Already have an account? Login 
                        <a href="/login"> here</a>
                    </p>
                </section>
            </div>
        )
    }
}
export default Signup;