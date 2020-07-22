import React, { Component } from 'react';
import Nav from './Nav';
import './Results.css';

const apiKey = '01673e987d334c68ba50b7b73c675d42';
let recipeArray = [];
export default class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    componentDidMount() {
      //use the search term to make a get request to the api
      let search = localStorage.getItem('search');
      let url = 'https://api.spoonacular.com/recipes/search?apiKey=' + apiKey + '&query=' + search;
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.results
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
      }

      render() {
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <i id='loadingSpinner' className="fa fa-spinner" aria-hidden="true"></i>;
        } else {
          recipeArray = this.state.items;
            if(recipeArray.length === 0){
              return <p>Your search did not return any results...<a href='/'>Back to home?</a></p>           
            }
            //makes a valid image url and a url for each recipe
            for(let i=0;i<recipeArray.length;i++){
              recipeArray[i].image = 'https://spoonacular.com/recipeImages/'+recipeArray[i].id+'-312x150.jpg';
              recipeArray[i].sourceUrl = 'https://allrecipes-git-master.willwalker753.vercel.app/recipe/'+recipeArray[i].id;
            }
          return (
            <div>
              <Nav />
              <div id='resultsSpace'></div>
              <div id='resultsFlexBox'>
              {recipeArray.map(item => (
                <a key={item.id} className='resultsBoxLink' href={item.sourceUrl}>
                  <div className='resultsBox' >
                      <p id='resultsTitle'>{item.title}</p>
                      <img id='resultsImg' src={item.image} alt='recipe'/>
                      <p id='resultsP'>Ready in {item.readyInMinutes} minutes and serves {item.servings} people</p>
                  </div>
                </a>
              ))}
              </div>
            </div>
          );
        }
      }
}
