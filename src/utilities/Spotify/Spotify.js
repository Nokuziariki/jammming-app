const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirectUri =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_SPOTIFY_REDIRECT_URI_LOCAL
        : process.env.REACT_APP_SPOTIFY_REDIRECT_URI_LIVE;
let accessToken = "";
let clientAccessToken = "";

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenUrl =
            window.location.href.match(/access_token=([^&]*)/);
        const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenUrl && expiresInUrl) {
            accessToken = accessTokenUrl[1];
            const expiresIn = Number(expiresInUrl[1]);

            window.setTimeout(() => {
                accessToken = "";
            }, expiresIn * 1000);

            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            const accessUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUri;
        }
    },

    async getClientAccessToken() {
        if (clientAccessToken) {
            return clientAccessToken;
        }

        let data = new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
        });

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data.toString(),
        };

        try {
            const response = await fetch(
                "https://accounts.spotify.com/api/token",
                requestOptions
            );
            const responseData = await response.json();

            clientAccessToken = responseData.access_token;

            return clientAccessToken;
        } catch (error) {
            console.error("Error fetching access token:", error);
            throw error;
        }
    },

    async search(term) {
        try {
            await Spotify.getClientAccessToken();

            const response = await fetch(
                `https://api.spotify.com/v1/search?type=track&q=${term}`,
                {
                    headers: {
                        Authorization: `Bearer ${clientAccessToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Spotify accesstoken request failed!");
            }

            const data = await response.json();

            if (!data.tracks || !data.tracks.items) {
                return [];
            }

            return data.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                albumArt: track.album.images[0]?.url || "",
                uri: track.uri,
            }));
        } catch (error) {
            console.error("Error searching tracks:", error);
            return [];
        }
    },

    async savePlaylistName(name, trackURI) {
        if (!name || !trackURI.length) {
            throw new Error("The playlistname and the track add is required");
        }

        const accessToken = Spotify.getAccessToken();
        if (!accessToken) {
            throw new Error("No valid access token");
        }

        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;

        try {
            const userResponse = await fetch(`https://api.spotify.com/v1/me`, {
                headers: headers,
            });

            if (!userResponse.ok) {
                throw new Error("Failed to retrieve user data");
            }

            const userData = await userResponse.json();
            userID = userData.id;

            const createPlaylistResponse = await fetch(
                `https://api.spotify.com/v1/users/${userID}/playlists`,
                {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ name: name }),
                }
            );

            if (!createPlaylistResponse.ok) {
                throw new Error("Failed to create playlist");
            }

            const playlistData = await createPlaylistResponse.json();
            const playlistID = playlistData.id;

            const addTracksResponse = await fetch(
                `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ uris: trackURI }),
                }
            );

            if (!addTracksResponse.ok) {
                throw new Error("Failed to add songs to playlist");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export { Spotify };
