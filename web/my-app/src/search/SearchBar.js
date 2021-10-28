import React from 'react'
import "./SearchBar.css"
function SearchBar({result, updateLocation}) {
    const locationPreview = []

    result.forEach((data) => {
        locationPreview.push(
            <div className="location-result">
                {Object.values(data)[0]}
            </div>
        )
    })

    return (
        <div className="SearchBar" >
            { locationPreview }
        </div>
    )
}



export default SearchBar;