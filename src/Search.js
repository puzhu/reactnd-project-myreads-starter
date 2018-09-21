import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBar extends Component {
  state = {
    query: "",
    searchBooks: []
  }
  onChangeInput(searchTerm) {
    if (searchTerm.length < 1) {
      this.setState(() => ({
        query: "",
        searchBooks: []
      }))
    } else {
      BooksAPI.search(searchTerm).then(books => this.setState(() => {
        return ({
          query: searchTerm,
          searchBooks: books
        })
      }))
    }


  }
  render() {
    console.log(this.state)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.onChangeInput(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.length > 0 && (this.state.searchBooks.map(book => {
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                        }}
                      />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors[0]}</div>
                  </div>
                </li>
              );
            }))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBar;
