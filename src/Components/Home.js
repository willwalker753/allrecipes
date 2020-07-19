import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './Home.css';
import Nav from './Nav';

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '',searched: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        localStorage.clear();
        localStorage.setItem('search', this.state.value);
        let search = localStorage.getItem('search');
        console.log(search);
        this.setState({searched: true});
        event.preventDefault();
    }

    render() {
        if (this.state.searched === true) {
            return <Redirect to='/results' />
        }
        return (
            <div>
                <Nav />
                <div id='main'>
                    <header>
                        <h2>Search for recipes from apple pie to zucchini bread!</h2>
                    </header>
                    <form onSubmit={this.handleSubmit}>
                        <input id='searchBar' type="text" placeholder='apple pie' value={this.state.value} onChange={this.handleChange} />
                        <button id='searchBarButton' type="submit" value="Search"><i className="fas fa-search"></i></button>
                    </form>
                    <article>
                        <p id='homeAboutTxt'>
                            When signed in you can add recipes to your favorites to save them for later. For a quick demo, sign in with username:demo and password:password
                        </p>
                    </article>
                </div>
            </div>
        )
    }
}
