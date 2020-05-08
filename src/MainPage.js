import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";

const MainPage = (props) => {
  const handleMove = (book, shelf) => {
    props.moveHandler(book, shelf);
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <CurrentlyReading
            currentlyReadingBooks={props.booksList.filter(
              (book) => book.shelf === "currentlyReading"
            )}
            moveHandler={handleMove}
          />
          <WantToRead
            wantToReadBooks={props.booksList.filter(
              (book) => book.shelf === "wantToRead"
            )}
            moveHandler={handleMove}
          />
          <Read
            readBooks={props.booksList.filter((book) => book.shelf === "read")}
            moveHandler={handleMove}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  booksList: PropTypes.array.isRequired,
  moveHandler: PropTypes.func.isRequired,
};

export default MainPage;
