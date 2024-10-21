import React, { useCallback, useEffect } from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

const Playlist = ({ onNameChange, playlistTracks, onRemoveTrack, onSave }) => {
    const handleNameChange = useCallback(
        (event) => {
            onNameChange(event.target.value);
        },
        [onNameChange]
    );

    useEffect(() => {
        const saveButtonZone = document.getElementById("saveButtoneZone");
        if (playlistTracks.length === 0) {
            saveButtonZone.style.display = "none";
        } else {
            saveButtonZone.style.display = "block";
        }
    }, [playlistTracks]);

    return (
        <div className="playlist">
            <input
                onChange={handleNameChange}
                placeholder="Name your playlist"
                defaultValue={"New Playlist"}
                style={{ textAlign: "center" }}
                id="playlist-name"
            />
            <TrackList
                tracks={playlistTracks}
                onRemoveTrack={onRemoveTrack}
                isRemoval={true}
            />
            <div id="saveButtoneZone">
                <button
                    id="saveButton"
                    className="playlist-button"
                    onClick={onSave}
                >
                    Save to Spotify
                </button>
            </div>
        </div>
    );
};

export default Playlist;
