import Shelf from "./Shelf";
import { Link } from "react-router-dom";

const Home = ({shelfNames, books, onUpdateShelf}) => {
    

  return (
    <div>
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                {shelfNames.map((shelf, index) => <Shelf key={index} onUpdateShelf={onUpdateShelf} booksArray={books}  shelfNames={shelfNames} shelfTitle={shelf.name} shelfValue={shelf.value}/>)}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    </div>
  )
}

export default Home