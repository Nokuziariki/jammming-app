import React from "react";
import "./Track.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

function Track({
    name,
    artist,
    album,
    albumArt,
    isRemoval,
    onAddTrack,
    onRemoveTrack,
    track,
}) {
    const handleAddTrack = () => {
        onAddTrack(track);
    };

    const handleRemoveTrack = () => {
        onRemoveTrack(track);
    };

    return (
        <div className="Track">
            <div className="album-picture">
                <img
                    src={albumArt}
                    alt={`${album} album cover`}
                    id="album-art"
                />
            </div>
            <div className="Track-info">
                <h3>{name}</h3>
                <p>
                    {artist} | {album}
                </p>
            </div>
            {isRemoval ? (
                <button className="Track-action" onClick={handleRemoveTrack}>
                    <FontAwesomeIcon icon={faCircleLeft} />
                </button>
            ) : (
                <button className="Track-action" onClick={handleAddTrack}>
                    <FontAwesomeIcon icon={faCircleRight} />
                </button>
            )}
        </div>
    );
}

export default Track;
