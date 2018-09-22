import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ShelfChange from "./ShelfChange.js";
import { debounced } from "./throttleDebounce";


class SearchBar extends Component {
  state = {
    query: "",
    searchBooks: []
  }
  onChangeInput(searchTerm) {
    this.setState(() => ({ query: searchTerm }))
    if (searchTerm.length < 1) {
      this.setState(() => ({
        searchBooks: []
      }))
    } else {

      debounced(400, BooksAPI.search(searchTerm).then(books => this.setState(() => {
        return ({
          searchBooks: books
        })
      })))

    }
  }
  render() {
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

              const thumbnail = book.imageLinks ? book.imageLinks.smallThumbnail : "";
              const title = book.title ? book.title : "";
              const authors = book.authors ? book.authors.join(", ") : "";
              //find if this book is already in shelf
              const bookShelf = this.props.books.filter(shelfBook => book.id === shelfBook.id)
              const shelf = bookShelf.length > 0 ? bookShelf[0].shelf : "none"

              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${thumbnail})`
                        }}
                      />
                      <ShelfChange moveBook={this.props.moveBook} book={book} shelf={shelf} />
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
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
