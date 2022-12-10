import "./App.css";
import {Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Search from './Search'
import * as BookAPI from './BooksAPI'
import { useEffect, useState } from "react";

function App() {

  const [books, setBooks] = useState([])

  const shelfNames = [
  {name : 'Currently Reading', value: "currentlyReading"}, 
  {name: 'Want to Read', value: "wantToRead"}, 
  {name: 'Read', value: "read"}
];

  const getData = async () => {
    const res = await BookAPI.getAll();
    setBooks(res)
  }

  const updateShelf = async (e,id) => {
    let targetShelf = e.target.value;
    await BookAPI.update({id : id}, targetShelf)
  }

  useEffect(() => {
    getData();
  }, [books])
  

  return (
    <div className="app">

      <Routes>

        <Route path="/" element={ <Home books={books} onUpdateShelf={updateShelf} shelfNames={shelfNames}/>}/>

        <Route path="/search" element={ <Search books={books} onUpdateShelf={updateShelf} shelfNames={shelfNames}/>}/>

      </Routes>

      
    </div>
    
  );
}

export default App;
