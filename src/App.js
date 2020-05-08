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
    if (!this.state.books.includes(book)) {
      this.setState((prevState) => ({
        books: [...prevState.books, book],
      }));
    } else {
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
    const books = this.state.books;
    const bookIndex = this.state.books.findIndex(
      (element) => element.id === book.id
    );
    books[bookIndex].shelf = shelf;
    this.setState((prevState) => ({
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
