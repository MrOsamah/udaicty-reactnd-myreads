import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

const CurrentlyReading = (props) => {
  const handleMove = (book, shelf) => {
    props.moveHandler(book, shelf);
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.currentlyReadingBooks.map((book) => (
            <Book bookDetails={book} key={book.id} moveHandler={handleMove} />
          ))}
        </ol>
      </div>
    </div>
  );
};

CurrentlyReading.propTypes = {
  currentlyReadingBooks: PropTypes.array.isRequired,
  moveHandler: PropTypes.func.isRequired,
};

export default CurrentlyReading;
