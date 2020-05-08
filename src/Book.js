import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    bookDetails: PropTypes.object.isRequired,
    moveHandler: PropTypes.func.isRequired
  }
  state = {
    shelf: this.props.bookDetails.shelf,
  };
  handleChange = (selectedShelf) => {
    BooksAPI.update(this.props.bookDetails, selectedShelf).then((book) =>
      this.setState(() => ({
        shelf: selectedShelf,
      }))
    );
    this.props.moveHandler(this.props.bookDetails, selectedShelf);
  };
  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  this.props.bookDetails.imageLinks !== undefined
                    ? this.props.bookDetails.imageLinks.smallThumbnail
                    : ""
                })`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={(event) => this.handleChange(event.target.value)}
                value={
                  this.state.shelf === undefined ? "none" : this.state.shelf
                }
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.bookDetails.title}</div>
          <div className="book-authors">
            {this.props.bookDetails.authors === undefined
              ? ""
              : this.props.bookDetails.authors}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
