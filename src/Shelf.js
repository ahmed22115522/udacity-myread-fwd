import React from 'react'

const Shelf = ({shelfTitle, shelfValue, booksArray, shelfNames, onUpdateShelf}) => {


  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {booksArray.filter((book) => book.shelf === shelfValue).map((book, index) => 
                    <li key={index}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 192,
                                backgroundImage:
                                  `url("${book.imageLinks.thumbnail}")`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select onChange={(e) => onUpdateShelf(e,book.id)} defaultValue={book.shelf}>
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
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors && book.authors[0]}</div>
                        </div>

                  </li>
        )}
      </ol>
    </div>
  </div>
  )
}

export default Shelf