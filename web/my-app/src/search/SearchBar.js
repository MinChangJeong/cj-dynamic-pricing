import React from 'react'
import "./SearchBar.css"
function SearchBar({keyword, postcode}) {
    console.log(Object.values(postcode))
    return (
        <div className="SearchBar">
            <div className="result">
                <span>
                {Object.values(postcode)[0]}
                </span>
            </div>
        </div>
    )
}



export default SearchBar;