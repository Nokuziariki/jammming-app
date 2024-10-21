# The Project

Jammming is a React-based web application that allows users to search for songs using the Spotify API and create their own playlists. This is one of my codecademy projects.

## Info

I am currently still working on the project. The CSS is not ready yet, I just put a base on it to have a starting point. I will fix it after the features are finished.

## Setup

To get a local copy up and running follow these simple steps.

1. **Clone the repository**
    ```bash
    git clone https://github.com/Nokuziariki/jammming.git
    ```

2. **Navigate to the project directory**
    ```bash
    cd jammming
    ```

3. **Install dependencies**
    ```bash
    npm install
    ```

4. **Create a Spotify Developer account and get your client ID**
    - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
    - Create a new application to get your `Client ID` and `Client Secret`
    - Set the redirect URI to `http://localhost:3000/`

5. **Create a `.env` file in the root directory and add your Spotify credentials**
    ```env
    REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
    REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/
    ```

6. **Start the development server**
    ```bash
    npm start
    ```

This will start the application on `http://localhost:3000/`.

## Usage

- **Search for Songs:** Use the search bar to find songs.
- **Create Playlists:** Add songs to your playlist and save them to your Spotify account.