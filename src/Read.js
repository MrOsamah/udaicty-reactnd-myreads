import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const Read = (props) => {
  const handleMove = (book, shelf) => {
    props.moveHandler(book, shelf);
  };

  return (
<div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.readBooks.map((book) => (
              <Book
                bookDetails={book}
                key={book.id}
                moveHandler={handleMove}
              />
            ))}
          </ol>
        </div>
      </div>
  )
};

Read.propTypes = {
  readBooks: PropTypes.array.isRequired,
  moveHandler: PropTypes.func.isRequired
}

export default Read;
