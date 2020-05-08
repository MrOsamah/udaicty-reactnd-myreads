import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import SearchBook from "./SearchBook";
import MainPage from "./MainPage";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  handleAdd = (book) => {
    // If the passed object is not added in the list, do add it
    if (!this.state.books.includes(book)) {
      this.setState((prevState) => ({
        books: [...prevState.books, book],
      }));
    } else {
      // Else if the passed object is in the list but with different shelf:
      // Apply the similar logic of moving it to another shelf
      const books = this.state.books;
      const bookIndex = this.state.books.findIndex(
        (element) => element.id === book.id
      );
      books[bookIndex] = book;
      this.setState(() => ({
        books: books,
      }));
    }
  };

  handleMove = (book, shelf) => {
    // Copy the existing books, find the index of the passed object
    // then add "shelf" element to it with the passed shelf value
    // Finally set the updated list to be the new state
    const books = this.state.books;
    const bookIndex = this.state.books.findIndex(
      (element) => element.id === book.id
    );
    books[bookIndex].shelf = shelf;
    this.setState(() => ({
      books: books,
    }));
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBook
              addedBooks={this.state.books}
              addHandler={this.handleAdd}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <MainPage
              booksList={this.state.books}
              moveHandler={this.handleMove}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
