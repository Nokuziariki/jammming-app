import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css'
 
function SearchResults({ searchResults , onAddTrack}) {
    return (
        <div className='search-results'>
            <h2>Results</h2>
            <TrackList
                tracks={searchResults}
                onAddTrack={onAddTrack}
                isRemoval={false}
            />
        </div>
    );
}

export default SearchResults; 