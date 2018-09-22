import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBar from "./Search.js";
import BookShelf from "./BookShelf";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    },
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState(() => ({ books: books })));
  }

  moveBook = (currBook, shelf) => {
    //update the book list
    BooksAPI.update(currBook, shelf).then(() => {
      this.state.books.map(book => {
        //change the shelf if the book is moved
        book.id === currBook.id && (book.shelf = shelf);

        return book;
      })


      BooksAPI.getAll().then(books => this.setState(() => ({ books: books })));




    });
  };

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <SearchBar books={this.state.books} moveBook={this.moveBook} />} />
        <Route exact path="/" render={() => <BookShelf books={this.state.books} shelves={this.state.shelves} moveBook={this.moveBook} />} />
      </div>
    );
  }
}

export default BooksApp;
