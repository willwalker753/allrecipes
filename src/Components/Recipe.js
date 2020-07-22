import React, { Component } from 'react';
import './Recipe.css';
import Nav from './Nav';
import axios from 'axios';

let recipeArray = [];
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

    //if the user is signed in makes a post request to database server to save recipe id under the user's id
    addToFav() {
      let userId = window.sessionStorage.getItem('userID');
      if(userId === null){
        this.setState({
          favorites: 'Please login to add'
        });
      }
      else {
        let recipeId = window.location.href;
        recipeId = recipeId.replace('https://allrecipes-git-master.willwalker753.vercel.app/recipe/','');
        let json = {
          'userId': userId,
          'recipeId': recipeId
        };
        axios.post('https://allrecipes-api.herokuapp.com/favorite', json)
          .then(response => {
        })
        this.setState({
          favorites: <i className="fas fa-check"></i>
        });
      }
    }

    //get the selected recipe's information from the api
    componentDidMount() {
        let recipeId = window.location.href;
        recipeId = recipeId.replace('https://allrecipes-git-master.willwalker753.vercel.app/recipe/','');
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
        } 
        else if (!isLoaded) {
          return <i id='loadingSpinner' className="fa fa-spinner" aria-hidden="true"></i>;
        } 
        else {
          recipeArray = this.state.items;
        }
        return (
            <div id='recipe'>
                <Nav />
                <div id='recipeTop'>
                  <a id='backToResults' href='/results'>Back to results</a>
                  <button id='recipeAddToFavorites' value='Add to Favorites' onClick={this.addToFav}>{this.state.favorites}</button>
                </div>
                <h2 id='recipeH2'>{recipeArray.title}</h2>
                <img id='recipeImg' src={recipeArray.image} alt='recipe'/>
                <h4>Ingredients:</h4>
                <ul id='recipeIngredients'>
                    {recipeArray.extendedIngredients.map(item => (
                            <li key={item.id}>{item.measures.us.amount} {item.measures.us.unitShort} {item.name}</li>
                    ))}
                </ul>          
                <ol id='recipeInstructions'>
                  {recipeArray.analyzedInstructions[0].steps.map(item => (
                      <li key={item.number}> {item.step}</li>
                  ))}
                </ol>
                <p><a id='recipeSource' target='_blank' rel="noopener noreferrer" href={recipeArray.sourceUrl}>Source</a></p>
            </div>
        )
    }
}
