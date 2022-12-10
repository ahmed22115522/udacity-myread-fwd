import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as BookAPI from './BooksAPI'

const Search = ({onUpdateShelf, shelfNames, shelfValue, books}) => {

  const [searchedBooks, setSearchedBooks] = useState([])

  const getSearchData = async (e) => {
    let query = e.target.value

    // If the search input is empty the code will not run as the res will be undefind

    if(query){
      const res = await BookAPI.search(query)
      setSearchedBooks(res)
      console.log(res);
    }else{
      setSearchedBooks([])
    }

  }

  const checkBookExists = (id) => {
    let bookExists = [...books.filter((book) => book.id === id)]
    
    if(bookExists.length > 0){
      return bookExists[0].shelf;
    }else{
      return 'none';
    }
  }

  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title, author, or ISBN" onChange={(e) => getSearchData(e)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            {
              searchedBooks.error === 'empty query' ? <p>No Books Found</p> : 
              searchedBooks.map((searched, index) => 
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div
                      onClick={() => checkBookExists(searched.id)}
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 192,
                          backgroundImage:
                            `url("${searched.imageLinks.thumbnail}")`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select onChange={(e) => onUpdateShelf(e,searched.id)} defaultValue={checkBookExists(searched.id)}>
                          <option value="none" disabled>
                            Move to...
                          </option>
                          {shelfNames.map((shelf, index) => 
                              <option key={index} value={shelf.value}>
                                {shelf.value === shelfValue ? '✔ ' + shelf.name : shelf.name}
                              </option>
                          )}
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{searched.title}</div>
                    <div className="book-authors">{searched.authors && searched.authors[0]}</div>
                  </div>
                </li>
      )}
            





          </ol>
        </div>
      </div>
    </div>
  );
};

export default Search;
