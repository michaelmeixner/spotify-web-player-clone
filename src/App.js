import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromURL } from "./spotify";
import SpotifyWebAPI from "spotify-web-api-js";
import Player from "./Player";

const spotify = new SpotifyWebAPI(); // spotify api object

function App() {
  const [token, setToken] = useState(null);

  // run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromURL();
    window.location.hash = ""; // clears token from url for security
    const _token = hash.access_token;
    if(_token) {
      setToken(_token);
      spotify.setAccessToken(_token); // pass the token to spotify; allow them to communicate
      spotify.getMe().then(user => { // test to see account information
        console.log('PERSON > ', user);
      });
    }
    console.log('I HAVE A TOKEN > ', _token);
  }, []);

  return (
    <div className="app">
      {/* if token exists, render Player component; else, render Login component */}
      {token ? <Player /> : <Login />}
    </div>
  );
}

export default App;
