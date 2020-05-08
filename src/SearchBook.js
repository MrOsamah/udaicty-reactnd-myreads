import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";

class SearchBook extends Component {
  static propTypes = {
    addedBooks: PropTypes.array.isRequired,
    addHandler: PropTypes.func.isRequired
  }
  state = {
    query: "",
    books: [],
  };
  handleChange = (value) => {
    this.setState(() => ({
      query: value,
      books: [],
    }));
      this.handleSearch(value.trim());
  };

  handleSearch = (query) => {
    const searchResults = [];
    if (query !== "") {
      BooksAPI.search(query).then((books) => {
        if (books.constructor === Array) {
          books.forEach((bookToAdd) => {
            searchResults.push(bookToAdd);
            this.props.addedBooks.forEach((addedBook) => {
              if (addedBook.id === bookToAdd.id) {
                searchResults.pop();
                searchResults.push(addedBook);
              }
            });
          });
          this.setState(() => ({
            books: searchResults,
          }));
        } else {
          this.setState(() => ({
            books: [],
          }));
        }
      });
    }
  };
  handleAdd = (book, shelf) => {
    book["shelf"] = shelf;
    console.log("addedBook", book);
    this.props.addHandler(book);
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <input
            value={this.state.query}
            onChange={(event) => this.handleChange(event.target.value)}
            placeholder="Search a book.."
          />
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <Book
                bookDetails={book}
                key={book.id}
                moveHandler={this.handleAdd}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
