import React, { Component } from "react";
import ShelfChange from "./ShelfChange.js";
import { Link } from "react-router-dom";

class BookShelf extends Component {
  render() {
    const books = this.props.books;
    const shelves = this.props.shelves;

    // const cleanShelves = bookShelves.map(shelf => shelf.replace(/([A-Z])/g, match => ` ${match}`).replace(/^./, match => match.toUpperCase()));

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(shelves).map(shelf => {
              return (
                <div className="bookshelf" key={shelf}>
                  <h2 className="bookshelf-title">{shelves[shelf]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter(book => book.shelf === shelf).map(book => {
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
                                <ShelfChange moveBook={this.props.moveBook} book={book} shelf={book.shelf} />
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors[0]}</div>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelf;
