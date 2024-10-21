import React, { useCallback, useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";
import { Spotify } from "../../utilities/Spotify/Spotify";

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [playlistTracks, setPlaylistTracks] = useState([]);

    const search = useCallback((term) => {
        console.log("Spotify keresés indult"); // Debug log
        Spotify.search(term).then((results) => {
            setSearchResults(results);
        });
    }, []);

    const addTrack = useCallback(
        (track) => {
            console.log("Dal hozzáadva: ", track.artist, "-", track.name);
            console.log(track.id); // Debug log
            if (
                !playlistTracks.find((prevTrack) => prevTrack.id === track.id)
            ) {
                const trackIndex = searchResults.findIndex(
                    (prevTrack) => prevTrack.id === track.id
                );
                const trackWithIndex = { ...track, index: trackIndex };
                setPlaylistTracks((prevTracks) => {
                    const newTracks = [...prevTracks];
                    newTracks.splice(trackWithIndex.index, 0, trackWithIndex);
                    return newTracks;
                });
                setSearchResults((prevResults) =>
                    prevResults.filter((prevTrack) => prevTrack.id !== track.id)
                );
            }
        },
        [playlistTracks, searchResults]
    );

    const removeTrack = useCallback((track) => {
        console.log("Dal törölve: ", track.artist, "-", track.name); // Debug log
        setPlaylistTracks((prevTracks) =>
            prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
        );
        setSearchResults((prevResults) => {
            const newResults = [...prevResults];
            newResults.splice(track.index, 0, track);
            return newResults;
        });
    }, []);

    const updatePlaylistName = useCallback((name) => {
        setPlaylistName(name);
    }, []);

    const savePlaylistName = useCallback(() => {
        console.log("Lejátszási lista mentve"); // Debug log
        const trackURI = playlistTracks.map((track) => track.uri);
        Spotify.savePlaylistName(playlistName, trackURI).then(() => {
            setPlaylistName("New Playlist");
            setPlaylistTracks([]);
        });
    }, [playlistName, playlistTracks]);

    return (
        <div>
            <h1 className="title">
                Ja<span className="coloredtext">mmm</span>ing
            </h1>
            <div className="app">
                <div className="app-search">
                    <SearchBar className="searchbar" onSearch={search} />
                </div>
                <div className="app-lists">
                    <SearchResults
                        searchResults={searchResults}
                        onAddTrack={addTrack}
                    />
                    <Playlist
                        playlistName={playlistName}
                        playlistTracks={playlistTracks}
                        onNameChange={updatePlaylistName}
                        onRemoveTrack={removeTrack}
                        onSave={savePlaylistName}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
