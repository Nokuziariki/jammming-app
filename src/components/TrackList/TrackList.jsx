import React from 'react';
import Track from '../Track/Track';
import "./TrackList.css";

function TrackList({ tracks, onAddTrack, onRemoveTrack, isRemoval }) {

    return (
        <div className='TrackList'>
            {tracks.map(track => (
                <Track 
                    track={track}
                    key={track.id}
                    name={track.name}
                    artist={track.artist}
                    album={track.album}
                    albumArt={track.albumArt}
                    onAddTrack={() => onAddTrack(track)}
                    onRemoveTrack={() => onRemoveTrack(track)}
                    isRemoval={isRemoval}
                />
                ))}
        </div>
    );
}

export default TrackList; 