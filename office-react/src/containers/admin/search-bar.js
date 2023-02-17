import { useState, useEffect } from "react";
import axios from "axios";
var data = require("./MOCK_DATA.json");

export default function App() {
  const [searchvalue, setSerachValue] = useState("");
  const [stockdata, setStockData] = useState([{}])

  useEffect(() => {
    axios.get("http://localhost:8000/stock/get").then(Response =>{
      console.log(Response.data)
      setStockData(Response.data)
    }).catch(err =>{
      console.log(err)
    })
},[]);

  const onChangeValue = (event) => {
    setSerachValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setSerachValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  return (
    <div className="App">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={searchvalue} onChange={onChangeValue} />
          <button onClick={() => onSearch(searchvalue)}> Search </button>
        </div>
        <div className="dropdown">
          {stockdata &&  stockdata
             .filter((item) => {
                if(searchvalue){
                    const searchTerm = searchvalue.toLowerCase();
                    const fullName = item.book_title.toLowerCase();
                    return (
                        searchTerm &&
                        fullName.startsWith(searchTerm) &&
                        fullName !== searchTerm
                      );
                }

            })
            .slice(0, 10) 
            .map((item) => (
              <div
                onClick={() => onSearch(item.book_title)}
                className="dropdown-row"
                key={item.book_title}
              >
                {item.book_title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
