import React, { Component } from "react";

class ShelfChange extends Component {
  handleSelectEvent = event => {
    const shelf = event.target.value;

    this.props.moveBook(this.props.book, shelf);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={event => this.handleSelectEvent(event)} defaultValue={this.props.shelf}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfChange;
