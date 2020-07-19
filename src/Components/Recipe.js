import React, { Component } from 'react';
import './Recipe.css';
import Nav from './Nav';
import axios from 'axios';

let array = [];
const apiKey = '01673e987d334c68ba50b7b73c675d42';

export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          favorites: 'Add to favorites'
        };
        this.addToFav = this.addToFav.bind(this);
    }
    addToFav() {
      console.log('clicked');
      let userId = window.sessionStorage.getItem('userID');
      console.log(userId);
      if(userId === null){
        alert('You must be signed in to add to favorites');
      }
      else {
        let recipeId = window.location.href;
        recipeId = recipeId.replace('http://localhost:3000/recipe/','');
        let json = {
          'userId': userId,
          'recipeId': recipeId
        };
        axios.post('https://allrecipes-api.herokuapp.com/favorite', json)
          .then(response => {
            console.log(response)
        })
        this.setState({
          favorites: <i className="fas fa-check"></i>
        });
      }
      
    }
    componentDidMount() {
        let recipeId = window.location.href;
        recipeId = recipeId.replace('http://localhost:3000/recipe/','');
        console.log(recipeId);
        let url = 'https://api.spoonacular.com/recipes/'+recipeId+'/information?apiKey='+apiKey;
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
        }
    render() {
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            array = this.state.items;
            console.log(array);
            }
        return (
            <div id='recipe'>
                <Nav />
                <div id='recipeTop'>
                  <a id='backToResults' href='/results'>Back to results</a>
                  <button id='recipeAddToFavorites' value='Add to Favorites' onClick={this.addToFav}>{this.state.favorites}</button>
                </div>
                <h2 id='recipeH2'>{array.title}</h2>
                <img id='recipeImg' src={array.image} alt='recipe'/>
                <h4>Ingredients:</h4>
                <ul>
                    {array.extendedIngredients.map(item => (
                            <li>{item.measures.us.amount} {item.measures.us.unitShort} {item.name}</li>
                    ))}
                </ul>
                <p id='recipeInstructions'>{array.instructions}</p>
                <p><a id='recipeSource' href={array.sourceUrl}>Source</a></p>
            </div>
        )
    }
}
