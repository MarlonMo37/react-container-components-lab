import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'your-key-here';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here

class SearchableMovieReviewsContainer extends Component {

    constructor() {
        super()
         
        this.state = {
            searchTerm : '',
            reviews: []
        }
    }

    handleChange = event => {
        this.setState({ searchTerm: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault()
        let newUrl = URL + this.state.searchTerm
        fetch(newUrl)
        .then(res => res.json())
        .then(res => this.setState({ reviews: res.results }))
    }

    render() {
        return (
          <div className="searchable-movie-reviews">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="search-input">Search Movie Reviews</label>
              <input
                id="search-input"
                type="text"
                style={{ width: 300 }}
                onChange={this.handleSearchInputChange}
              />
              <button type="submit">Submit</button>
            </form>
            {typeof this.state.reviews === 'object' &&
              this.state.reviews.length > 0 && <h2>Movie Review By Search:</h2>}
            <MovieReviews reviews={this.state.reviews} />
          </div>
        )
      }
    }
    
    export default SearchableMovieReviewsContainer;
    
