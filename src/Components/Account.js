import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import './Account.css'

let recipeNumArray = [];
let recipeArray = [];
let ran = false;

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          hasFav: ''
        };
    }
    logOut() {
        window.sessionStorage.clear();
        window.location.replace('http://localhost:3000/');
    }
    //gets the url params ready
    makeIdArray() {
        if(!ran){
            for(let i=0;i<recipeNumArray.length;i++) {
                recipeNumArray[i] = Object.values(recipeNumArray[i]);
                recipeNumArray[i] = recipeNumArray[i][2];
            }
        }
        ran = true;
        return recipeNumArray;
    }
    async deleteFavorite(recipeId) {
        let userId = window.sessionStorage.getItem('userID');
        let json = {
            'userId': userId,
            'recipeId': recipeId
        }; 
        await axios.post('https://allrecipes-api.herokuapp.com/favorite/delete', json)
            .then(response => {
                if(response){
                    window.location.reload(false);
                }
            },
            (error) => {
                this.setState({
                    error
                });
            }
            )
    }
    //use the params from makeIdArray to request them from the api
    async getRecipeInfo() {
        let param = '';
        for(let i=0;i<recipeNumArray.length;i++) {
            if(i===0){
                param = recipeNumArray[i];
            }
            else {
                param = param + ',' + recipeNumArray[i];
            }
        }
        let url = 'https://api.spoonacular.com/recipes/informationBulk?ids=' + param + '&apiKey=7422ef4ed19a4d60954f75383db15c1f';
        await axios.get(url)
            .then(response => {         
                recipeArray = response.data;
                recipeArray.map(item => {
                    item.sourceUrl = 'http://localhost:3000/recipe/'+item.id;
                })
                return recipeArray;
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                    });
            });   
            this.setState({
                isLoaded: true,  
            });              
    }

    //get the user's list of favorites from the database server
    async componentDidMount() {
        let userId = window.sessionStorage.getItem('userID');
        let json = {
            'userId': userId,
        }; 
        await axios.post('https://allrecipes-api.herokuapp.com/favorite/get', json)
          .then(response => {
              this.setState({
                items: response.data,   
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
          recipeNumArray = this.state.items;
        if(recipeNumArray.length === 0) {           
            this.setState({
                isLoaded: true,
                hasFav: 'You do not have any favorites'
            });       
        }
        //if the user does have favorites then get the request url ready and get the data on those recipes
        else if(recipeNumArray.length > 0) {
            this.setState({
                hasFav: ''
            });      
            this.makeIdArray()
            this.getRecipeInfo()
        }
    }

    render() {
        const { error, isLoaded, hasFav } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return <div>Loading...</div>;
        } 
        else if (hasFav !== '') {
            return (
                <div>
                    <Nav/> 
                    <button id='accountLogOut' onClick={() => this.logOut()}>Log Out</button> 
                    <p id='accountHasFav'>{this.state.hasFav}</p>
                </div>
            )
        }
        return (
        <div>
            <Nav />
            <button id='accountLogOut' onClick={() => this.logOut()}>Log Out</button>
            <p>{this.state.hasFav}</p>
            <div id='accountFavoritesBox'>
                {recipeArray.map(item => (
                    <div className='accountFavorites' key={item.id}>
                        <a href={item.sourceUrl} >
                            <h4>{item.title}</h4>
                            <img src={item.image} alt='recipe'/>
                        </a>
                        <button className='accountRemoveFavorite' onClick={() => this.deleteFavorite(item.id)}><i className="fas fa-trash"></i></button>
                    </div>
                ))}
            </div>
        </div>
        ) 
    }
}

